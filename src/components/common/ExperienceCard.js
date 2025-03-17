import React from 'react';

const ExperienceCard = ({ 
  title, 
  company, 
  duration, 
  description, 
  technologies, 
  projectLink, 
  challenges 
}) => {
  return (
    <div className="experience-card">
      <div className="experience-header">
        <h3>{title}</h3>
        <div className="experience-subheader">
          <h4>{company}</h4>
          <span className="duration">{duration}</span>
        </div>
      </div>
      
      <div className="experience-content">
        <p>{description}</p>
        
        {challenges && (
          <div className="challenges">
            <h4>Challenges & Solutions</h4>
            <p>{challenges}</p>
          </div>
        )}
        
        {technologies && (
          <div className="technologies">
            <h4>Technologies Used</h4>
            <ul className="tech-list">
              {technologies.map((tech, index) => (
                <li key={index} className="tech-item">{tech}</li>
              ))}
            </ul>
          </div>
        )}
        
        {projectLink && (
          <div className="project-link">
            <a 
              href={projectLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-project-btn"
            >
              View Project
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;