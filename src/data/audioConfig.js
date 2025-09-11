export const audioConfig = {
  enabled: true,
  pomodoro: {
    frequencies: [440, 554.37, 659.25], // A4, C#5, E5 (A major chord)
    duration: 0.4,
    delay: 80,
    volume: 0.2
  },
  shortBreak: {
    frequencies: [523.25, 659.25, 783.99], // C5, E5, G5 (C major chord)
    duration: 0.5,
    delay: 100,
    volume: 0.2
  },
  longBreak: {
    frequencies: [523.25, 659.25, 783.99, 1046.5], // C5, E5, G5, C6 (C major chord higher + octave)
    duration: 0.5,
    delay: 100,
    volume: 0.2
  }
};
