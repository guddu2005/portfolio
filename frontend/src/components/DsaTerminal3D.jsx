import React, { useState, useEffect } from 'react';
import { Terminal, Check, ArrowRight, Layers, Code, Play } from 'lucide-react';

const LINKED_LIST_NODES = [
  { val: 10, label: 'HEAD', color: '#6366f1' },
  { val: 25, label: 'NODE 1', color: '#a855f7' },
  { val: 42, label: 'NODE 2', color: '#06b6d4' },
  { val: 68, label: 'NODE 3', color: '#10b981' },
  { val: 90, label: 'TAIL', color: '#f59e0b' }
];

export default function DsaTerminal3D() {
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);

  useEffect(() => {
    // Simulate Linked List Traversal Pointer
    const interval = setInterval(() => {
      setActiveNodeIdx((prev) => (prev + 1) % LINKED_LIST_NODES.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="dsa-section">
      <div className="container">
        <div className="dsa-terminal-card glass-card">
          {/* Terminal Window */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title"><Terminal size={14} /> guddu@developer-machine:~</span>
            </div>

            <div className="terminal-body">
              <div className="cmd-line">
                <span className="prompt-symbol">$</span>
                <span className="cmd-text">guddu --dsa-stats</span>
              </div>

              <div className="stats-output-grid">
                <div className="stat-box">
                  <span className="stat-num">700+</span>
                  <span className="stat-title">DSA Problems Solved</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num">C++ & JAVA</span>
                  <span className="stat-title">Languages Mastered</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num">ACTIVE</span>
                  <span className="stat-title">Problem Solving Status</span>
                </div>
              </div>

              <div className="cmd-line" style={{ marginTop: '1.5rem' }}>
                <span className="prompt-symbol">$</span>
                <span className="cmd-text">linkedlist --traverse --pointer=current</span>
              </div>

              {/* 3D Linked List Pointer Traversal Visualizer */}
              <div className="algo-visualizer-box">
                <div className="linked-list-row">
                  {LINKED_LIST_NODES.map((node, idx) => (
                    <React.Fragment key={idx}>
                      <div className={`linked-node-box ${activeNodeIdx === idx ? 'active-traversal' : ''}`}>
                        <span className="node-head-tag" style={{ color: node.color }}>{node.label}</span>
                        <div className="node-value-box" style={{ borderColor: node.color }}>
                          <span className="val-text">{node.val}</span>
                        </div>
                        <span className="pointer-next-text">next ➔</span>
                      </div>

                      {idx < LINKED_LIST_NODES.length - 1 && (
                        <div className="ll-connection-arrow">
                          <ArrowRight size={20} className={`arrow-icon ${activeNodeIdx === idx ? 'glowing' : ''}`} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  <div className="ll-null-box">
                    <span className="null-text">NULL</span>
                  </div>
                </div>

                <div className="search-status-bar">
                  <span className="status-traversing">
                    <Play size={15} /> Pointer Traversal at [{LINKED_LIST_NODES[activeNodeIdx].label}] ➔ Value: {LINKED_LIST_NODES[activeNodeIdx].val} | memory_address: 0x7fff{activeNodeIdx * 16 + 100}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dsa-section {
          padding: 2.75rem 0;
        }

        .dsa-terminal-card {
          padding: 2.5rem;
          background: rgba(11, 15, 25, 0.95);
        }

        .terminal-window {
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          overflow: hidden;
          background: #090d16;
        }

        .terminal-header {
          background: #111827;
          padding: 0.65rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .terminal-title {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .terminal-body {
          padding: 1.75rem;
          font-family: var(--font-mono);
        }

        .cmd-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .prompt-symbol { color: var(--accent-emerald); font-weight: 700; }
        .cmd-text { color: #fff; font-weight: 600; }

        .stats-output-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .stat-box {
          background: rgba(17, 24, 39, 0.8);
          border: 1px solid var(--border-glow);
          padding: 1.25rem;
          border-radius: var(--radius-sm);
          text-align: center;
        }

        .stat-num {
          display: block;
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent-cyan);
        }

        .stat-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .algo-visualizer-box {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-color);
          padding: 1.5rem;
          border-radius: var(--radius-sm);
          margin-top: 1rem;
        }

        .linked-list-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          padding: 1rem 0.5rem;
        }

        .linked-node-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(17, 24, 39, 0.9);
          border: 1.5px solid var(--border-color);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          transition: all 0.3s ease;
          min-width: 90px;
        }

        .linked-node-box.active-traversal {
          background: rgba(99, 102, 241, 0.25);
          border-color: var(--accent-primary);
          transform: scale(1.12);
          box-shadow: 0 0 20px var(--accent-primary);
        }

        .node-head-tag {
          font-size: 0.65rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .node-value-box {
          width: 44px;
          height: 38px;
          border: 2px solid;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0b0f19;
          margin-bottom: 0.25rem;
        }

        .val-text {
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
        }

        .pointer-next-text {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .ll-connection-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arrow-icon {
          color: var(--text-muted);
          transition: all 0.3s ease;
        }

        .arrow-icon.glowing {
          color: var(--accent-cyan);
          transform: scale(1.3);
          filter: drop-shadow(0 0 8px var(--accent-cyan));
        }

        .ll-null-box {
          background: rgba(239, 68, 68, 0.15);
          border: 1.5px solid rgba(239, 68, 68, 0.4);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-sm);
        }

        .null-text {
          font-size: 0.85rem;
          font-weight: 800;
          color: #ef4444;
        }

        .search-status-bar {
          text-align: center;
          font-size: 0.85rem;
        }

        .status-traversing {
          color: var(--accent-cyan);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        @media (max-width: 768px) {
          .stats-output-grid { grid-template-columns: 1fr; }
          .dsa-terminal-card { padding: 1.25rem; }
          .terminal-body { padding: 1rem; }
        }

        @media (max-width: 480px) {
          .dsa-terminal-card { padding: 0.75rem; }
          .cmd-text { font-size: 0.85rem; }
          .linked-node-box { min-width: 75px; padding: 0.5rem 0.75rem; }
        }
      `}</style>
    </section>
  );
}
