import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ title, language, code, description }) => {
  return (
    <div className="code-snippet">
      <div className="snippet-header">
        <h3>{title}</h3>
      </div>
      
      <div className="snippet-content">
        <SyntaxHighlighter 
          language={language} 
          style={vscDarkPlus}
          showLineNumbers={true}
          wrapLines={true}
          className="code-block"
        >
          {code}
        </SyntaxHighlighter>
      </div>
      
      {description && (
        <div className="snippet-description">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;
