import React from 'react';
import { GraduationCap, Award, Code, Server, Layers, Cpu, Smartphone, Brain } from 'lucide-react';

export default function WhoAmISection() {
  return (
    <section className="whoami-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Academic & Multi-Tech Exploration</span>
          <h2 className="section-title">Who <span className="gradient-text">Am I?</span></h2>
          <p className="section-subtitle">
            Academic excellence at Shivalik College of Engineering, Dehradun, and my technology exploration spanning AI/ML, Android, Java & Web Development.
          </p>
        </div>

        <div className="holographic-grid">
          {/* Panel 1: Academic Credentials */}
          <div className="holo-panel glass-card">
            <div className="holo-glow-line"></div>
            <div className="holo-card-header">
              <div className="holo-icon-box">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="holo-name">GUDDU KUMAR</h3>
                <span className="holo-subtitle">B.Tech Computer Science & Engineering</span>
              </div>
            </div>
            
            <div className="holo-stats-row">
              <div className="holo-stat-pill">
                <span className="stat-value">Rank 1</span>
                <span className="stat-label">1st & 2nd Year Batch Topper</span>
              </div>
              <div className="holo-stat-pill">
                <span className="stat-value">Shivalik</span>
                <span className="stat-label">College of Engineering, Dehradun</span>
              </div>
            </div>

            <p className="holo-desc">
              Enrolled in B.Tech CSE at Shivalik College of Engineering, Dehradun in 2023. Started DSA in C++ from 1st semester, topped 1st & 2nd Year, won 2 hackathons, and mastered Java 21 & Spring Boot 3 microservices.
            </p>
          </div>

          {/* Panel 2: Technical Focus */}
          <div className="holo-panel glass-card">
            <div className="holo-glow-line purple"></div>
            <div className="holo-card-header">
              <div className="holo-icon-box purple">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="holo-name">MULTI-TECH EXPLORER</h3>
                <span className="holo-subtitle">AI/ML • Android • Java • Web Systems</span>
              </div>
            </div>

            <div className="holo-tech-chips">
              <span className="tech-chip">Java 21</span>
              <span className="tech-chip">Spring Boot 3</span>
              <span className="tech-chip">AI / Machine Learning</span>
              <span className="tech-chip">Android Dev</span>
              <span className="tech-chip">React & Vite</span>
              <span className="tech-chip">MERN Stack</span>
              <span className="tech-chip">DSA in Java</span>
              <span className="tech-chip">C++ (Former)</span>
            </div>

            <p className="holo-desc">
              Explored AI/ML model fundamentals, mobile Android applications, and enterprise Java Spring Boot REST microservices. Completed MERN Internship at Explorin. Actively seeking Software Engineering internship & placement roles!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .whoami-section {
          padding: 2.75rem 0;
          position: relative;
        }

        .holographic-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .holo-panel {
          position: relative;
          padding: 2.25rem;
          overflow: hidden;
          transition: transform 0.4s ease, border-color 0.4s ease;
        }

        .holo-panel:hover {
          transform: translateY(-6px) perspective(1000px) rotateX(2deg);
          border-color: var(--accent-primary);
        }

        .holo-glow-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--gradient-primary);
          box-shadow: 0 0 12px var(--accent-primary);
        }

        .holo-glow-line.purple {
          background: linear-gradient(90deg, #a855f7, #06b6d4);
        }

        .holo-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .holo-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.15);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .holo-icon-box.purple {
          background: rgba(168, 85, 247, 0.15);
          color: var(--accent-secondary);
        }

        .holo-name {
          font-size: 1.25rem;
          color: #fff;
          font-weight: 800;
        }

        .holo-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .holo-stats-row {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .holo-stat-pill {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--accent-cyan);
          font-family: var(--font-mono);
        }

        .stat-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .holo-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .tech-chip {
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.3);
          color: #c084fc;
          font-size: 0.8rem;
          font-family: var(--font-mono);
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
        }

        .holo-desc {
          color: var(--text-secondary);
          line-height: 1.65;
          font-size: 0.95rem;
        }

        @media (max-width: 850px) {
          .holographic-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
