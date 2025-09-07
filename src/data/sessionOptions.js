export const sessionOptions = [
  {
    id: 'light-focus',
    name: 'Light Focus',
    times: '15min 5min 10min',
    config: {
      pomodoro: { minutes: 15, seconds: 0 },
      shortBreak: { minutes: 5, seconds: 0 },
      longBreak: { minutes: 10, seconds: 0 }
    }
  },
  {
    id: 'classic-pomodoro',
    name: 'Classic Pomodoro',
    times: '25min 5min 15min',
    config: {
      pomodoro: { minutes: 0, seconds: 4 },
      shortBreak: { minutes: 0, seconds: 2 },
      longBreak: { minutes: 0, seconds: 4 }
    }
  },
  {
    id: 'deep-work',
    name: 'Deep Work',
    times: '40min 10min 20min',
    config: {
      pomodoro: { minutes: 40, seconds: 0 },
      shortBreak: { minutes: 10, seconds: 0 },
      longBreak: { minutes: 20, seconds: 0 }
    }
  },
  {
    id: 'full-sprint',
    name: 'Full Sprint',
    times: '60min 12min 25min',
    config: {
      pomodoro: { minutes: 60, seconds: 0 },
      shortBreak: { minutes: 12, seconds: 0 },
      longBreak: { minutes: 25, seconds: 0 }
    }
  }
];
