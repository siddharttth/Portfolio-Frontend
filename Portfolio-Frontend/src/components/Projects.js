import React, { useState, useEffect } from 'react';
import { endpoints } from '../config';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(endpoints.projects)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div className="section-container">
      <h1 className="section-title">Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="card project-card">
            <h2 className="project-name">{project.name}</h2>
            <div className="project-period">{project.period}</div>
            <div className="project-tech">
              <span className="tech-stack-label">Tech Stack:</span>
              <span className="tech-stack">{project.techStack}</span>
            </div>
            <ul className="project-points">
              {project.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;