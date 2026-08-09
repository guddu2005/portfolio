import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, RefreshCw, MessageSquare } from 'lucide-react';

const GUDDU_AI_KNOWLEDGE = [
  {
    keywords: ['who', 'guddu', 'about', 'background', 'engineer', 'bio', 'college', 'shivalik'],
    answer: "I am **Guddu Kumar**, a Full Stack Software Engineer studying B.Tech CSE at **Shivalik College of Engineering, Dehradun** (CGPA: **8.64 / 10.0**). I **topped 1st & 2nd Year** across the CSE department, completed MERN Internship at Explorin, and earned the **NPTEL Elite Certification in Programming with Generative AI**!"
  },
  {
    keywords: ['skill', 'stack', 'java', 'spring', 'react', 'technology', 'backend', 'frontend', 'c++'],
    answer: "Guddu's technical stack & skills:\n\n• **Backend:** Java 21, Spring Boot 3, Spring Security 6, JWT, Microservices, REST APIs, Node.js, Express.js.\n• **Frontend:** React.js, React Native, Vite, Tailwind CSS, JavaScript.\n• **Databases & Tools:** MongoDB, MySQL, PostgreSQL, Redis, Docker, Git/GitHub, Gemini API."
  },
  {
    keywords: ['intern', 'explorin', 'experience', 'work', 'job'],
    answer: "In June–August 2024, Guddu worked as a **MERN Stack Development Intern at Explorin** (Roorkee, Uttarakhand), developing RESTful APIs that boosted data transfer efficiency by 30%!"
  },
  {
    keywords: ['project', 'job portal', 'chatsphere', 'mentor', 'dinetime', 'cartnest'],
    answer: "Guddu's flagship projects:\n\n1. 🚀 **Enterprise Job Portal System:** Java 21 & Spring Boot microservices with Gemini API resume parsing & Redis caching.\n2. 💬 **Chat-Sphere:** Real-time WebSockets, STOMP & SockJS chat application.\n3. 🎓 **MentorConnect:** Mentorship platform (Hackathon 2024 3rd Prize winner!).\n4. 🍽️ **DineTime:** Dining management platform using React Native & Firebase."
  },
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'opportunity', 'placement', 'parents', 'phone'],
    answer: "Guddu is actively searching for **Software Engineering Internship & Placement opportunities** to excel and make his parents proud!\n\n• 📧 **Email:** reachguddu.dev@gmail.com\n• 📞 **Phone:** +91 9262530826\n• 🌍 **Availability:** Open for Remote & Global Software Engineer roles!"
  }
];

const PRESET_QUESTIONS = [
  "Who is Guddu Kumar?",
  "Tell me about the Enterprise Job Portal project",
  "What is Guddu's tech stack?",
  "Tell me about the Pinnacle Labs Internship"
];

