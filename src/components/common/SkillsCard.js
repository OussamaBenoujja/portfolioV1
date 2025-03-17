import React from 'react';

const SkillCard = ({ name, icon, level }) => {
  return (
    <div className="skill-card">
      <div className="skill-icon">
        {icon}
      </div>
      <div className="skill-info">
        <h4>{name}</h4>
        <div className="skill-level">
          <div 
            className="skill-level-bar"
            style={{ width: `${level}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;