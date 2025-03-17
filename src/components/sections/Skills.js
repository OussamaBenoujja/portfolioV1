import React from 'react';
import '../../styles/components/skills.css';
import skillsData from '../../data/skillsData';
import SkillCard from '../common/SkillsCard'; 

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <h2 className="section-title">Skills</h2>
        
        <div className="skills-container">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <SkillCard 
                    key={index}
                    name={skill.name}
                    icon={skill.icon}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;