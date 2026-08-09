import React from 'react';
import { UserCheck, BookOpen, GraduationCap, Award, ArrowRight } from 'lucide-react';

export default function MentorConnectScene3D() {
  return (
    <section className="mentor-section">
      <div className="container">
        <div className="mentor-card glass-card">
          <div className="mentor-header">
            <span className="section-tag">// Mentorship & Knowledge Platform</span>
            <h2 className="mentor-title">MentorConnect <span className="gradient-text">Network</span></h2>
            <p className="mentor-subtitle">
              Connecting engineering students with experienced software mentors for 1-on-1 code reviews and career guidance.
            </p>
          </div>

          {/* 3D Flow Nodes */}
          <div className="mentor-flow-grid">
            <div className="flow-node">
              <div className="flow-icon-box">
                <UserCheck size={24} />
              </div>
              <span className="flow-label">MENTOR</span>
              <span className="flow-desc">Industry Experts</span>
            </div>

            <div className="flow-arrow"><ArrowRight size={20} /></div>

            <div className="flow-node">
              <div className="flow-icon-box purple">
                <BookOpen size={24} />
              </div>
              <span className="flow-label">KNOWLEDGE</span>
              <span className="flow-desc">Code Reviews & System Design</span>
            </div>

            <div className="flow-arrow"><ArrowRight size={20} /></div>

            <div className="flow-node">
              <div className="flow-icon-box cyan">
                <GraduationCap size={24} />
              </div>
              <span className="flow-label">STUDENT</span>
              <span className="flow-desc">Engineering Aspirants</span>
            </div>

            <div className="flow-arrow"><ArrowRight size={20} /></div>

            <div className="flow-node">
              <div className="flow-icon-box emerald">
                <Award size={24} />
              </div>
              <span className="flow-label">CAREER</span>
              <span className="flow-desc">Software Engineer Offer</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mentor-section {
          padding: 5rem 0;
        }

        .mentor-card {
          padding: 3rem;
          text-align: center;
        }

        .mentor-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0.4rem 0 0.75rem;
        }

        .mentor-subtitle {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .mentor-flow-grid {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .flow-node {
          background: rgba(17, 24, 39, 0.85);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 140px;
          transition: transform 0.3s ease;
        }

        .flow-node:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
        }

        .flow-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.15);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .flow-icon-box.purple { background: rgba(168, 85, 247, 0.15); color: var(--accent-secondary); }
        .flow-icon-box.cyan { background: rgba(6, 182, 212, 0.15); color: var(--accent-cyan); }
        .flow-icon-box.emerald { background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); }

        .flow-label {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
        }

        .flow-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .flow-arrow {
          color: var(--accent-primary);
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          .mentor-card { padding: 1.5rem; }
          .flow-arrow { display: none; }
        }
      `}</style>
    </section>
  );
}
