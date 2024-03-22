import React from 'react';

export const Timer = ({ time }) => {
  const { minutes, seconds } = time;
  return <div className="timer">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>;
};
