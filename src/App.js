// App.js
import React, { useState } from 'react';
import './styles/main.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import CodeSnippets from './components/sections/CodeSnippets';
import Contact from './components/sections/Contact';
import Blog from './components/sections/Blog';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header />
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

