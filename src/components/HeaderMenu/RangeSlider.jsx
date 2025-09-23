import React from 'react';
import { rangeSlider, sliderContainer, sliderLabel, sliderValue } from './RangeSlider.module.css';

export const RangeSlider = ({ label, value, min = 1, max = 60, onChange, disabled = false, className = '' }) => {
  return (
    <div className={`${sliderContainer} d-flex f-col gap-8 ${className}`}>
      <div className="d-flex ai-end jc-between">
        <label className={`${sliderLabel} t-sm t-regular t-950`}>{label}</label>
        <span className={`${sliderValue} t-sm t-bold t-600`}>{value} min</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={rangeSlider}
        aria-label={`${label}: ${value} minutos`}
      />
    </div>
  );
};
