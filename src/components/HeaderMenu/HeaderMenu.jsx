import React, { useState } from 'react';
import { sessionsGrid, sessionsMenu } from './HeaderMenu.module.css';
import { SessionOption } from './SessionOption';

export const HeaderMenu = ({ isOpen }) => {
  const [sessionOptions, setSessionOptions] = useState([
    { id: 'light-focus', name: 'Light Focus', times: '15min 5min 10min', isSelected: false },
    { id: 'classic-pomodoro', name: 'Classic Pomodoro', times: '25min 5min 15min', isSelected: true },
    { id: 'deep-work', name: 'Deep Work', times: '40min 10min 20min', isSelected: false },
    { id: 'full-sprint', name: 'Full Sprint', times: '60min 12min 25min', isSelected: false }
  ]);

  if (!isOpen) return null;

  const handleSessionSelect = (sessionId) => {
    sessionOptions.forEach((session) => {
      session.isSelected = session.id === sessionId;
      setSessionOptions([...sessionOptions]);
    });
  };

  return (
    <div className={`${sessionsMenu} d-flex f-col gap-12 p-16`}>
      <h2 className={`t-lg t-bold t-950`}>Sessions settings</h2>
      <div className={`${sessionsGrid} gap-1`}>
        {sessionOptions.map((session) => (
          <SessionOption
            key={session.id}
            name={session.name}
            times={session.times}
            isSelected={session.isSelected}
            onClick={() => handleSessionSelect(session.id)}
          />
        ))}
      </div>
    </div>
  );
};
