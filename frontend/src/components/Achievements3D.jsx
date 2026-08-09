import React from 'react';
import { Award, Trophy, Code, GraduationCap, CheckCircle2, Cpu, Smartphone } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    num: '01',
    title: '1st Rank — 1st & 2nd Year Batch Topper',
    category: 'Academic Excellence (Shivalik College)',
    icon: Trophy,
    color: '#f59e0b',
    desc: 'Consistently topped 1st & 2nd Year across the B.Tech Computer Science batch at Shivalik College of Engineering, Dehradun.'
  },
  {
    num: '02',
    title: '2x Hackathon Winner',
    category: 'Competitive Coding',
    icon: Award,
    color: '#eab308',
    desc: 'Participated in multiple hackathons throughout the year, securing 1st Position as 2-time Hackathon Champion.'
  },
  {
    num: '03',
    title: 'AI/ML & Android Dev Explorer',
    category: 'Multi-Tech Innovation',
    icon: Cpu,
    color: '#06b6d4',
    desc: 'Explored Machine Learning models, Android mobile development, and core computer science in 2024.'
  },
  {
    num: '04',
    title: 'MERN Internship @ Explorin',
    category: 'Industry Experience (2025)',
    icon: Code,
    color: '#6366f1',
    desc: 'Successfully completed MERN Stack Developer Internship at Explorin building React & Node.js web applications.'
  },
  {
    num: '05',
    title: 'C++ to Java 21 Mastery',
    category: 'Language Evolution',
    icon: CheckCircle2,
    color: '#10b981',
    desc: 'Transitioned from C++ DSA foundation to Java 21, mastering Spring Boot 3, REST APIs, and Microservices.'
  }
];

export default function Achievements3D() {
  return (
    <section className="achievements-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Honors & Recognitions</span>
          <h2 className="section-title">Key <span className="gradient-text">Achievements</span></h2>
          <p className="section-subtitle">
            Highlights of academic honors at Shivalik College of Engineering, 2x hackathon wins, AI/ML exploration, and Explorin internship.
          </p>
        </div>

        <div className="achievements-stage">
          {/* Rotating 3D Trophy Graphic */}
          <div className="trophy-3d-box">
            <div className="trophy-aurora"></div>
            <Trophy size={90} className="trophy-svg" />
            <span className="trophy-label">EXCELLENCE</span>
          </div>

          {/* Achievements Grid */}
          <div className="achievements-grid">
            {ACHIEVEMENTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="achievement-card glass-card">
                  <div className="ach-card-header">
                    <span className="ach-num">{item.num}</span>
                    <div className="ach-icon-box" style={{ color: item.color, background: `${item.color}15` }}>
                      <IconComp size={20} />
                    </div>
                  </div>

                  <h3 className="ach-title">{item.title}</h3>
                  <span className="ach-cat" style={{ color: item.color }}>{item.category}</span>
                  <p className="ach-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .achievements-section {
          padding: 2.75rem 0;
        }

        .achievements-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        .trophy-3d-box {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(17, 24, 39, 0.85);
          border: 2px solid #f59e0b;
          box-shadow: 0 0 40px rgba(245, 158, 11, 0.4);
          animation: floatTrophy 5s infinite alternate ease-in-out;
        }

        .trophy-aurora {
          position: absolute;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%);
          filter: blur(25px);
          border-radius: 50%;
        }

        .trophy-svg {
          color: #f59e0b;
          filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.8));
        }

        .trophy-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 2px;
          color: #f59e0b;
          margin-top: 0.4rem;
          font-weight: 700;
        }

        @keyframes floatTrophy {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-10px) rotate(4deg); }
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        .achievement-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .achievement-card:hover {
          transform: translateY(-6px);
        }

        .ach-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .ach-num {
          font-family: var(--font-mono);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-muted);
        }

        .ach-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ach-title {
          font-size: 1.15rem;
          color: #fff;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .ach-cat {
          font-size: 0.78rem;
          font-family: var(--font-mono);
          margin-bottom: 0.75rem;
        }

        .ach-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
