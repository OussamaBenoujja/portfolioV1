
import React from 'react';

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  technologies, 
  liveLink, 
  githubLink,
  categories 
}) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={image} alt={title} />
        <div className="project-overlay">
          <div className="project-links">
            {liveLink && (
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link live-link"
              >
                Live Demo
              </a>
            )}
            
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link github-link"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="project-details">
        <h3>{title}</h3>
        <p>{description}</p>
        
        <div className="project-tech">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        
        <div className="project-categories">
          {categories.map((category, index) => (
            <span key={index} className="category-tag">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;