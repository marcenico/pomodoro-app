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
    duration: 0.5, // Duration of each note in seconds
    delay: 100, // Delay between notes in milliseconds
    volume: 0.2 // Volume level (0.0 to 1.0)
  },
  longBreak: {
    frequencies: [261.63, 329.63, 392.0], // C4, E4, G4 (C major chord lower)
    duration: 0.6,
    delay: 120,
    volume: 0.2
  }
};
