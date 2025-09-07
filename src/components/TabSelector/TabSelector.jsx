import React from 'react';
import { tabContainer, tabItem, tabItemActive } from './TabSelector.module.css';

export const TabSelector = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'pomodoro', label: 'Pomodoro' },
    { id: 'short-break', label: 'Short break' },
    { id: 'long-break', label: 'Long break' }
  ];

  return (
    <div className={tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${tabItem} ${activeTab === tab.id ? tabItemActive : ''}`}
          onClick={() => onTabChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
