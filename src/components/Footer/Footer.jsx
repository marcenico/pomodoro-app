import React from 'react';
import { footer, footerText } from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={footer}>
      <div className="d-flex jc-center ai-center w-100 gap-32">
        {/* Made with ❤️ by */}
        <p className={footerText}>Made with ❤️ by&nbsp;
          <a className={footerText} href="https://marcenico.com" target="_blank" rel="noopener noreferrer">marcenico</a>
        </p>
        {/* Instagram */}
        <a className={`${footerText} d-flex ai-center f-row gap-4`} href="https://www.instagram.com/_marcenico" target="_blank" rel="noopener noreferrer">
          <span className="">Let's connect</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#instagram" /></svg>
        </a>
      </div>
    </footer>
  );
};

