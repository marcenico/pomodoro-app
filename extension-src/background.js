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
  pomodoro: '#4faeff',
  shortBreak: '#22c55e',
  longBreak: '#10b981'
};

// Mirrors src/hooks/useSoundSelection.js.
const chooseSound = (cycle, completedPomodoros) => {
  switch (cycle) {
    case 'pomodoro':
      return completedPomodoros > 3 ? 'longBreak' : 'shortBreak';
    case 'shortBreak':
    case 'longBreak':
      return 'pomodoro';
    default:
      return 'pomodoro';
  }
};

// Si el popup está abierto, su propio timer ya reproduce el sonido in-page
// (más preciso); tocarlo también desde acá sonaría duplicado/superpuesto.
const isPopupOpen = async () => {
  try {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ['POPUP']
    });
    return contexts.length > 0;
  } catch {
    return false;
  }
};

const playCompletionSound = async (soundKey) => {
  if (await chrome.offscreen.hasDocument()) {
    await chrome.offscreen.closeDocument();
  }

  await chrome.offscreen.createDocument({
    url: `offscreen.html?sound=${soundKey}`,
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'Play the pomodoro session-complete sound while the popup is closed.'
  });
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

  await chrome.action.setBadgeBackgroundColor({
    color: BADGE_COLORS[session.cycle] || BADGE_COLORS.pomodoro
  });

  await chrome.action.setBadgeText({
    text: remainingMinutesLabel(session.endTime)
  });
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
  // Defensa extra: ignorar solicitudes con un endTime ya pasado (por ejemplo,
  // si el popup se reabre con un estado stale) en vez de disparar un alarm
  // casi inmediato que duplicaría la notificación/sonido de fin de sesión.
  if (endTime <= Date.now()) {
    await clearSession();
    return;
  }

  await chrome.storage.local.set({
    [STORAGE_KEY]: { endTime, cycle, completedPomodoros }
  });
  await chrome.alarms.create(END_ALARM, { when: endTime });
  await chrome.alarms.create(TICK_ALARM, {
    delayInMinutes: 1,
    periodInMinutes: 1
  });
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

  if (!(await isPopupOpen())) {
    await playCompletionSound(chooseSound(cycle, completedPomodoros));
  }

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
