import React, { useState, useEffect } from 'react';
import { MessageSquare, Radio, ShieldCheck, Zap } from 'lucide-react';

const MESSAGES_STREAM = [
  { sender: 'left', text: 'Hello 👋' },
  { sender: 'right', text: 'Hey Guddu! How is Chat-Sphere running?' },
  { sender: 'left', text: 'Streaming via WebSockets & STOMP protocol ⚡' },
  { sender: 'right', text: 'Super fast! JWT authentication is active.' }
];

export default function ChatSphereScene3D() {
  const [streamIndex, setStreamIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamIndex(prev => (prev < MESSAGES_STREAM.length ? prev + 1 : 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="chatsphere-section">
      <div className="container">
        <div className="chatsphere-card glass-card">
          <div className="chatsphere-header">
            <span className="section-tag">// Real-Time Communication</span>
            <h2 className="chatsphere-title">Chat-Sphere <span className="gradient-text">Real-Time Messaging</span></h2>
            <p className="chatsphere-subtitle">
              High-concurrency bi-directional message streaming powered by WebSockets, STOMP, SockJS, and stateless JWT tokens.
            </p>

            <div className="tech-pills-row">
              <span className="tech-pill"><Radio size={14} /> WebSocket</span>
              <span className="tech-pill"><Zap size={14} /> STOMP Protocol</span>
              <span className="tech-pill"><Zap size={14} /> SockJS Fallback</span>
              <span className="tech-pill"><ShieldCheck size={14} /> JWT Secured</span>
            </div>
          </div>

          {/* 3D Devices & Traveling Particles Stage */}
          <div className="devices-stage">
            {/* Device Left */}
            <div className="device-node device-left">
              <div className="device-screen">
                <span className="device-user">User Client A</span>
                <span className="device-status">Connected</span>
              </div>
            </div>

            {/* Traveling Message Particles Connection */}
            <div className="particle-channel">
              <div className="channel-line"></div>
              <div className="traveling-particle"></div>
            </div>

            {/* Device Right */}
            <div className="device-node device-right">
              <div className="device-screen">
                <span className="device-user">User Client B</span>
                <span className="device-status">Connected</span>
              </div>
            </div>
          </div>

          {/* Live Message Exchange Box */}
          <div className="live-messages-box">
            {MESSAGES_STREAM.slice(0, streamIndex).map((msg, idx) => (
              <div key={idx} className={`live-bubble ${msg.sender}`}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .chatsphere-section {
          padding: 5rem 0;
        }

        .chatsphere-card {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .chatsphere-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0.4rem 0 0.75rem;
        }

        .chatsphere-subtitle {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 1.5rem;
          font-size: 1rem;
        }

        .tech-pills-row {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .tech-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          background: rgba(99, 102, 241, 0.12);
          color: #a5b4fc;
          border: 1px solid rgba(99, 102, 241, 0.25);
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
        }

        .devices-stage {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 650px;
          margin-bottom: 2rem;
          position: relative;
        }

        .device-node {
          width: 140px;
          height: 90px;
          background: #111827;
          border: 2px solid var(--border-glow);
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .device-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .device-user {
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
        }

        .device-status {
          font-size: 0.65rem;
          color: var(--accent-emerald);
          font-family: var(--font-mono);
        }

        .particle-channel {
          flex: 1;
          height: 4px;
          position: relative;
          margin: 0 1rem;
        }

        .channel-line {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #06b6d4, #a855f7);
          border-radius: 2px;
          box-shadow: 0 0 10px var(--accent-primary);
        }

        .traveling-particle {
          position: absolute;
          top: -4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 12px #fff;
          animation: travelStream 2s infinite linear;
        }

        @keyframes travelStream {
          0% { left: 0%; }
          100% { left: 95%; }
        }

        .live-messages-box {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .live-bubble {
          padding: 0.65rem 1rem;
          border-radius: 12px;
          font-size: 0.875rem;
          max-width: 80%;
          animation: fadeIn 0.3s ease;
        }

        .live-bubble.left {
          background: rgba(31, 41, 55, 0.9);
          color: #fff;
          align-self: flex-start;
          border-top-left-radius: 2px;
          border: 1px solid var(--border-color);
        }

        .live-bubble.right {
          background: var(--gradient-primary);
          color: #fff;
          align-self: flex-end;
          border-top-right-radius: 2px;
        }

        @media (max-width: 600px) {
          .chatsphere-card { padding: 1.5rem; }
          .devices-stage { flex-direction: column; gap: 1.5rem; }
          .particle-channel { width: 4px; height: 60px; margin: 0; }
          .traveling-particle {
            top: 0;
            left: -4px;
            animation: travelStreamVert 2s infinite linear;
          }
          @keyframes travelStreamVert {
            0% { top: 0%; }
            100% { top: 90%; }
          }
        }
      `}</style>
    </section>
  );
}
