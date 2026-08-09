import React, { useState, useEffect } from 'react';
import { ExternalLink, Search, Filter, Sparkles, Layers, Eye, Edit3, Trash2, Plus } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { api } from '../services/api';

export default function Projects({ isAdmin, onOpenAdmin, onEditProject, onDeleteProject, refreshTrigger }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getProjects(activeCategory);
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeCategory, refreshTrigger]);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (p.tags && p.tags.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const featuredProject = projects.find(p => p.featured);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Portfolio Gallery</span>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">
            Explore web applications, microservices APIs, and full stack solutions built with React and Spring Boot.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="filter-bar glass-card">
          <div className="category-filters">
            {['all', 'Full Stack', 'Backend', 'Frontend'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {isAdmin && (
            <button onClick={() => onOpenAdmin('add-project')} className="btn btn-primary btn-sm add-project-btn">
              <Plus size={16} />
              <span>Add New Project</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching showcase projects from Spring Boot API...</p>
          </div>
        ) : error ? (
          <div className="error-state glass-card">
            <p className="error-msg">{error}</p>
            <button onClick={fetchProjects} className="btn btn-secondary btn-sm">Retry Loading</button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="empty-state glass-card">
            <p>No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card glass-card">
                <div className="card-image-wrapper">
                  <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
                    alt={project.title}
                    className="card-image"
                  />
                  <div className="card-category-badge">{project.category || 'Full Stack'}</div>
                  {project.featured && <div className="card-featured-badge">Featured</div>}
                  
                  {isAdmin && (
                    <div className="admin-card-actions">
                      <button onClick={() => onEditProject(project)} className="admin-action-btn edit" title="Edit Project">
                        <Edit3 size={15} />
                      </button>
                      <button onClick={() => onDeleteProject(project.id)} className="admin-action-btn delete" title="Delete Project">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">{project.description}</p>

                  <div className="card-tags">
                    {project.tags && project.tags.split(',').map((tag, i) => (
                      <span key={i} className="badge">{tag.trim()}</span>
                    ))}
                  </div>

                  <div className="card-footer">
                    <button onClick={() => setSelectedProject(project)} className="btn btn-secondary btn-sm">
                      <Eye size={15} />
                      <span>Details</span>
                    </button>

                    <div className="external-links">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="icon-link" title="GitHub Code">
                          <GithubIcon size={18} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="icon-link" title="Live Preview">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content project-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <button className="close-btn" onClick={() => setSelectedProject(null)}>✕</button>
            </div>
            
            <div className="project-detail-body">
              <img
                src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
                alt={selectedProject.title}
                className="detail-banner-img"
              />

              <div className="detail-meta">
                <span className="badge">{selectedProject.category}</span>
                {selectedProject.featured && <span className="badge" style={{ borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)' }}>★ Featured</span>}
              </div>

              <p className="detail-long-desc">
                {selectedProject.longDescription || selectedProject.description}
              </p>

              <div className="detail-tags-box">
                <h4>Tech Stack</h4>
                <div className="card-tags">
                  {selectedProject.tags && selectedProject.tags.split(',').map((tag, i) => (
                    <span key={i} className="badge">{tag.trim()}</span>
                  ))}
                </div>
              </div>

              <div className="detail-actions">
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <ExternalLink size={16} />
                    <span>Live Application</span>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                    <GithubIcon size={16} />
                    <span>GitHub Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .projects-section {
          padding: 6rem 0;
        }

        .filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem;
          margin-bottom: 2.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .category-filters {
          display: flex;
          gap: 0.5rem;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover, .filter-btn.active {
          background: rgba(99, 102, 241, 0.15);
          color: #fff;
          border-color: rgba(99, 102, 241, 0.3);
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 320px;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.5rem 0.85rem 0.5rem 2.4rem;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
        }

        .search-input:focus {
          border-color: var(--accent-primary);
        }

        .loading-state, .empty-state, .error-state {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-secondary);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 1s infinite linear;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .projects-section {
            padding: 4rem 0;
          }
          .filter-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            max-width: 100%;
          }
          .category-filters {
            overflow-x: auto;
            padding-bottom: 0.25rem;
          }
          .detail-actions {
            flex-direction: column;
          }
          .detail-actions .btn {
            width: 100%;
          }
        }

        @media (max-width: 400px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .card-body {
            padding: 1.15rem;
          }
        }

        .project-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .card-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .project-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(11, 15, 25, 0.8);
          backdrop-filter: blur(8px);
          color: var(--accent-cyan);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid var(--border-color);
        }

        .card-featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--gradient-primary);
          color: #fff;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
          font-weight: 700;
        }

        .admin-card-actions {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.4rem;
        }

        .admin-action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid var(--border-color);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .admin-action-btn.edit:hover { background: var(--accent-primary); }
        .admin-action-btn.delete:hover { background: #ef4444; }

        .card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-title {
          font-size: 1.2rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .card-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .external-links {
          display: flex;
          gap: 0.75rem;
        }

        .icon-link {
          color: var(--text-secondary);
          transition: color 0.2s;
        }

        .icon-link:hover {
          color: var(--accent-primary);
        }

        .detail-banner-img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }

        .detail-meta {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .detail-long-desc {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .detail-tags-box {
          margin-bottom: 1.5rem;
        }

        .detail-tags-box h4 {
          color: #fff;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .detail-actions {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </section>
  );
}
