export const sessionOptions = [
  {
    id: 'light-focus',
    name: 'Light Focus',
    times: '15min 5min 10min',
    config: { pomodoro: 15, shortBreak: 5, longBreak: 10 }
  },
  {
    id: 'classic-pomodoro',
    name: 'Classic Pomodoro',
    times: '25min 5min 15min',
    config: { pomodoro: 1, shortBreak: 1, longBreak: 1 }
  },
  {
    id: 'deep-work',
    name: 'Deep Work',
    times: '40min 10min 20min',
    config: { pomodoro: 40, shortBreak: 10, longBreak: 20 }
  },
  {
    id: 'full-sprint',
    name: 'Full Sprint',
    times: '60min 12min 25min',
    config: { pomodoro: 60, shortBreak: 12, longBreak: 25 }
  }
];
