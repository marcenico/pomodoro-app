import { useCallback } from 'react';
import { audioConfig, audioSettings } from '@data/audioConfig';

export const useAudio = () => {
  /**
   * Plays a sound for session completion
   * @param {string} cycleType - Type of completed cycle ('pomodoro', 'shortBreak', 'longBreak')
   */
  const playSessionCompleteSound = useCallback((cycleType) => {
    if (!audioSettings.enabled) return;

    try {
      // Create audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Get audio configuration for the session type
      const config = audioConfig[cycleType] || audioConfig.pomodoro;

      // Play chord sequence
      config.frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          oscillator.type = 'sine';

          // Envelope for smooth sound
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(config.volume, audioContext.currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration);

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + config.duration);
        }, index * config.delay);
      });
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  }, []);

  return { playSessionCompleteSound };
};
