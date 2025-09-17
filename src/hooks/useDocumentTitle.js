import { useEffect } from 'react';

/**
 * Hook personalizado para actualizar el título del documento
 * @param {Object} time - Objeto con minutes y seconds
 * @param {string} currentCycle - Ciclo actual (pomodoro, shortBreak, longBreak)
 * @param {boolean} isRunning - Si el timer está corriendo
 * @param {boolean} isPaused - Si el timer está pausado
 */
export const useDocumentTitle = (time, currentCycle, isRunning, isPaused) => {
  useEffect(() => {
    const { minutes, seconds } = time;
    const defaultTitle = 'The Pomodoro Technique';
    const messages = { pomodoro: 'Focus time', shortBreak: 'Break time', longBreak: 'Long break time' };
    const cycleEmoji = { pomodoro: '🍅', shortBreak: '☕', longBreak: '🛌' };

    if (!isRunning) {
      document.title = defaultTitle;
      return;
    }

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Formatear el tiempo con ceros a la izquierda
    const emoji = cycleEmoji[currentCycle]; // Mapear el ciclo actual a un emoji descriptivo
    const message = messages[currentCycle]; // Obtener el mensaje del ciclo actual
    document.title = `${emoji} ${formattedTime} - ${message}`; // Crear el título del documento

    return () => (document.title = defaultTitle); // Cleanup: restaurar el título original cuando el componente se desmonte
  }, [time, currentCycle, isRunning, isPaused]);
};
