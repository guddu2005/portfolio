import React, { useState, useEffect } from 'react';
import { Lock, Mail, Plus, Edit3, Trash2, CheckCircle, AlertCircle, Save, LogIn, FolderPlus } from 'lucide-react';
import { api } from '../services/api';

export default function AdminModal({ mode, projectToEdit, onClose, onLoginSuccess, onRefreshProjects, onShowToast }) {
  const [activeTab, setActiveTab] = useState(mode || 'login');

  // Login Form State
  const [loginCreds, setLoginCreds] = useState({ username: 'admin', password: 'admin123' });
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: 'Full Stack',
    imageUrl: '',
    tags: 'React, Spring Boot, Java 21',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });
  const [projectSubmitting, setProjectSubmitting] = useState(false);
  const [projectError, setProjectError] = useState('');

  // Inbox Messages State
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    if (mode) setActiveTab(mode);
  }, [mode]);

  useEffect(() => {
    if (projectToEdit) {
      setProjectForm({
        title: projectToEdit.title || '',
        description: projectToEdit.description || '',
        longDescription: projectToEdit.longDescription || '',
        category: projectToEdit.category || 'Full Stack',
        imageUrl: projectToEdit.imageUrl || '',
        tags: projectToEdit.tags || '',
        liveUrl: projectToEdit.liveUrl || '',
        githubUrl: projectToEdit.githubUrl || '',
        featured: projectToEdit.featured || false
      });
      setActiveTab('add-project');
    }
  }, [projectToEdit]);

  useEffect(() => {
    if (activeTab === 'inbox' && api.isAuthenticated()) {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const data = await api.getContactMessages();
      setMessages(data);
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to load inbox messages', 'error');
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginSubmitting(true);
      setLoginError('');
      const data = await api.login(loginCreds.username, loginCreds.password);
      if (onLoginSuccess) onLoginSuccess(data);
      if (onShowToast) onShowToast(`Welcome back, ${data.username}! JWT token generated.`, 'success');
      onClose();
    } catch (err) {
      setLoginError(err.message || 'Invalid username or password');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectForm.title) {
      setProjectError('Project Title is required');
      return;
    }

    try {
      setProjectSubmitting(true);
      setProjectError('');

      if (projectToEdit) {
        await api.updateProject(projectToEdit.id, projectForm);
        if (onShowToast) onShowToast('Project updated successfully!', 'success');
      } else {
        await api.createProject(projectForm);
        if (onShowToast) onShowToast('New project created successfully!', 'success');
      }

      if (onRefreshProjects) onRefreshProjects();
      onClose();
    } catch (err) {
      setProjectError(err.message || 'Failed to save project');
    } finally {
      setProjectSubmitting(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    try {
      await api.deleteContactMessage(id);
      setMessages(messages.filter(m => m.id !== id));
      if (onShowToast) onShowToast('Message deleted', 'success');
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to delete message', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-tabs">
            {api.isAuthenticated() ? (
              <>
                <button
                  className={`modal-tab ${activeTab === 'add-project' ? 'active' : ''}`}
                  onClick={() => setActiveTab('add-project')}
                >
                  <FolderPlus size={16} />
                  <span>{projectToEdit ? 'Edit Project' : 'Add Project'}</span>
                </button>
                <button
                  className={`modal-tab ${activeTab === 'inbox' ? 'active' : ''}`}
                  onClick={() => setActiveTab('inbox')}
                >
                  <Mail size={16} />
                  <span>Contact Inbox ({messages.length})</span>
                </button>
              </>
            ) : (
              <h2 className="gradient-text">Admin Login</h2>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="admin-modal-body">
          {/* LOGIN TAB */}
          {activeTab === 'login' && !api.isAuthenticated() && (
            <form onSubmit={handleLoginSubmit} className="admin-form">
              <p className="admin-login-hint">
                Log in with the seeded Spring Boot Admin credentials: <code>username: admin</code> / <code>password: admin123</code>
              </p>

              {loginError && (
                <div className="form-error">
                  <AlertCircle size={16} />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={loginCreds.username}
                  onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginCreds.password}
                  onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" disabled={loginSubmitting} className="btn btn-primary btn-submit">
                {loginSubmitting ? (
                  <span>Authenticating with JWT...</span>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>Log In to Dashboard</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* ADD / EDIT PROJECT TAB */}
          {activeTab === 'add-project' && api.isAuthenticated() && (
            <form onSubmit={handleProjectSubmit} className="admin-form">
              {projectError && (
                <div className="form-error">
                  <AlertCircle size={16} />
                  <span>{projectError}</span>
                </div>
              )}

              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Enterprise E-Commerce Engine"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="select-input"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="AI / ML">AI / ML</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Featured Project?</label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    />
                    <span>Highlight on showcase</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Short Description</label>
                <input
                  type="text"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Brief summary for project card..."
                />
              </div>

              <div className="form-group">
                <label>Detailed Description</label>
                <textarea
                  rows="3"
                  value={projectForm.longDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, longDescription: e.target.value })}
                  placeholder="Full project architecture details..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={projectForm.imageUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="form-group">
                <label>Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  placeholder="React, Spring Boot 3, Java 21, Vite"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Live Demo URL</label>
                  <input
                    type="text"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="form-group">
                  <label>GitHub Repository URL</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                <button type="submit" disabled={projectSubmitting} className="btn btn-primary">
                  <Save size={16} />
                  <span>{projectSubmitting ? 'Saving...' : projectToEdit ? 'Update Project' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          )}

          {/* CONTACT INBOX TAB */}
          {activeTab === 'inbox' && api.isAuthenticated() && (
            <div className="inbox-container">
              {loadingMessages ? (
                <div className="loading-state"><p>Loading messages...</p></div>
              ) : messages.length === 0 ? (
                <div className="empty-state"><p>No visitor contact messages received yet.</p></div>
              ) : (
                <div className="messages-list">
                  {messages.map((msg) => (
                    <div key={msg.id} className="message-item glass-card">
                      <div className="message-header">
                        <div>
                          <h4 className="sender-name">{msg.name}</h4>
                          <span className="sender-email">{msg.email}</span>
                        </div>
                        <div className="message-meta">
                          <span className="message-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                          <button onClick={() => handleDeleteMessage(msg.id)} className="admin-action-btn delete" title="Delete Message">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      {msg.subject && <div className="message-subject">Subject: {msg.subject}</div>}
                      <p className="message-body">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-modal-content {
          max-width: 680px;
        }

        .modal-header-tabs {
          display: flex;
          gap: 0.5rem;
        }

        .modal-tab {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .modal-tab.active {
          background: rgba(99, 102, 241, 0.15);
          color: #fff;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .admin-login-hint {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.2);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
        }

        .admin-login-hint code {
          color: var(--accent-cyan);
        }

        .select-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          color: #fff;
          outline: none;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #fff;
          font-size: 0.9rem;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.15rem;
        }

        @media (max-width: 600px) {
          .admin-modal-content {
            padding: 1.25rem;
            max-width: 95vw;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .form-actions {
            flex-direction: column-reverse;
          }
          .form-actions .btn {
            width: 100%;
          }
        }

        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message-item {
          padding: 1.25rem;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .sender-name {
          color: #fff;
          font-size: 1rem;
        }

        .sender-email {
          color: var(--accent-cyan);
          font-size: 0.85rem;
        }

        .message-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .message-date {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .message-subject {
          font-weight: 600;
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }

        .message-body {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
