import { useEffect, useState } from 'react';
import './styles.css';

export const PomodoroApp = () => {
  const [time, setTime] = useState({ minutes: 25, seconds: 0 });
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let intervalId;
    if (!isPaused) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const { minutes, seconds } = prevTime;
          if (minutes === 0 && seconds === 0) {
            clearInterval(intervalId);
            alert('¡Tiempo cumplido!');
            setIsPaused(true);
            return prevTime;
          } else {
            const newMinutes = seconds === 0 ? minutes - 1 : minutes;
            const newSeconds = seconds === 0 ? 59 : seconds - 1;
            return { minutes: newMinutes, seconds: newSeconds };
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const startTimer = () => setIsPaused(false);
  const pauseTimer = () => setIsPaused(true);
  const resetTimer = () => {
    setIsPaused(true);
    setTime({ minutes: 25, seconds: 0 });
  };

  return (
    <div className="container">
      <h1>Técnica Pomodoro</h1>
      <div id="timer">{`${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</div>
      <button id="startBtn" onClick={isPaused ? startTimer : pauseTimer}>
        {isPaused ? 'Start' : 'Pause'}
      </button>
      <button id="resetBtn" onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
};
