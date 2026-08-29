// MV3 service worker. A setInterval in the popup only runs while the popup
// document is alive, so it can't notify the user once they close it. This
// worker uses chrome.alarms (OS-scheduled, survives the worker being
// unloaded) to fire the "session complete" notification and keep the
// toolbar badge showing the remaining minutes, regardless of whether the
// popup is open.

const END_ALARM = 'pomodoro-session-end';
const TICK_ALARM = 'pomodoro-badge-tick';
const STORAGE_KEY = 'activeSession';

// Mirrors src/data/notificationMessages.js. Duplicated instead of imported
// because this file is copied as-is into the extension (not bundled), so it
// has no access to the app's Vite/ESM build.
const NOTIFICATION_MESSAGES = {
  pomodoro: {
    title: '🍅 Pomodoro Completed!',
    body: (completed) => `Great work! You've completed ${completed} pomodoro(s). Time to take a break.`
  },
  shortBreak: {
    title: '☕ Break Finished!',
    body: () => 'Break completed! Time to get back to work with renewed energy.'
  },
  longBreak: {
    title: '🌟 Long Break Finished!',
    body: () => "Long break completed! You're ready for a new productive work session."
  }
};

const BADGE_COLORS = {
  pomodoro: '#e24333',
  shortBreak: '#3f7d32',
  longBreak: '#1c5ba1'
};

const remainingMinutesLabel = (endTime) => {
  const remainingMs = endTime - Date.now();
  return remainingMs <= 0 ? '0' : String(Math.ceil(remainingMs / 60000));
};

const updateBadge = async () => {
  const { [STORAGE_KEY]: session } = await chrome.storage.local.get(STORAGE_KEY);

  if (!session) {
    await chrome.action.setBadgeText({ text: '' });
    return;
  }

  await chrome.action.setBadgeBackgroundColor({ color: BADGE_COLORS[session.cycle] || BADGE_COLORS.pomodoro });
  await chrome.action.setBadgeText({ text: remainingMinutesLabel(session.endTime) });
};

const clearSession = async () => {
  await Promise.all([
    chrome.alarms.clear(END_ALARM),
    chrome.alarms.clear(TICK_ALARM),
    chrome.storage.local.remove(STORAGE_KEY),
    chrome.action.setBadgeText({ text: '' })
  ]);
};

const scheduleSession = async ({ endTime, cycle, completedPomodoros }) => {
  await chrome.storage.local.set({ [STORAGE_KEY]: { endTime, cycle, completedPomodoros } });
  await chrome.alarms.create(END_ALARM, { when: endTime });
  await chrome.alarms.create(TICK_ALARM, { delayInMinutes: 1, periodInMinutes: 1 });
  await updateBadge();
};

const notifySessionComplete = async () => {
  const { [STORAGE_KEY]: session } = await chrome.storage.local.get(STORAGE_KEY);
  const cycle = session?.cycle || 'pomodoro';
  const completedPomodoros = session?.completedPomodoros || 0;
  const message = NOTIFICATION_MESSAGES[cycle] || NOTIFICATION_MESSAGES.pomodoro;

  await chrome.notifications.create(`pomodoro-${cycle}-${Date.now()}`, {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: message.title,
    message: message.body(completedPomodoros),
    priority: 2
  });

  await clearSession();
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'SCHEDULE_ALARM') {
    scheduleSession(message).then(() => sendResponse({ ok: true }));
    return true;
  }

  if (message?.type === 'CLEAR_ALARM') {
    clearSession().then(() => sendResponse({ ok: true }));
    return true;
  }

  return false;
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === TICK_ALARM) {
    updateBadge();
  } else if (alarm.name === END_ALARM) {
    notifySessionComplete();
  }
});

chrome.notifications.onClicked.addListener((notificationId) => {
  chrome.notifications.clear(notificationId);
});
