import React, { useState } from 'react';
import { Menu, X, Mail, FileText } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-glass">
      <div className="container nav-container">
        <a href="#" className="nav-logo gradient-text font-mono">
          GK.
        </a>

        {/* Desktop Nav Links */}
        <div className="nav-links">
          <a href="#whoami">About</a>
          <a href="#tech">3D Stack</a>
          <a href="#experience">Experience</a>
          <a href="#journey">Journey</a>
          <a href="#projects">Projects</a>
          <a href="#dsa">DSA</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Social Icons & Resume CTA */}
        <div className="nav-actions">
          <div className="desktop-social-row">
            <a href="https://github.com/guddu2005" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="https://www.linkedin.com/in/guddu-664850287/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href="mailto:reachguddu.dev@gmail.com" className="social-icon-btn" title="Email">
              <Mail size={18} />
            </a>
          </div>

          <a href="/guddu_kumar_resume.pdf" download="Guddu_Kumar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm resume-btn">
            <FileText size={15} />
            <span className="resume-text">Resume</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button className="mobile-toggle-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-nav-links">
            <a href="#whoami" onClick={() => setIsOpen(false)}>About</a>
            <a href="#tech" onClick={() => setIsOpen(false)}>3D Stack</a>
            <a href="#experience" onClick={() => setIsOpen(false)}>Experience</a>
            <a href="#journey" onClick={() => setIsOpen(false)}>Journey</a>
            <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
            <a href="#dsa" onClick={() => setIsOpen(false)}>DSA</a>
            <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
          </div>

          {/* Mobile Socials & Download Resume Button */}
          <div className="mobile-drawer-footer">
            <div className="mobile-social-grid">
              <a href="https://github.com/guddu2005" target="_blank" rel="noopener noreferrer" className="mobile-social-link">
                <GithubIcon size={18} />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/guddu-664850287/" target="_blank" rel="noopener noreferrer" className="mobile-social-link">
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:reachguddu.dev@gmail.com" className="mobile-social-link">
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>

            <a href="/guddu_kumar_resume.pdf" download="Guddu_Kumar_Resume.pdf" className="btn btn-primary mobile-resume-full-btn" onClick={() => setIsOpen(false)}>
              <FileText size={18} /> Download Resume (PDF)
            </a>
          </div>
        </div>
      )}

      <style>{`
        .navbar-glass {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(11, 15, 25, 0.88);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border-color);
        }

        .nav-container {
          height: 66px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.25rem;
        }

        .nav-logo {
          font-size: 1.6rem;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: -1px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: var(--accent-primary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .desktop-social-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .social-icon-btn {
          color: var(--text-secondary);
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .social-icon-btn:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.15);
        }

        .resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          white-space: nowrap;
        }

        .mobile-toggle-btn {
          display: none;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: #fff;
          border-radius: 8px;
          padding: 0.4rem;
          cursor: pointer;
        }

        .mobile-menu-drawer {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 1.5rem;
          background: rgba(11, 15, 25, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .mobile-nav-links a {
          color: #fff;
          text-decoration: none;
          font-size: 1.05rem;
          font-weight: 500;
          padding: 0.4rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mobile-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 0.5rem;
        }

        .mobile-social-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.65rem;
        }

        .mobile-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.55rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.8rem;
          text-decoration: none;
        }

        .mobile-resume-full-btn {
          width: 100%;
          justify-content: center;
          padding: 0.75rem;
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .mobile-toggle-btn { display: flex; align-items: center; justify-content: center; }
        }

        @media (max-width: 600px) {
          .nav-container {
            height: 60px;
            padding: 0 1rem;
          }
          .nav-logo {
            font-size: 1.4rem;
          }
          .desktop-social-row {
            display: none;
          }
          .resume-btn {
            padding: 0.35rem 0.75rem;
            font-size: 0.8rem;
          }
          .resume-btn svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </nav>
  );
}
