import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setScroll(isAtBottom);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scroll ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Siddharth Shekhar
        </Link>
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/experience" className={location.pathname === '/experience' ? 'active' : ''}>
            Experience
          </Link>
          <Link to="/education" className={location.pathname === '/education' ? 'active' : ''}>
            Education
          </Link>
          <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
            Projects
          </Link>
          <Link to="/skills" className={location.pathname === '/skills' ? 'active' : ''}>
            Skills
          </Link>
          <Link to="/games" className={location.pathname === '/games' ? 'active' : ''}>
            Games
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
