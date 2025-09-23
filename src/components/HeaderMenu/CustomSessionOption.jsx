import { useTimerContext } from '@contexts/TimerContext';
import React, { useEffect, useState } from 'react';
import {
  customSessionContainer,
  rangeSlider,
  sliderLabel,
  sliderRow,
  sliderValue,
  selected
} from './CustomSessionOption.module.css';

export const CustomSessionOption = ({
  isSelected = false,
  onCustomSessionChange,
  onSessionSelect,
  disabled = false
}) => {
  const { isRunning } = useTimerContext();
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  useEffect(() => {
    if (onCustomSessionChange) {
      onCustomSessionChange({
        pomodoro: { minutes: pomodoroMinutes, seconds: 0 },
        shortBreak: { minutes: shortBreakMinutes, seconds: 0 },
        longBreak: { minutes: longBreakMinutes, seconds: 0 }
      });
    }
  }, [pomodoroMinutes, shortBreakMinutes, longBreakMinutes]);

  const handlePomodoroChange = (e) => {
    const value = parseInt(e.target.value);
    setPomodoroMinutes(value);
    if (onSessionSelect) onSessionSelect('custom');
  };

  const handleShortBreakChange = (e) => {
    const value = parseInt(e.target.value);
    setShortBreakMinutes(value);
    if (onSessionSelect) onSessionSelect('custom');
  };

  const handleLongBreakChange = (e) => {
    const value = parseInt(e.target.value);
    setLongBreakMinutes(value);
    if (onSessionSelect) onSessionSelect('custom');
  };

  const handleContainerClick = () => {
    if (onSessionSelect && !isRunning && !disabled) {
      onSessionSelect('custom');
    }
  };

  return (
    <div
      className={`${customSessionContainer} ${isSelected ? selected : ''} d-flex f-col gap-16 p-16`}
      onClick={handleContainerClick}
      style={{ cursor: isRunning || disabled ? 'default' : 'pointer' }}>
      <div className={`d-flex ai-center jc-between`}>
        <div className="d-flex f-col">
          <span className="t-md t-bold t-950">Sesión Personalizada</span>
        </div>
      </div>

      <div className={`d-flex f-col gap-12`}>
        <div className={`${sliderRow} d-flex ai-end jc-between`}>
          <label className={`${sliderLabel} t-sm t-regular t-950`}>Pomodoro</label>
          <span className={`${sliderValue} t-sm t-bold t-600`}>{pomodoroMinutes} min</span>
        </div>
        <input
          type="range"
          min="5"
          max="60"
          value={pomodoroMinutes}
          onChange={handlePomodoroChange}
          disabled={isRunning || disabled}
          className={rangeSlider}
        />

        <div className={`${sliderRow} d-flex ai-end jc-between`}>
          <label className={`${sliderLabel} t-sm t-regular t-950`}>Descanso Corto</label>
          <span className={`${sliderValue} t-sm t-bold t-600`}>{shortBreakMinutes} min</span>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          value={shortBreakMinutes}
          onChange={handleShortBreakChange}
          disabled={isRunning || disabled}
          className={rangeSlider}
        />

        <div className={`${sliderRow} d-flex ai-end jc-between`}>
          <label className={`${sliderLabel} t-sm t-regular t-950`}>Descanso Largo</label>
          <span className={`${sliderValue} t-sm t-bold t-600`}>{longBreakMinutes} min</span>
        </div>
        <input
          type="range"
          min="5"
          max="60"
          value={longBreakMinutes}
          onChange={handleLongBreakChange}
          disabled={isRunning || disabled}
          className={rangeSlider}
        />
      </div>
    </div>
  );
};
