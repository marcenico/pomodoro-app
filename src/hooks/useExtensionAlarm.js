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

    const isActive = isRunning && !isPaused && startTime && duration;

    if (isActive) {
      const endTime = startTime + duration;
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
