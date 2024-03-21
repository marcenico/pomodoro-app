import { useTimer } from './hooks/useTimer';
import './styles.css';

export const PomodoroApp = () => {
  const { time, isPaused, startTimer, pauseTimer, resetTimer } = useTimer({
    minutes: 25,
    seconds: 0
  });

  return (
    <div className="container">
      <h1>Técnica Pomodoro</h1>
      {/* Timer */}
      <div id="timer">{`${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</div>
      {/* Start button */}
      <button id="startBtn" onClick={isPaused ? startTimer : pauseTimer}>
        {isPaused ? 'Start' : 'Pause'}
      </button>
      {/* Reset button */}
      <button id="resetBtn" onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
};
