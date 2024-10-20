import React, { useState, useEffect } from 'react';
import { endpoints } from '../config';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(endpoints.skills)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(error => console.error('Error fetching skills:', error));
  }, []);

  return (
    <div className="section-container">
      <h1 className="section-title">Skills</h1>
      <div className="skills-grid">
        {skills.map((skillCategory, index) => (
          <div key={index} className="card skill-card">
            <h2 className="skill-category">{skillCategory.category}</h2>
            <div className="skill-items">
              {skillCategory.items.map((item, i) => (
                <span key={i} className="skill-item">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;