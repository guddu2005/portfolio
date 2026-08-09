import React, { useState } from 'react';
import { Calendar, Briefcase, Code, Rocket, CheckCircle2, Award, Trophy, Cpu, Smartphone } from 'lucide-react';

const MILESTONES = [
  {
    year: '2023',
    title: 'Joined Shivalik College of Engineering',
    subtitle: 'B.Tech Computer Science & Engineering (Dehradun)',
    description: 'Enrolled at Shivalik College of Engineering, Dehradun after JEE Advanced. Started DSA in C++ from 1st semester and topped 1st Year across the engineering batch.',
    icon: Code,
    color: '#6366f1'
  },
  {
    year: '2024',
    title: 'Explorin MERN Internship & Tech Exploration',
    subtitle: 'MERN @ Explorin, AI/ML, Android Dev & 2x Hackathon Champion',
    description: 'Completed MERN Stack Internship at Explorin. Explored AI/ML, Android Development, and Java. Won 2 Hackathons and topped 2nd Year continuously.',
    icon: Briefcase,
    color: '#f59e0b'
  },
  {
    year: '2025',
    title: 'Java 21 & Spring Boot 3 Microservices',
    subtitle: 'Enterprise Backend Mastery & System Architecture',
    description: 'Dedicated focus on Java 21, Spring Boot 3, Spring Security 6 JWT stateless security, REST APIs, H2/PostgreSQL databases, and distributed microservices.',
    icon: Rocket,
    color: '#a855f7'
  },
  {
    year: 'NOW',
    title: 'Seeking Internship & Placement Roles',
    subtitle: 'Full Stack Engineer • Making Parents Proud',
    description: 'Building high-performance Java Spring Boot & React products while actively searching for software engineering internship and placement opportunities to excel and make parents proud!',
    icon: CheckCircle2,
    color: '#10b981'
  }
];

export default function CareerTimeline3D() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="timeline-3d-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Authentic Career Journey</span>
          <h2 className="section-title">My <span className="gradient-text">Journey</span></h2>
          <p className="section-subtitle">
            An interactive timeline tracking my education at Shivalik College, 2024 Explorin MERN internship, multi-tech exploration, and 2025 Spring Boot microservices mastery.
          </p>
        </div>

        {/* 3D Timeline Track */}
        <div className="timeline-3d-track glass-card">
          <div className="timeline-path-glow"></div>

          <div className="milestones-nav">
            {MILESTONES.map((m, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`milestone-node ${activeStep === idx ? 'active' : ''}`}
                style={{ '--node-color': m.color }}
              >
                <div className="node-sphere">
                  <span className="node-inner-dot"></span>
                </div>
                <span className="node-year">{m.year}</span>
              </button>
            ))}
          </div>

          {/* Active Milestone Card View */}
          <div className="milestone-detail-card">
            <div className="detail-card-glow" style={{ background: MILESTONES[activeStep].color }}></div>
            <div className="detail-card-header">
              <span className="milestone-badge" style={{ borderColor: MILESTONES[activeStep].color, color: MILESTONES[activeStep].color }}>
                {MILESTONES[activeStep].year}
              </span>
              <h3 className="milestone-title">{MILESTONES[activeStep].title}</h3>
              <p className="milestone-subtitle">{MILESTONES[activeStep].subtitle}</p>
            </div>
            <p className="milestone-desc">{MILESTONES[activeStep].description}</p>
          </div>
        </div>
      </div>

      <style>{`
        .timeline-3d-section {
          padding: 2.75rem 0;
        }

        .timeline-3d-track {
          padding: 3rem 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timeline-path-glow {
          position: absolute;
          top: 4.8rem;
          left: 10%;
          right: 10%;
          height: 4px;
          background: linear-gradient(90deg, #6366f1 0%, #f59e0b 35%, #a855f7 70%, #10b981 100%);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.6);
          border-radius: 2px;
          z-index: 1;
        }

        .milestones-nav {
          display: flex;
          justify-content: space-around;
          width: 100%;
          position: relative;
          z-index: 2;
          margin-bottom: 3.5rem;
        }

        .milestone-node {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          transition: transform 0.3s ease;
        }

        .milestone-node:hover {
          transform: scale(1.15);
        }

        .node-sphere {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #111827;
          border: 3px solid var(--node-color);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px var(--node-color);
          transition: all 0.3s ease;
        }

        .milestone-node.active .node-sphere {
          width: 42px;
          height: 42px;
          background: var(--node-color);
          box-shadow: 0 0 25px var(--node-color);
        }

        .node-inner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
        }

        .node-year {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: #fff;
          font-weight: 600;
        }

        .milestone-detail-card {
          position: relative;
          background: rgba(11, 15, 25, 0.85);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 2.25rem;
          width: 100%;
          max-width: 720px;
          text-align: center;
          box-shadow: var(--shadow-glass);
          overflow: hidden;
          animation: cardSlideUp 0.4s ease;
        }

        @keyframes cardSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .detail-card-glow {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 100px;
          filter: blur(60px);
          opacity: 0.35;
          pointer-events: none;
        }

        .milestone-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          padding: 0.2rem 0.75rem;
          border-radius: 999px;
          border: 1px solid;
          margin-bottom: 0.75rem;
        }

        .milestone-title {
          font-size: 1.6rem;
          color: #fff;
          font-weight: 800;
          margin-bottom: 0.3rem;
        }

        .milestone-subtitle {
          color: var(--accent-cyan);
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
        }

        .milestone-desc {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .timeline-path-glow { display: none; }
          .milestones-nav {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
            margin-bottom: 2rem;
          }
          .timeline-3d-track {
            padding: 1.5rem 1rem;
          }
          .milestone-detail-card {
            padding: 1.5rem 1.15rem;
          }
          .milestone-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
}
