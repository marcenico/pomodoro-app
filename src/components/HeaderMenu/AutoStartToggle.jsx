import React from 'react';
import { toggleContainer } from './AutoStartToggle.module.css';
import { Toggle } from './Toggle';

export const AutoStartToggle = ({
  pomodoroAutoStart,
  breakAutoStart,
  onPomodoroToggle,
  onBreakToggle,
  disabled = false
}) => {
  return (
    <div className={`${toggleContainer} d-flex f-col pt-12 gap-12`}>
      <Toggle
        id="pomodoro-auto-start"
        label="Auto start pomodoros"
        checked={pomodoroAutoStart}
        onChange={onPomodoroToggle}
        disabled={disabled}
        ariaLabel="Activate or deactivate auto start for pomodoro"
      />

      <Toggle
        id="break-auto-start"
        label="Auto start breaks"
        checked={breakAutoStart}
        onChange={onBreakToggle}
        disabled={disabled}
        ariaLabel="Activate or deactivate auto start for break"
      />
    </div>
  );
};
