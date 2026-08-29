import { useEffect, useRef } from 'react';
import { isExtensionContext } from '../helpers/extensionContext';

/**
 * Sincroniza el estado del timer con el service worker de la extensión para
 * que la notificación de fin de sesión y el badge del ícono funcionen aunque
 * el popup esté cerrado (un setInterval en el popup se detiene al cerrarlo).
 * No hace nada fuera del contexto de extensión (build de la web pública).
 * @param {Object} params
 * @param {boolean} params.isPaused
 * @param {boolean} params.isRunning
 * @param {number|null} params.startTime
 * @param {number|null} params.duration
 * @param {string} params.currentCycle
 * @param {number} params.completedPomodoros
 */
export const useExtensionAlarm = ({ isPaused, isRunning, startTime, duration, currentCycle, completedPomodoros }) => {
  const scheduledKeyRef = useRef(null);

  useEffect(() => {
    if (!isExtensionContext()) return;

    const endTime = startTime && duration ? startTime + duration : null;
    // Si el popup estuvo cerrado y el ciclo ya terminó, el estado guardado en
    // localStorage sigue marcado como "corriendo" hasta que el propio timer
    // lo detecte y lo corrija (próximo tick). No reprogramar ese endTime ya
    // pasado: el service worker lo dispararía casi al instante y duplicaría
    // la notificación que ya mostró mientras el popup estaba cerrado.
    const isActive = isRunning && !isPaused && endTime && endTime > Date.now();

    if (isActive) {
      const scheduledKey = `${endTime}-${currentCycle}`;

      if (scheduledKeyRef.current === scheduledKey) return;
      scheduledKeyRef.current = scheduledKey;

      chrome.runtime
        .sendMessage({ type: 'SCHEDULE_ALARM', endTime, cycle: currentCycle, completedPomodoros })
        .catch(() => {});
    } else if (scheduledKeyRef.current !== null) {
      scheduledKeyRef.current = null;
      chrome.runtime.sendMessage({ type: 'CLEAR_ALARM' }).catch(() => {});
    }
  }, [isPaused, isRunning, startTime, duration, currentCycle, completedPomodoros]);
};
