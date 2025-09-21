import React from 'react';
import { toggleContainer, toggleLabel, toggleSwitch, toggleSlider } from './AutoStartToggle.module.css';

export const AutoStartToggle = ({ autoStart, onToggle, disabled = false }) => {
  return (
    <div className={toggleContainer}>
      <label className={`t-md t-bold ${toggleLabel}`} htmlFor="auto-start-toggle">
        Auto start
      </label>
      <div className={toggleSwitch} onClick={onToggle}>
        <input
          type="checkbox"
          id="auto-start-toggle"
          checked={autoStart}
          disabled={disabled}
          aria-label="Activar o desactivar inicio automático del timer"
        />
        <span className={toggleSlider}></span>
      </div>
    </div>
  );
};
