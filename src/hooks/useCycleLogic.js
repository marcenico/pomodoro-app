export const useCycleLogic = () => {
  /**
   * Maneja la transición de ciclos según las reglas de Pomodoro
   * @param {string} currentCycle - Ciclo actual ('pomodoro', 'shortBreak', 'longBreak')
   * @param {number} completedPomodoros - Número de pomodoros completados
   * @returns {Object} - Objeto con nextCycle y newCompletedPomodoros
   */
  const handleCycleTransition = (currentCycle, completedPomodoros) => {
    switch (currentCycle) {
      case 'pomodoro':
        return completedPomodoros >= 3
          ? { nextCycle: 'longBreak', newCompletedPomodoros: 0 }
          : { nextCycle: 'shortBreak', newCompletedPomodoros: completedPomodoros + 1 };
      case 'shortBreak':
        return { nextCycle: 'pomodoro', newCompletedPomodoros: completedPomodoros };
      case 'longBreak':
        return { nextCycle: 'pomodoro', newCompletedPomodoros: completedPomodoros };
      default:
        return { nextCycle: 'pomodoro', newCompletedPomodoros: completedPomodoros };
    }
  };

  /**
   * Obtiene la configuración de tiempo según el ciclo
   * @param {string} cycle - Tipo de ciclo
   * @param {Object} configs - Configuraciones de tiempo para cada ciclo
   * @returns {Object} - Configuración de tiempo {minutes, seconds}
   */
  const getCycleConfig = (cycle, configs) => {
    const { pomodoroConfig, shortBreakConfig, longBreakConfig } = configs;

    switch (cycle) {
      case 'pomodoro':
        return pomodoroConfig;
      case 'shortBreak':
        return shortBreakConfig;
      case 'longBreak':
        return longBreakConfig;
      default:
        return pomodoroConfig;
    }
  };

  return { handleCycleTransition, getCycleConfig };
};