export default function GudduAIOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hey 👋 I am **Guddu AI**. Ask me anything about Guddu Kumar's background, projects, skills, or experience!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleAsk = (queryText) => {
    const q = queryText || inputVal;
    if (!q.trim()) return;

    const userMsg = {
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let botAns = "I'm happy to tell you more about Guddu! You can ask about his **Spring Boot & React projects**, **Pinnacle Labs internship**, **550+ DSA stats**, or **contact info**!";
      const lower = q.toLowerCase();
      
      for (const item of GUDDU_AI_KNOWLEDGE) {
        if (item.keywords.some(k => lower.includes(k))) {
          botAns = item.answer;
          break;
        }
      }

      setMessages(prev => [...prev, { sender: 'ai', text: botAns, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* 3D Glowing AI Orb Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="ai-orb-trigger" title="Ask Guddu AI">
        <div className="orb-inner-aura"></div>
        <Sparkles size={22} className="orb-sparkle" />
        <span className="orb-label">ASK GUDDU AI</span>
      </button>

      {/* Guddu AI Chat Drawer */}
      {isOpen && (
        <div className="guddu-ai-drawer glass-card">
          <div className="ai-drawer-header">
            <div className="ai-brand">
              <div className="ai-orb-avatar">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="ai-title">Guddu <span className="gradient-text">AI</span></h3>
                <span className="ai-status">● Live Portfolio Knowledge</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn">✕</button>
          </div>

          <div className="ai-messages-container">
            {messages.map((m, idx) => (
              <div key={idx} className={`ai-msg-row ${m.sender}`}>
                <div className="ai-msg-bubble">
                  {m.text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                  <span className="ai-msg-time">{m.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-msg-row ai">
                <div className="ai-msg-bubble typing">
                  <span>Guddu AI is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Question Chips */}
          <div className="preset-chips-row">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button key={idx} onClick={() => handleAsk(q)} className="chip-btn">
                {q}
              </button>
            ))}
          </div>

          <div className="ai-input-bar">
            <input
              type="text"
              placeholder="Ask Guddu AI anything..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button onClick={() => handleAsk()} disabled={!inputVal.trim()} className="ai-send-btn">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .ai-orb-trigger {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          padding: 0.65rem 1.25rem;
          border-radius: 999px;
          background: rgba(17, 24, 39, 0.95);
          border: 1.5px solid var(--accent-secondary);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          box-shadow: 0 0 25px rgba(168, 85, 247, 0.5);
          z-index: 999;
          transition: all 0.3s ease;
        }

        .ai-orb-trigger:hover {
          transform: scale(1.08);
          box-shadow: 0 0 35px var(--accent-secondary);
        }

        .orb-inner-aura {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
          animation: pulse 2s infinite;
        }

        .orb-sparkle { color: var(--accent-secondary); z-index: 1; }
        .orb-label { font-family: var(--font-mono); font-size: 0.825rem; font-weight: 700; z-index: 1; letter-spacing: 1px; }

        .guddu-ai-drawer {
          position: fixed;
          bottom: 6rem;
          left: 2rem;
          width: 380px;
          max-width: calc(100vw - 3rem);
          height: 500px;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
          animation: popup 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popup {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ai-drawer-header {
          padding: 1rem 1.25rem;
          background: rgba(17, 24, 39, 0.95);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ai-brand { display: flex; align-items: center; gap: 0.75rem; }
        .ai-orb-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-title { font-size: 1rem; color: #fff; font-weight: 700; }
        .ai-status { font-size: 0.725rem; color: var(--accent-emerald); font-family: var(--font-mono); }

        .ai-messages-container {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: rgba(11, 15, 25, 0.4);
        }

        .ai-msg-row { display: flex; }
        .ai-msg-row.user { justify-content: flex-end; }
        .ai-msg-row.ai { justify-content: flex-start; }

        .ai-msg-bubble {
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-size: 0.875rem;
          line-height: 1.5;
          max-width: 85%;
        }

        .ai-msg-row.ai .ai-msg-bubble {
          background: rgba(31, 41, 55, 0.9);
          color: #fff;
          border: 1px solid var(--border-color);
          border-top-left-radius: 2px;
        }

        .ai-msg-row.user .ai-msg-bubble {
          background: var(--gradient-primary);
          color: #fff;
          border-top-right-radius: 2px;
        }

        .ai-msg-time { display: block; font-size: 0.65rem; opacity: 0.6; margin-top: 0.25rem; text-align: right; }

        .preset-chips-row {
          padding: 0.6rem 0.8rem;
          display: flex;
          gap: 0.4rem;
          overflow-x: auto;
          background: rgba(17, 24, 39, 0.6);
          border-top: 1px solid var(--border-color);
        }

        .chip-btn {
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.3rem 0.65rem;
          border-radius: 999px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .chip-btn:hover { background: rgba(168, 85, 247, 0.2); color: #fff; border-color: var(--accent-secondary); }

        .ai-input-bar {
          padding: 0.75rem 1rem;
          background: rgba(17, 24, 39, 0.95);
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 0.5rem;
        }

        .ai-input-bar input {
          flex: 1;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 0.5rem 0.9rem;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
        }

        .ai-send-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent-secondary);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 600px) {
          .ai-orb-trigger {
            bottom: 1.25rem;
            left: 1rem;
            padding: 0.5rem 0.9rem;
          }
          .guddu-ai-drawer {
            left: 0.75rem;
            right: 0.75rem;
            width: auto;
            bottom: 4.5rem;
            height: 70vh;
            max-height: 480px;
          }
          .preset-chips-row {
            padding: 0.4rem 0.5rem;
          }
          .chip-btn {
            font-size: 0.7rem;
            padding: 0.25rem 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
