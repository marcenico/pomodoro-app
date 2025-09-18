/**
 * Utilidades para el manejo del timer
 * Funciones auxiliares para cálculos y operaciones del timer
 */

/**
 * Calcula el tiempo restante basándose en timestamps reales
 * @param {number} startTime - Timestamp de inicio en ms
 * @param {number} duration - Duración total en ms
 * @returns {Object} - Tiempo restante en formato { minutes, seconds }
 */
export const calculateRemainingTime = (startTime, duration) => {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, duration - elapsed);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return { minutes, seconds };
};

/**
 * Convierte tiempo en formato { minutes, seconds } a milisegundos
 * @param {Object} time - Objeto con minutes y seconds
 * @returns {number} - Tiempo en milisegundos
 */
export const timeToMilliseconds = ({ minutes, seconds }) => {
  return (minutes * 60 + seconds) * 1000;
};

/**
 * Crea un objeto de estado de finalización del timer
 * @param {string} currentCycle - Ciclo actual
 * @param {number} completedPomodoros - Pomodoros completados
 * @param {number} startTime - Timestamp de inicio
 * @param {number} duration - Duración del timer
 * @returns {Object} - Estado de finalización
 */
export const createTimerEndState = (currentCycle, completedPomodoros, startTime, duration) => {
  return {
    time: { minutes: 0, seconds: 0 },
    isPaused: true,
    isRunning: false,
    currentCycle,
    completedPomodoros,
    startTime,
    duration
  };
};

/**
 * Crea un objeto de estado de timer en ejecución
 * @param {Object} remainingTime - Tiempo restante
 * @param {string} currentCycle - Ciclo actual
 * @param {number} completedPomodoros - Pomodoros completados
 * @param {number} startTime - Timestamp de inicio
 * @param {number} duration - Duración del timer
 * @returns {Object} - Estado del timer en ejecución
 */
export const createTimerRunningState = (remainingTime, currentCycle, completedPomodoros, startTime, duration) => {
  return {
    time: remainingTime,
    isPaused: false,
    isRunning: true,
    currentCycle,
    completedPomodoros,
    startTime,
    duration
  };
};

/**
 * Valida si el timer debe actualizarse basándose en el tiempo transcurrido
 * @param {number} now - Timestamp actual
 * @param {number} lastUpdate - Timestamp de la última actualización
 * @param {number} interval - Intervalo mínimo en ms (default: 100)
 * @returns {boolean} - True si debe actualizarse
 */
export const shouldUpdateTimer = (now, lastUpdate, interval = 100) => {
  return now - lastUpdate >= interval;
};
