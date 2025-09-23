import { useTimerContext } from '@contexts/TimerContext';
import React, { useEffect, useRef, useState } from 'react';
import { customSessionContainer, selected } from './CustomSessionOption.module.css';
import { RangeSlider } from './RangeSlider';

export const CustomSessionOption = ({
  isSelected = false,
  onCustomSessionChange,
  onSessionSelect,
  customConfig,
  disabled = false
}) => {
  const { isRunning } = useTimerContext();
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const isInitialized = useRef(false);

  // Sincronizar el estado local con la configuración externa solo una vez
  useEffect(() => {
    if (customConfig && !isInitialized.current) {
      setPomodoroMinutes(customConfig.pomodoro?.minutes || 25);
      setShortBreakMinutes(customConfig.shortBreak?.minutes || 5);
      setLongBreakMinutes(customConfig.longBreak?.minutes || 15);
      isInitialized.current = true;
    }
  }, [customConfig]);

  // Actualizar la configuración cuando cambien los valores localmente
  useEffect(() => {
    if (onCustomSessionChange && isInitialized.current) {
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
      className={`${customSessionContainer} ${isSelected ? selected : ''} d-flex f-col p-16`}
      onClick={handleContainerClick}
      style={{ cursor: isRunning || disabled ? 'default' : 'pointer' }}>
      <div className={`d-flex ai-center jc-between`}>
        <div className="d-flex f-col">
          <span className="t-md t-bold t-950">Custom session</span>
        </div>
      </div>

      <div className="d-flex f-col gap-12">
        <RangeSlider
          label="Pomodoro"
          value={pomodoroMinutes}
          min={1}
          max={60}
          onChange={handlePomodoroChange}
          disabled={isRunning || disabled}
        />
        <RangeSlider
          label="Short break"
          value={shortBreakMinutes}
          min={1}
          max={30}
          onChange={handleShortBreakChange}
          disabled={isRunning || disabled}
        />
        <RangeSlider
          label="Long break"
          value={longBreakMinutes}
          min={1}
          max={60}
          onChange={handleLongBreakChange}
          disabled={isRunning || disabled}
        />
      </div>
    </div>
  );
};
