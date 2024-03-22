import { Actions, Timer } from './components';
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
      <Timer time={time} />
      <Actions isPaused={isPaused} pauseTimer={pauseTimer} resetTimer={resetTimer} startTimer={startTimer} />
    </main>
  );
};
