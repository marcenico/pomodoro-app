export const notificationMessages = {
  pomodoro: {
    title: '🍅 Pomodoro Completed!',
    body: (completedPomodoros) =>
      `Great work! You've completed ${completedPomodoros} pomodoro(s). Time to take a break.`
  },
  shortBreak: {
    title: '☕ Short Break Finished!',
    body: 'Break completed! Time to get back to work with renewed energy.'
  },
  longBreak: {
    title: '🌟 Long Break Finished!',
    body: "Long break completed! You're ready for a new productive work session."
  }
};

export const consoleMessages = {
  browserNotSupported: 'This browser does not support notifications',
  noPermission: 'Cannot show notifications: no support or no permission',
  permissionDenied: 'Permission denied, cannot show notification',
  requestPermissionError: 'Error requesting notification permission:',
  showNotificationError: 'Error showing notification:'
};
