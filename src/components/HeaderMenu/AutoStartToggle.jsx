import React from 'react';
import { toggleContainer, toggleItem, toggleLabel, toggleSlider, toggleSwitch } from './AutoStartToggle.module.css';

export const AutoStartToggle = ({
  pomodoroAutoStart,
  breakAutoStart,
  onPomodoroToggle,
  onBreakToggle,
  disabled = false
}) => {
  return (
    <div className={`${toggleContainer} d-flex f-col pt-12 gap-12 `}>
      <div className={toggleItem} onClick={onPomodoroToggle}>
        <label className={`${toggleLabel} t-md t-bold t-950`} htmlFor="pomodoro-auto-start">
          Auto start pomodoros
        </label>
        <div className={toggleSwitch}>
          <input
            type="checkbox"
            id="pomodoro-auto-start"
            checked={pomodoroAutoStart}
            onChange={() => {}}
            disabled={disabled}
            aria-label="Activate or deactivate auto start for pomodoro"
          />
          <span className={toggleSlider}></span>
        </div>
      </div>

      <div className={toggleItem} onClick={onBreakToggle}>
        <label className={`${toggleLabel} t-md t-bold t-950`} htmlFor="break-auto-start">
          Auto start breaks
        </label>
        <div className={toggleSwitch}>
          <input
            type="checkbox"
            id="break-auto-start"
            checked={breakAutoStart}
            onChange={() => {}}
            disabled={disabled}
            aria-label="Activate or deactivate auto start for break"
          />
          <span className={toggleSlider}></span>
        </div>
      </div>
    </div>
  );
};
