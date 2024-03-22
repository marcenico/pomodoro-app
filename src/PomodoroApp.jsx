import { Timer } from './components';
import { useTimer } from './hooks/useTimer';
import './styles.css';

export const PomodoroApp = () => {
  const { time, isPaused, startTimer, pauseTimer, resetTimer } = useTimer({
    minutes: 25,
    seconds: 0
  });

  return (
    <main className="main-container text-center">
      <h1>Técnica Pomodoro</h1>
      {/* Timer */}
      <Timer time={time} />
      {/* Actions */}
      <section className="actions">
        {/* Start button */}
        <button className="actions__button actions__button--start" onClick={isPaused ? startTimer : pauseTimer}>
          {isPaused ? 'Start' : 'Pause'}
        </button>
        {/* Reset button */}
        <button className="actions__button actions__button--reset" onClick={resetTimer}>
          Reset
        </button>
      </section>
    </main>
  );
};
