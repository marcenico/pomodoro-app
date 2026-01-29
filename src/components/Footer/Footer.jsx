import React from 'react';
import { footer, footerText, footerLinkButton } from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={footer}>
      <div className="d-flex jc-center ai-center w-100 gap-32">
        {/* Made with ❤️ by */}
        <p className={footerText}>Made with ❤️ by&nbsp;
          <a className={footerLinkButton} href="https://marcenico.com" target="_blank" rel="noopener noreferrer">marcenico</a>
        </p>

        {/* Let's connect */}
        <div className="d-flex jc-center ai-center f-row gap-8">
          <span className={footerText}>Let's connect</span>

          {/* LinkedIn */}
          <a className={` ${footerLinkButton} d-flex ai-center f-row gap-4`} href="https://www.linkedin.com/in/marcenico/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#linkedin" /></svg>
          </a>

          {/* X */}
          <a className={` ${footerLinkButton} d-flex ai-center f-row gap-4`} href="https://x.com/_marcenico" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#x" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

