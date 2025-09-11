import { useCallback, useRef } from 'react';
import { audioConfig } from '@data/audioConfig';

export const useAudio = () => {
  const audioContextRef = useRef(null);

  // Inicializar AudioContext al primer gesto del usuario
  const initAudio = useCallback(async () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
  }, []);

  /**
   * Plays a sound for session completion
   * @param {string} cycleType - Type of completed cycle ('pomodoro', 'shortBreak', 'longBreak')
   */
  const playSessionCompleteSound = useCallback(
    async (cycleType) => {
      if (!audioConfig.enabled) return;

      try {
        if (!audioContextRef.current) await initAudio(); // Inicializar audio si no está disponible

        const audioContext = audioContextRef.current;
        if (!audioContext) {
          console.warn('AudioContext not available');
          return;
        }

        // Reanudar el contexto si está suspendido (importante para iOS)
        if (audioContext.state === 'suspended') await audioContext.resume();

        const config = audioConfig[cycleType] || audioConfig.pomodoro;
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
      } catch (error) {
        console.warn('Could not play sound:', error);
      }
    },
    [initAudio]
  );

  return { initAudio, playSessionCompleteSound };
};
