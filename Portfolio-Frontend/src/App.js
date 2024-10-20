import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import './App.css';

function App() {
  useEffect(() => {
    // Create a custom cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // Function to update cursor position and size
    const updateCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;

      const distanceFromCenter = Math.sqrt(
        Math.pow(x - windowCenterX, 2) + Math.pow(y - windowCenterY, 2)
      );

      const size = Math.max(30, 100 - distanceFromCenter / 10);

      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
    };

    // Event listener for mouse movement
    document.addEventListener('mousemove', updateCursor);

    // Clean up the cursor and event listener on component unmount
    return () => {
      document.body.removeChild(cursor);
      document.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  return (
    <Router basename="/">
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="*" element={<Home />} /> {/* Catch all route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
