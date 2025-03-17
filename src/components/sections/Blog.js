import React from 'react';
import '../../styles/components/blog.css';
import blogData from '../../data/blogData';

const Blog = () => {
  return (
    <section id="blog" className="blog-section">
      <div className="section-container">
        <h2 className="section-title">Blog</h2>
        
        <div className="blog-posts">
          {blogData.map((post, index) => (
            <article key={index} className="blog-post">
              <div className="post-image">
                <img src={post.image} alt={post.title} />
              </div>
              
              <div className="post-content">
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-category">{post.category}</span>
                </div>
                
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                
                <a 
                  href={post.link} 
                  className="read-more"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;