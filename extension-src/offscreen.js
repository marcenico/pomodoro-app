// Runs inside the extension's offscreen document (created by background.js
// with reason AUDIO_PLAYBACK). A service worker has no Web Audio API / DOM,
// so it can't play sound itself — this hidden document plays it instead and
// then closes itself.

// Mirrors src/data/audioConfig.js. Duplicated instead of imported because
// this file is copied as-is into the extension, not part of the app bundle.
const AUDIO_CONFIG = {
  pomodoro: { frequencies: [440, 554.37, 659.25], duration: 0.4, delay: 80, volume: 0.2 },
  shortBreak: { frequencies: [523.25, 659.25, 783.99], duration: 0.5, delay: 100, volume: 0.2 },
  longBreak: { frequencies: [523.25, 659.25, 783.99, 1046.5], duration: 0.5, delay: 100, volume: 0.2 }
};

const soundKey = new URLSearchParams(location.search).get('sound');
const config = AUDIO_CONFIG[soundKey] || AUDIO_CONFIG.pomodoro;

const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioCtx();

config.frequencies.forEach((freq, index) => {
  setTimeout(() => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(config.volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + config.duration);
  }, index * config.delay);
});

// Cierra el documento offscreen una vez terminó de sonar (sólo puede existir
// uno a la vez por extensión).
const totalPlaybackMs = (config.frequencies.length - 1) * config.delay + config.duration * 1000 + 200;
setTimeout(() => window.close(), totalPlaybackMs);
