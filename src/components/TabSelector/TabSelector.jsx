import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { tabContainer, tabIndicator, tabItem, tabItemActive } from './TabSelector.module.css';

const tabs = [
  { id: 'pomodoro', label: 'Pomodoro' },
  { id: 'shortBreak', label: 'Short break' },
  { id: 'longBreak', label: 'Long break' }
];

export const TabSelector = ({ activeTab, isRunning, onTabChange }) => {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // Memoizar la función para calcular la posición del indicador
  const calculateIndicatorPosition = useCallback(() => {
    if (!containerRef.current) return;

    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const containerWidth = containerRef.current.offsetWidth;
    const tabWidth = containerWidth / tabs.length;
    const leftPosition = tabWidth * activeIndex + tabWidth / 2;
    setIndicatorStyle({ left: `${leftPosition}px` });
  }, [activeTab]);

  useEffect(() => calculateIndicatorPosition(), [calculateIndicatorPosition]);
  useEffect(() => {
    const handleResize = () => calculateIndicatorPosition();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [calculateIndicatorPosition]);

  // Memoizar el handler de cambio de tab
  const handleTabClick = useCallback(
    (tabId) => {
      if (isRunning && tabId !== activeTab) return;
      onTabChange(tabId);
    },
    [isRunning, activeTab, onTabChange]
  );

  // Memoizar los tabs renderizados
  const renderedTabs = useMemo(
    () =>
      tabs.map((tab) => (
        <button
          key={tab.id}
          className={`f-1 t-md t-950 t-center t-medium ${tabItem} ${activeTab === tab.id && tabItemActive}`}
          disabled={isRunning && tab.id !== activeTab}
          type="button"
          onClick={() => handleTabClick(tab.id)}>
          {tab.label}
        </button>
      )),
    [activeTab, isRunning, handleTabClick, tabItem, tabItemActive]
  );

  return (
    <div ref={containerRef} className={`d-flex ai-center gap-12 p-12 ${tabContainer}`}>
      {renderedTabs}
      <div className={tabIndicator} style={indicatorStyle} />
    </div>
  );
};
