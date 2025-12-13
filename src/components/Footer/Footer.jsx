import React from 'react';
import { footer, footerText } from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={footer}>
      <div className="d-flex jc-center ai-center w-100">
        <p className={footerText}>
          {currentYear} - The Pomodoro Technique
        </p>
      </div>
    </footer>
  );
};

