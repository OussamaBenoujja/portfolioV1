import React from 'react';
import '../styles/components/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>&copy; {currentYear} Oussama Benoujja. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:your.email@example.com">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;