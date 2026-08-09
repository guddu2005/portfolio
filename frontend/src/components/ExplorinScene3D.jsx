import React from 'react';
import { Laptop, Calendar, MapPin, Award, CheckCircle, Trophy, Cpu, Smartphone } from 'lucide-react';

export default function ExplorinScene3D() {
  return (
    <section className="explorin-scene-section">
      <div className="container">
        <div className="explorin-card glass-card">
          {/* Left Column: Internship Info */}
          <div className="explorin-info">
            <span className="section-tag">// Featured Internship Experience</span>
            <h2 className="explorin-title">
              MERN Stack Internship <br />
              <span className="gradient-text">Explorin</span>
            </h2>

            <div className="explorin-meta">
              <span className="meta-badge"><Calendar size={14} /> 2024</span>
              <span className="meta-badge"><MapPin size={14} /> Explorin MERN Internship</span>
              <span className="meta-badge tech"><Cpu size={14} /> Full Stack Web Development</span>
            </div>

            <p className="explorin-desc">
              Gained hands-on software development experience building full-stack web applications and REST APIs during my MERN Stack Internship at Explorin.
            </p>

            <ul className="explorin-highlights">
              <li><CheckCircle size={16} className="h-icon" /> Developed responsive React single page applications with Node.js & Express.</li>
              <li><CheckCircle size={16} className="h-icon" /> Engineered MongoDB database schemas and indexing for fast query response.</li>
              <li><CheckCircle size={16} className="h-icon" /> Switched problem-solving language from C++ to Java 21 for Spring Boot enterprise microservices.</li>
            </ul>
          </div>

          {/* Right Column: Floating 3D Laptop & Orbiting Tech Badges */}
          <div className="explorin-3d-laptop-stage">
            <div className="laptop-aurora"></div>

            {/* Orbiting Tech Labels */}
            <div className="orbit-tag tag-react">React</div>
            <div className="orbit-tag tag-node">Node.js</div>
            <div className="orbit-tag tag-mongo">MongoDB</div>
            <div className="orbit-tag tag-explorin">Explorin</div>

            {/* 3D Laptop Graphic */}
            <div className="laptop-3d-box">
              <div className="laptop-screen">
                <div className="screen-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="screen-url">https://explorin.io/internship</span>
                </div>
                <div className="screen-content">
                  <div className="code-block-anim">
                    <span className="c-line l1"></span>
                    <span className="c-line l2"></span>
                    <span className="c-line l3"></span>
                  </div>
                </div>
              </div>
              <div className="laptop-base">
                <div className="laptop-trackpad"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .explorin-scene-section {
          padding: 2.75rem 0;
        }

        .explorin-card {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2.5rem;
          padding: 3rem;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .explorin-title {
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.2;
          margin: 0.5rem 0 1rem;
        }

        .explorin-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }

        .meta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
        }

        .meta-badge.tech {
          color: var(--accent-secondary);
          background: rgba(168, 85, 247, 0.1);
          border-color: rgba(168, 85, 247, 0.3);
        }

        .explorin-desc {
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }

        .explorin-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-size: 0.925rem;
          color: var(--text-primary);
        }

        .explorin-highlights li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .h-icon {
          color: var(--accent-emerald);
          flex-shrink: 0;
        }

        /* 3D Laptop Stage */
        .explorin-3d-laptop-stage {
          position: relative;
          width: 100%;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .laptop-aurora {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(99, 102, 241, 0.15) 60%, transparent 80%);
          filter: blur(40px);
          border-radius: 50%;
        }

        .orbit-tag {
          position: absolute;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid var(--border-glow);
          color: #fff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          animation: floatAround 6s infinite alternate ease-in-out;
          z-index: 10;
        }

        .tag-react { top: 20px; left: 20px; color: var(--accent-cyan); }
        .tag-node { top: 40px; right: 10px; color: var(--accent-emerald); animation-delay: -1.5s; }
        .tag-mongo { bottom: 30px; left: 10px; color: #10b981; animation-delay: -3s; }
        .tag-explorin { bottom: 20px; right: 20px; color: var(--accent-secondary); animation-delay: -4.5s; }

        @keyframes floatAround {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-12px) scale(1.08); }
        }

        .laptop-3d-box {
          position: relative;
          width: 240px;
          height: 160px;
          transform: perspective(800px) rotateX(10deg) rotateY(-8deg);
          transition: transform 0.4s ease;
        }

        .laptop-3d-box:hover {
          transform: perspective(800px) rotateX(0deg) rotateY(0deg) scale(1.05);
        }

        .laptop-screen {
          width: 100%;
          height: 140px;
          background: #0b0f19;
          border: 3px solid #374151;
          border-radius: 10px 10px 0 0;
          overflow: hidden;
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.3);
          display: flex;
          flex-direction: column;
        }

        .screen-header {
          background: #1f2937;
          padding: 4px 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dot { width: 6px; height: 6px; border-radius: 50%; }
        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #10b981; }

        .screen-url {
          font-size: 0.6rem;
          color: var(--text-muted);
          margin-left: 6px;
          font-family: var(--font-mono);
        }

        .screen-content {
          flex: 1;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .code-block-anim {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }

        .c-line { height: 6px; border-radius: 3px; }
        .l1 { width: 80%; background: var(--accent-primary); animation: pulse 2s infinite; }
        .l2 { width: 60%; background: var(--accent-secondary); }
        .l3 { width: 90%; background: var(--accent-cyan); }

        .laptop-base {
          width: 270px;
          height: 12px;
          background: linear-gradient(90deg, #374151 0%, #4b5563 50%, #374151 100%);
          border-radius: 0 0 10px 10px;
          margin-left: -15px;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .laptop-trackpad {
          width: 40px;
          height: 6px;
          background: #1f2937;
          border-radius: 2px;
          margin-top: 2px;
        }

        @media (max-width: 900px) {
          .explorin-card {
            grid-template-columns: 1fr;
            padding: 1.75rem;
          }
        }

        @media (max-width: 600px) {
          .explorin-card {
            padding: 1.25rem;
          }
          .explorin-title {
            font-size: 1.75rem;
          }
          .explorin-3d-laptop-stage {
            height: 250px;
          }
          .laptop-3d-box {
            width: 200px;
            height: 130px;
          }
          .laptop-screen {
            height: 115px;
          }
          .tag-react { top: 0px; left: 0px; }
          .tag-node { top: 10px; right: 0px; }
          .tag-mongo { bottom: 10px; left: 0px; }
          .tag-explorin { bottom: 0px; right: 0px; }
        }
      `}</style>
    </section>
  );
}
