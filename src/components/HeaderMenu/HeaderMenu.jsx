import React from 'react';
import { sessionsGrid, sessionsMenu } from './HeaderMenu.module.css';
import { SessionOption } from './SessionOption';

export const HeaderMenu = ({ isOpen, sessionOptions, selectedSession, onSessionChange }) => {
  if (!isOpen) return null;

  const handleSessionSelect = (sessionId) => {
    onSessionChange(sessionId);
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
            isSelected={session.id === selectedSession}
            onClick={() => handleSessionSelect(session.id)}
          />
        ))}
      </div>
    </div>
  );
};
