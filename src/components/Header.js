import React, { useContext } from 'react';
import '../styles/components/header.css';
import ThreeEye from './ThreeEye';

const Header = ({ darkMode }) => {
  return (
    <header className="header">
      {/* Add the eye component */}
      <div className="eye-container">
        <ThreeEye darkMode={darkMode} />
      </div>
      
      {/* Keep the original header content */}
      <div className="header-content">
        <h1>Oussama Benoujja</h1>
        <h2>Full-Stack Web Developer</h2>
      </div>
    </header>
  );
};

export default Header;