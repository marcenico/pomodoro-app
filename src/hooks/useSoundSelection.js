export const useSoundSelection = () => {
  /**
   * Elige el sonido a reproducir según el tipo de ciclo y el número de pomodoros completados
   * @param {string} cycleType - Tipo de ciclo completado ('pomodoro', 'shortBreak', 'longBreak')
   * @param {number} completedPomodoros - Número de pomodoros completados
   * @returns {string} - El tipo de sonido a reproducir
   */
  const chooseSound = (cycleType, completedPomodoros) => {
    switch (cycleType) {
      case 'pomodoro':
        return completedPomodoros > 3 ? 'longBreak' : 'shortBreak';
      case 'shortBreak':
      case 'longBreak':
        return 'pomodoro';
      default:
        return 'pomodoro';
    }
  };

  return { chooseSound };
};
