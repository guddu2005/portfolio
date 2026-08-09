import React, { useState } from 'react';
import { Cpu, Database, Layout, Wrench, Layers, Award, CheckCircle2 } from 'lucide-react';

const SKILLS_DATA = [
  { name: 'Java 21', category: 'backend', level: 95, icon: Cpu },
  { name: 'Spring Boot 3', category: 'backend', level: 92, icon: Layers },
  { name: 'Spring Security & JWT', category: 'backend', level: 90, icon: Cpu },
  { name: 'Hibernate / JPA', category: 'backend', level: 88, icon: Database },
  { name: 'React', category: 'frontend', level: 90, icon: Layout },
  { name: 'Vite', category: 'frontend', level: 92, icon: Layout },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 94, icon: Layout },
  { name: 'Vanilla CSS / Glassmorphism', category: 'frontend', level: 95, icon: Layout },
  { name: 'H2 Database / SQL', category: 'database', level: 90, icon: Database },
  { name: 'PostgreSQL & MySQL', category: 'database', level: 85, icon: Database },
  { name: 'Maven Build Tool', category: 'tools', level: 90, icon: Wrench },
  { name: 'Git & GitHub', category: 'tools', level: 92, icon: Wrench },
  { name: 'REST API Architecture', category: 'backend', level: 96, icon: Layers },
];

export default function About() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(skill => skill.category === activeCategory);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Expertise & Stack</span>
          <h2 className="section-title">About Me & <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle">
            Passionate Software Engineer building enterprise-grade backend services with Spring Boot and reactive modern frontends with React.
          </p>
        </div>

        <div className="about-grid">
          {/* Left: Bio & Timeline */}
          <div className="bio-card glass-card">
            <h3 className="card-heading">Engineering Journey</h3>
            <p className="bio-text">
              I specialize in crafting secure, maintainable RESTful microservices and single-page applications. My focus spans from designing Spring Security filter chains with stateless JWT authentication to crafting pixel-perfect, responsive React interfaces.
            </p>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Full Stack Developer</h4>
                  <span className="timeline-date">2024 - Present</span>
                  <p>Developing Spring Boot REST APIs with JWT security, JPA data persistence, and React Vite single page frontends.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Java Backend Engineer</h4>
                  <span className="timeline-date">2022 - 2024</span>
                  <p>Architected core Spring Boot microservices, database schemas, and external API integrations with high availability.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Skills Showcase */}
          <div className="skills-card glass-card">
            <div className="skills-header">
              <h3 className="card-heading">Technical Proficiency</h3>
              <div className="skills-tabs">
                {['all', 'backend', 'frontend', 'database', 'tools'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="skills-grid">
              {filteredSkills.map((skill, idx) => {
                const IconComponent = skill.icon;
                return (
                  <div key={idx} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">
                        <IconComponent size={16} className="skill-icon" />
                        {skill.name}
                      </span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 6rem 0;
          position: relative;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 2rem;
        }

        .bio-card, .skills-card {
          padding: 2.25rem;
        }

        .card-heading {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: #fff;
        }

        .bio-text {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.7;
          font-size: 1rem;
        }

        .timeline {
          position: relative;
          padding-left: 1.5rem;
          border-left: 2px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .timeline-item {
          position: relative;
        }

        .timeline-dot {
          position: absolute;
          left: -1.95rem;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-primary);
        }

        .timeline-content h4 {
          font-size: 1.05rem;
          color: #fff;
        }

        .timeline-date {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-cyan);
          display: block;
          margin: 0.2rem 0 0.4rem;
        }

        .timeline-content p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .skills-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .skills-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tab-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.825rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn:hover, .tab-btn.active {
          background: var(--accent-primary);
          color: #fff;
          border-color: var(--accent-primary);
        }

        .skills-grid {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.4rem;
          font-size: 0.9rem;
        }

        .skill-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #fff;
          font-weight: 500;
        }

        .skill-icon {
          color: var(--accent-secondary);
        }

        .skill-percent {
          font-family: var(--font-mono);
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .skill-bar-bg {
          height: 7px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 999px;
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 999px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .bio-card, .skills-card {
            padding: 1.5rem;
          }
        }
        @media (max-width: 480px) {
          .bio-card, .skills-card {
            padding: 1.25rem;
          }
          .skills-tabs {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.4rem;
          }
        }
      `}</style>
    </section>
  );
}
