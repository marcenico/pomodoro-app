import React, { useEffect, useRef, useState } from 'react';
import { tabContainer, tabIndicator, tabItem, tabItemActive } from './TabSelector.module.css';

const tabs = [
  { id: 'pomodoro', label: 'Pomodoro' },
  { id: 'shortBreak', label: 'Short break' },
  { id: 'longBreak', label: 'Long break' }
];

export const TabSelector = ({ activeTab, isRunning, onTabChange }) => {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const calculateIndicatorPosition = () => {
    if (!containerRef.current) return;

    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const containerWidth = containerRef.current.offsetWidth;
    const tabWidth = containerWidth / tabs.length;
    const leftPosition = tabWidth * activeIndex + tabWidth / 2;
    setIndicatorStyle({ left: `${leftPosition}px` });
  };

  useEffect(() => calculateIndicatorPosition(), [activeTab]);
  useEffect(() => {
    const handleResize = () => calculateIndicatorPosition();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  return (
    <div ref={containerRef} className={`d-flex ai-center gap-12 p-12 ${tabContainer}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`f-1 t-md t-950 t-center t-medium ${tabItem} ${activeTab === tab.id && tabItemActive}`}
          disabled={isRunning && tab.id !== activeTab}
          type="button"
          onClick={() => onTabChange(tab.id)}>
          {tab.label}
        </button>
      ))}
      <div className={tabIndicator} style={indicatorStyle} />
    </div>
  );
};
