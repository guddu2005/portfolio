import React from 'react';
import Developer3D from './Developer3D';
import { ArrowRight, Mail, Sparkles, FileText, Code2, Server } from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Brief Introduction */}
        <div className="hero-content">
          <div className="hero-badge animate-pulse">
            <Sparkles size={16} className="text-accent-primary" />
            <span>Full Stack Software Engineer • Shivalik College (CGPA 8.64)</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">GUDDU KUMAR</span>
          </h1>

          <h2 className="hero-subtitle">
            FULL STACK DEVELOPER
          </h2>

          <p className="hero-description">
            B.Tech Computer Science & Engineering student at Shivalik College of Engineering, Dehradun (1st & 2nd Year Rank 1 Topper). Completed MERN Stack Internship at Explorin and solved 700+ DSA problems. Specialized in Java 21, Spring Boot 3 microservices, React, and Gemini AI integration.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={18} />
            </a>
            <a href="/guddu_kumar_resume.pdf" download="Guddu_Kumar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <FileText size={18} />
              <span>Download Resume</span>
            </a>
          </div>

          <div className="hero-socials">
            <span className="social-label">Connect with me:</span>
            <div className="social-links">
              <a href="https://github.com/guddu2005" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                <GithubIcon size={20} />
              </a>
              <a href="https://www.linkedin.com/in/guddu-664850287/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                <LinkedinIcon size={20} />
              </a>
              <a href="mailto:reachguddu.dev@gmail.com" className="social-link" title="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Photo Card */}
        <div className="hero-3d-stage">
          <Developer3D />
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 110px;
          padding-bottom: 2.75rem;
          min-height: 88vh;
          display: flex;
          align-items: center;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid var(--border-glow);
          color: var(--accent-cyan);
          font-family: var(--font-mono);
          font-size: 0.825rem;
          margin-bottom: 1.25rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin-bottom: 0.4rem;
        }

        .hero-subtitle {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--accent-secondary);
          letter-spacing: 3px;
          margin-bottom: 1.25rem;
          font-family: var(--font-mono);
        }

        .hero-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 560px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .hero-socials {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .social-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .social-links {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.25);
        }

        .hero-3d-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-title {
            font-size: 2.75rem;
          }
          .hero-subtitle {
            font-size: 1.3rem;
          }
          .hero-3d-stage {
            order: -1;
          }
        }

        @media (max-width: 600px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .hero-actions {
            width: 100%;
            flex-direction: column;
          }
          .hero-actions a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
