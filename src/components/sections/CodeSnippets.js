import React, { useState } from 'react';
import '../../styles/components/code-snippets.css';
import snippetsData from '../../data/snippetsData';
import CodeSnippet from '../common/CodeSnippet';

const CodeSnippets = () => {
  const [activeSnippet, setActiveSnippet] = useState(0);

  return (
    <section id="code" className="code-section">
      <div className="section-container">
        <h2 className="section-title">Code Snippets</h2>
        
        <div className="github-profile">
          <p>
            View all my projects on {' '}
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              GitHub
            </a>
          </p>
        </div>
        
        <div className="snippets-container">
          <div className="snippets-nav">
            {snippetsData.map((snippet, index) => (
              <button
                key={index}
                className={`snippet-nav-item ${activeSnippet === index ? 'active' : ''}`}
                onClick={() => setActiveSnippet(index)}
              >
                {snippet.title}
              </button>
            ))}
          </div>
          
          <div className="snippet-display">
            <CodeSnippet 
              title={snippetsData[activeSnippet].title}
              language={snippetsData[activeSnippet].language}
              code={snippetsData[activeSnippet].code}
              description={snippetsData[activeSnippet].description}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeSnippets;