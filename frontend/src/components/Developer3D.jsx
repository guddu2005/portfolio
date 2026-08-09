import React, { useState, useEffect } from 'react';
import { Code, Terminal, Cpu, ShieldCheck, Zap, Database, Server, Sparkles } from 'lucide-react';
import userPhoto from '../assets/user_photo.png';

const CODE_LINES = [
  '// Spring Boot 3 + Java 21 REST Controller',
  '@RestController',
  '@RequestMapping("/api/portfolio")',
  'public class PortfolioController {',
  '    @Autowired private JwtUtils jwtUtils;',
  '    ',
  '    @GetMapping("/projects")',
  '    public ResponseEntity<List<Project>> getProjects() {',
  '        return ResponseEntity.ok(projectService.findAll());',
  '    }',
  '}'
];

export default function Developer3D() {
  const [rotateX, setRotateX] = useState(6);
  const [rotateY, setRotateY] = useState(-12);
  const [typedIndex, setTypedIndex] = useState(0);

  // Mouse tilt interaction
  const handleMouseMove = (e) => {
    // Only apply tilt on desktop screens (> 480px)
    if (window.innerWidth <= 480) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rx = (y / rect.height) * -16;
    const ry = (x / rect.width) * 16;

    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(6);
    setRotateY(-12);
  };

  // Typing effect loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIndex((prev) => (prev < CODE_LINES.length ? prev + 1 : 1));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="developer-3d-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="developer-3d-card"
        style={{
          transform: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        }}
      >
        {/* Glowing 3D Background Aura */}
        <div className="aura-glow"></div>

        {/* Floating 3D Badge 1 */}
        <div className="floating-badge badge-1">
          <Server size={14} className="badge-icon" />
          <span>Spring Boot 3</span>
        </div>

        {/* Floating 3D Badge 2 */}
        <div className="floating-badge badge-2">
          <Zap size={14} className="badge-icon cyan" />
          <span>React + Vite</span>
        </div>

        {/* Floating 3D Badge 3 */}
        <div className="floating-badge badge-3">
          <ShieldCheck size={14} className="badge-icon emerald" />
          <span>JWT Security</span>
        </div>

        {/* Authentic User Photo 3D Glass Card */}
        <div className="avatar-3d-frame glass-card">
          <img src={userPhoto} alt="Guddu Kumar - Full Stack Developer" className="avatar-3d-img" />
          <div className="avatar-glass-overlay">
            <span className="avatar-status-pill">
              <Sparkles size={12} />
              <span>Guddu Kumar</span>
            </span>
          </div>
        </div>

        {/* IDE Code Terminal Window */}
        <div className="ide-window glass-card">
          <div className="ide-header">
            <div className="ide-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="ide-title">
              <Terminal size={14} /> PortfolioApplication.java
            </span>
            <span className="ide-status">Java 21</span>
          </div>

          <div className="ide-code-body">
            {CODE_LINES.slice(0, typedIndex).map((line, idx) => (
              <div key={idx} className="code-line">
                <span className="line-num">{idx + 1}</span>
                <span className="line-text">
                  {line.startsWith('//') ? (
                    <span className="code-comment">{line}</span>
                  ) : line.startsWith('@') ? (
                    <span className="code-annotation">{line}</span>
                  ) : line.includes('public class') || line.includes('return') ? (
                    <span>
                      {line.split(' ').map((word, wIdx) =>
                        ['public', 'class', 'return', 'new'].includes(word) ? (
                          <span key={wIdx} className="code-keyword">{word} </span>
                        ) : (
                          word + ' '
                        )
                      )}
                    </span>
                  ) : (
                    <span>{line}</span>
                  )}
                </span>
              </div>
            ))}
            <div className="code-line typing-line">
              <span className="line-num">{typedIndex + 1}</span>
              <span className="cursor-blink">|</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .developer-3d-wrapper {
          position: relative;
          width: 100%;
          max-width: 520px;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .developer-3d-card {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out;
        }

        .aura-glow {
          position: absolute;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%);
          filter: blur(50px);
          border-radius: 50%;
          transform: translateZ(-30px);
          pointer-events: none;
        }

        .floating-badge {
          position: absolute;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          background: rgba(17, 24, 39, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-color);
          color: #fff;
          font-size: 0.8rem;
          font-family: var(--font-mono);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
          z-index: 20;
          animation: float3D 6s infinite alternate ease-in-out;
        }

        .badge-1 {
          top: 10px;
          left: -5px;
          transform: translateZ(50px);
        }

        .badge-2 {
          top: 45%;
          right: -10px;
          transform: translateZ(70px);
          animation-delay: -2s;
        }

        .badge-3 {
          bottom: 15px;
          left: 5px;
          transform: translateZ(60px);
          animation-delay: -4s;
        }

        .badge-icon { color: var(--accent-primary); }
        .badge-icon.cyan { color: var(--accent-cyan); }
        .badge-icon.emerald { color: var(--accent-emerald); }

        @keyframes float3D {
          0% { transform: translateY(0px) translateZ(50px); }
          50% { transform: translateY(-10px) translateZ(65px); }
          100% { transform: translateY(5px) translateZ(45px); }
        }

        /* Authentic User Photo 3D Glass Card */
        .avatar-3d-frame {
          position: relative;
          width: 175px;
          height: 175px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--accent-primary);
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.7);
          transform: translateZ(60px);
          margin-bottom: 1.25rem;
          z-index: 10;
        }

        .avatar-3d-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.05) brightness(1.02);
        }

        .avatar-glass-overlay {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .avatar-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #fff;
          background: rgba(11, 15, 25, 0.9);
          border: 1px solid var(--border-glow);
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
        }

        /* IDE Window */
        .ide-window {
          position: relative;
          width: 95%;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          transform: translateZ(40px);
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .ide-header {
          background: rgba(11, 15, 25, 0.95);
          padding: 0.5rem 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
        }

        .ide-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #10b981; }

        .ide-title {
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-family: var(--font-mono);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .ide-status {
          font-size: 0.7rem;
          color: var(--accent-cyan);
          font-family: var(--font-mono);
        }

        .ide-code-body {
          flex: 1;
          padding: 0.85rem;
          background: rgba(11, 15, 25, 0.85);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          overflow-y: hidden;
          line-height: 1.5;
        }

        .code-line {
          display: flex;
          gap: 0.75rem;
        }

        .line-num {
          color: var(--text-muted);
          width: 18px;
          text-align: right;
          user-select: none;
        }

        .line-text {
          color: #e5e7eb;
        }

        .code-comment { color: #6b7280; font-style: italic; }
        .code-annotation { color: var(--accent-secondary); font-weight: 600; }
        .code-keyword { color: var(--accent-cyan); font-weight: 600; }

        .cursor-blink {
          color: var(--accent-primary);
          animation: blink 0.8s infinite;
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .developer-3d-wrapper {
            height: 420px;
          }
          .ide-window {
            height: 190px;
          }
          .badge-1, .badge-2, .badge-3 {
            font-size: 0.7rem;
            padding: 0.3rem 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .developer-3d-wrapper {
            height: 360px;
            max-width: 100%;
          }
          .avatar-3d-frame {
            width: 135px;
            height: 135px;
            margin-bottom: 0.75rem;
          }
          .ide-window {
            width: 100%;
            height: 175px;
          }
          .badge-1 { left: 0px; top: 0px; }
          .badge-2 { right: 0px; top: 30%; }
          .badge-3 { left: 0px; bottom: 0px; }
        }
      `}</style>
    </div>
  );
}
