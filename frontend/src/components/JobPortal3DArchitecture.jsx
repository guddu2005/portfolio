import React, { useState } from 'react';
import { Network, Server, Cpu, Database, Bell, FileText, UserCheck, Sparkles } from 'lucide-react';

const NODES = [
  { id: 'user', name: 'USER SERVICE', icon: UserCheck, desc: 'Auth, Profiles & JWT Tokens', color: '#6366f1' },
  { id: 'company', name: 'COMPANY SERVICE', icon: Server, desc: 'Enterprise Recruiter Profiles', color: '#a855f7' },
  { id: 'job', name: 'JOB SERVICE', icon: Database, desc: 'Listings, Search & Caching', color: '#06b6d4' },
  { id: 'app', name: 'APPLICATION SERVICE', icon: Network, desc: 'Candidate Job Submissions', color: '#10b981' },
  { id: 'resume', name: 'RESUME SERVICE', icon: FileText, desc: 'Document Storage & Parsing', color: '#f59e0b' },
  { id: 'notif', name: 'NOTIFICATION SERVICE', icon: Bell, desc: 'Email Alerts & Webhooks', color: '#ec4899' },
  { id: 'ai', name: 'AI SERVICE', icon: Sparkles, desc: 'Resume Ranking & Job Matching', color: '#3b82f6' },
];

export default function JobPortal3DArchitecture() {
  const [activeNode, setActiveNode] = useState(NODES[0]);

  return (
    <section className="architecture-3d-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Flagship Microservices Architecture</span>
          <h2 className="section-title">Enterprise Job Portal <span className="gradient-text">3D Network</span></h2>
          <p className="section-subtitle">
            A distributed 7-node microservices architecture connected with live data flow streams and stateless JWT security.
          </p>
        </div>

        <div className="topology-card glass-card">
          {/* 3D Interactive Topology Graph */}
          <div className="topology-graph-container">
            {/* Central Gateway Node */}
            <div className="node-box central-node">
              <div className="central-core">
                <Network size={32} />
                <span className="central-title">ENTERPRISE JOB PORTAL</span>
                <span className="central-sub">Spring Cloud API Gateway</span>
              </div>
            </div>

            {/* Orbiting Microservices Nodes */}
            <div className="nodes-circle-ring">
              {NODES.map((node, idx) => {
                const IconComp = node.icon;
                return (
                  <div
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    className={`micro-node-card ${activeNode.id === node.id ? 'active' : ''}`}
                    style={{
                      '--node-accent': node.color,
                      '--node-pos': `${(idx * 360) / NODES.length}deg`
                    }}
                  >
                    <div className="node-icon-wrapper">
                      <IconComp size={18} />
                    </div>
                    <span className="node-label-text">{node.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Node Inspector Drawer */}
          <div className="node-inspector-panel">
            <span className="inspector-tag" style={{ color: activeNode.color }}>// Microservice Inspection</span>
            <h3 className="inspector-title">{activeNode.name}</h3>
            <p className="inspector-desc">{activeNode.desc}</p>
            
            <div className="inspector-specs">
              <div className="spec-pill">
                <span className="spec-key">Protocol:</span>
                <span className="spec-val">REST / gRPC</span>
              </div>
              <div className="spec-pill">
                <span className="spec-key">Database:</span>
                <span className="spec-val">MongoDB / Redis</span>
              </div>
              <div className="spec-pill">
                <span className="spec-key">Container:</span>
                <span className="spec-val">Dockerized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .architecture-3d-section {
          padding: 6rem 0;
        }

        .topology-card {
          padding: 3rem;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 2rem;
          align-items: center;
        }

        .topology-graph-container {
          position: relative;
          width: 100%;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .central-node {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, #1f2937 0%, #111827 80%);
          border: 3px solid var(--accent-primary);
          box-shadow: 0 0 40px rgba(99, 102, 241, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .central-core {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #fff;
          padding: 1rem;
        }

        .central-title {
          font-size: 0.75rem;
          font-weight: 800;
          font-family: var(--font-mono);
          margin-top: 0.4rem;
          color: var(--accent-cyan);
        }

        .central-sub {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .nodes-circle-ring {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          border: 1.5px dashed rgba(99, 102, 241, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .micro-node-card {
          position: absolute;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid var(--node-accent);
          padding: 0.4rem 0.75rem;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

          /* Position on ring */
          transform: rotate(var(--node-pos)) translate(170px) rotate(calc(-1 * var(--node-pos)));
        }

        .micro-node-card:hover, .micro-node-card.active {
          background: var(--node-accent);
          color: #fff;
          transform: rotate(var(--node-pos)) translate(170px) rotate(calc(-1 * var(--node-pos))) scale(1.15);
          box-shadow: 0 0 20px var(--node-accent);
        }

        .node-icon-wrapper {
          color: var(--node-accent);
        }
        .micro-node-card:hover .node-icon-wrapper, .micro-node-card.active .node-icon-wrapper {
          color: #fff;
        }

        .node-label-text {
          font-size: 0.725rem;
          font-weight: 700;
          font-family: var(--font-mono);
          white-space: nowrap;
        }

        .node-inspector-panel {
          background: rgba(11, 15, 25, 0.85);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.75rem;
        }

        .inspector-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .inspector-title {
          font-size: 1.3rem;
          color: #fff;
          margin: 0.4rem 0;
        }

        .inspector-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.25rem;
        }

        .inspector-specs {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .spec-pill {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm);
        }

        .spec-key { color: var(--text-muted); }
        .spec-val { color: #fff; font-family: var(--font-mono); font-weight: 600; }

        @media (max-width: 900px) {
          .topology-card {
            grid-template-columns: 1fr;
            padding: 1.5rem;
          }
          .nodes-circle-ring {
            width: 280px;
            height: 280px;
          }
          .micro-node-card {
            transform: rotate(var(--node-pos)) translate(140px) rotate(calc(-1 * var(--node-pos)));
          }
        }

        @media (max-width: 600px) {
          .topology-graph-container {
            height: 320px;
          }
          .central-node {
            width: 140px;
            height: 140px;
          }
          .central-title {
            font-size: 0.65rem;
          }
          .nodes-circle-ring {
            width: 230px;
            height: 230px;
          }
          .micro-node-card {
            padding: 0.25rem 0.5rem;
            transform: rotate(var(--node-pos)) translate(115px) rotate(calc(-1 * var(--node-pos)));
          }
          .node-label-text {
            font-size: 0.65rem;
          }
          .node-inspector-panel {
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
