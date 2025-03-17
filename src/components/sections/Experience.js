import React from 'react';
import '../../styles/components/experience.css';
import experienceData from '../../data/experienceData';
import ExperienceCard from '../common/ExperienceCard';

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <h2 className="section-title">Experience</h2>
        
        <div className="timeline">
          {experienceData.map((exp, index) => (
            <ExperienceCard 
              key={index}
              title={exp.title}
              company={exp.company}
              duration={exp.duration}
              description={exp.description}
              technologies={exp.technologies}
              projectLink={exp.projectLink}
              challenges={exp.challenges}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;