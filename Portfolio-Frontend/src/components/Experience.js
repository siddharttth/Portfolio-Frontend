import React, { useState, useEffect } from 'react';
import { endpoints } from '../config';
import './Experience.css';

const Experience = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch(endpoints.experience)
      .then(res => res.json())
      .then(data => setExperience(data))
      .catch(error => console.error('Error fetching experience:', error));
  }, []);

  return (
    <div className="section-container">
      <h1 className="section-title">Experience</h1>
      <div className="experience-grid">
        {experience.map((exp, index) => (
          <div key={index} className="card experience-card">
            <h2 className="experience-role">{exp.title}</h2>
            <h3 className="experience-company">{exp.company}</h3>
            <p className="experience-period">{exp.period}</p>
            <ul className="experience-achievements">
              {exp.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;