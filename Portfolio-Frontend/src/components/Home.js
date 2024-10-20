import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">
          Hi, I'm <span className="highlight">Siddharth Shekhar</span>
        </h1>
        <h2 className="home-subtitle">Full-Stack Developer</h2>
        <p className="home-description">
        I'm a passionate software developer specializing in full-stack development with expertise in Go, React, and cloud technologies.
        </p>
        {/* <p className="home-description">
          Currently honing my skills at PSIT Kanpur and exploring new challenges.
        </p> */}
        <div className="home-links">
          <a href="https://github.com/siddharttth" target="_blank" rel="noopener noreferrer" className="home-link">
            GitHub
          </a>
          <a href="https://linkedin.com/in/siddharttth" target="_blank" rel="noopener noreferrer" className="home-link">
            LinkedIn
          </a>
          <a href="https://drive.google.com/file/d/1GcX7kjJ4csB01iWlNgy9UG_qi-knbAXE/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="home-link">
            Resume
          </a>
          <a href="mailto:siddharth.shekharr@gmail.com" className="home-link">
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
