import React from 'react';
import '../../styles/components/about.css';
import aboutData from '../../data/aboutData';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-image">
            <div className="image-placeholder">
             
              <img src="/assets/images/profile-photo.jpg" alt="Oussama Benoujja" />
            </div>
          </div>
          
          <div className="about-text">
            <h3>{aboutData.name}</h3>
            <h4>{aboutData.title}</h4>
            
            <p className="about-bio">{aboutData.bio}</p>
            
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-icon">🎓</span>
                <span className="detail-text">{aboutData.education}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span className="detail-text">{aboutData.location}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-icon">💼</span>
                <span className="detail-text">{aboutData.currentRole}</span>
              </div>
            </div>
            
            <div className="about-interests">
              <h4>Interests</h4>
              <ul>
                {aboutData.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;