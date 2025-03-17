// components/sections/Projects.js
import React, { useState } from 'react';
import '../../styles/components/projects.css';
import projectsData from '../../data/projectsData';
import ProjectCard from '../common/ProjectCard';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const categories = [
    'all',
    'web',
    'php',
    'laravel',
    'javascript',
    'unity',
    'blender'
  ];
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.categories.includes(filter));

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <h2 className="section-title">My Projects</h2>
        
        <div className="projects-filter">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              liveLink={project.liveLink}
              githubLink={project.githubLink}
              categories={project.categories}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;