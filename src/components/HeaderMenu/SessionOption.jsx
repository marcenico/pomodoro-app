import React from 'react';
import { useTimerContext } from '@contexts/TimerContext';
import { checkmark, radioButton, selected, sessionName, sessionOption, sessionTimes } from './SessionOption.module.css';

export const SessionOption = ({ name, times, isSelected = false, onClick }) => {
  const { isRunning } = useTimerContext();

  return (
    <button
      className={`${sessionOption} ${isSelected ? selected : ''} d-flex ai-center gap-12 p-8 t-left`}
      onClick={onClick}
      disabled={isRunning}>
      <div className={`${radioButton} ${isSelected ? selected : ''}`}>
        {isSelected && <div className={checkmark}></div>}
      </div>
      <div className="d-flex f-col t-left">
        <span className={`${sessionName} t-md t-bold t-950`}>{name}</span>
        <span className={`${sessionTimes} t-sm t-regular t-950`}>{times}</span>
      </div>
    </button>
  );
};
