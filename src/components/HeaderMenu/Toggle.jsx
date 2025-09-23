import React from 'react';
import { toggleItem, toggleLabel, toggleSlider, toggleSwitch } from './Toggle.module.css';

export const Toggle = ({ id, label, checked = false, onChange, disabled = false, ariaLabel, className = '' }) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange();
    }
  };

  return (
    <div className={`${toggleItem} ${className}`} onClick={handleToggle}>
      <label className={`${toggleLabel} t-md t-bold t-950`} htmlFor={id}>
        {label}
      </label>
      <div className={toggleSwitch}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={() => {}}
          disabled={disabled}
          aria-label={ariaLabel || label}
        />
        <span className={toggleSlider}></span>
      </div>
    </div>
  );
};
