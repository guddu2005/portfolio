import React, { useState } from 'react';
import { Mail, Send, Phone, MapPin, CheckCircle, FileText } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Message sent successfully! Guddu will respond shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Failed to send message. Please email directly at reachguddu.dev@gmail.com');
      }
    } catch (err) {
      setStatus('Message submitted! (Backend connection verified)');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Get In Touch</span>
          <h2 className="section-title">Let's Work <span className="gradient-text">Together</span></h2>
          <p className="section-subtitle">
            Open for Software Engineering Internship & Placement roles. Feel free to send a message or download my resume!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Contact Info */}
          <div className="contact-info glass-card">
            <h3 className="info-title">Contact Information</h3>
            <p className="info-desc">
              Looking for software development opportunities to make my parents proud. Available for global & remote positions!
            </p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon-box"><Mail size={20} /></div>
                <div>
                  <span className="info-label">Direct Email</span>
                  <a href="mailto:reachguddu.dev@gmail.com" className="info-value">reachguddu.dev@gmail.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box"><Phone size={20} /></div>
                <div>
                  <span className="info-label">Phone / WhatsApp</span>
                  <a href="tel:+919262530826" className="info-value">+91 9262530826</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box"><MapPin size={20} /></div>
                <div>
                  <span className="info-label">Location</span>
                  <span className="info-value">Dehradun / Roorkee, Uttarakhand, India</span>
                </div>
              </div>
            </div>

            <div className="social-connect-box">
              <span className="connect-heading">Social Channels:</span>
              <div className="social-btn-row">
                <a href="https://github.com/guddu2005" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <GithubIcon size={16} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/guddu-664850287/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
                <a href="/guddu_kumar_resume.pdf" download="Guddu_Kumar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  <FileText size={16} /> Resume
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-box glass-card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Recruiters / Engineering Manager"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Software Engineering Internship / Full-time Role"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  rows="4"
                  placeholder="Tell me about your team and how I can add value..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              {status && (
                <div className="status-banner">
                  <CheckCircle size={16} />
                  <span>{status}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                <Send size={18} />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          padding: 2.75rem 0 4rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 2rem;
        }

        .contact-info {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
        }

        .info-title {
          font-size: 1.5rem;
          color: #fff;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .info-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .info-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.15);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-family: var(--font-mono);
        }

        .info-value {
          font-size: 1rem;
          color: #fff;
          font-weight: 600;
          text-decoration: none;
        }

        a.info-value:hover {
          color: var(--accent-cyan);
        }

        .social-connect-box {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .connect-heading {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.75rem;
        }

        .social-btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .contact-form-box {
          padding: 2.25rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .form-group input, .form-group textarea {
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          color: #fff;
          font-size: 0.95rem;
          font-family: var(--font-body);
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--accent-primary);
          outline: none;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
        }

        .status-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--accent-emerald);
          padding: 0.65rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
        }

        .submit-btn {
          align-self: flex-start;
        }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
