import React, { useState, useEffect } from 'react';
import { endpoints } from '../config';
import './Education.css';

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch(endpoints.education)
      .then(res => res.json())
      .then(data => setEducation(data))
      .catch(error => console.error('Error fetching education:', error));
  }, []);

  return (
    <div className="section-container">
      <h1 className="section-title">Education</h1>
      <div className="education-grid">
        {education.map((edu, index) => (
          <div key={index} className="card education-card">
            <h2 className="education-degree">{edu.degree}</h2>
            <h3 className="education-institute">{edu.institute}</h3>
            <div className="education-details">
              <span className="education-year">{edu.year}</span>
              <span className="education-grade">CGPA: {edu.cgpa}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;