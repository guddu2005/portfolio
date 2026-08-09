import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, MessageSquare, ChevronDown } from 'lucide-react';

const KNOWLEDGE_BASE = [
  {
    keywords: ['skill', 'stack', 'tech', 'technology', 'java', 'spring', 'react', 'know', 'expertise'],
    response: "I specialize in Full Stack development! 🚀\n\n• **Backend:** Java 21, Spring Boot 3, Spring Security 6, JWT Auth, Hibernate/JPA.\n• **Frontend:** React, Vite, Modern Vanilla CSS, Glassmorphism UI.\n• **Databases:** H2 Database, PostgreSQL, MySQL.\n• **Tools:** Maven, Git, RESTful API Design."
  },
  {
    keywords: ['project', 'work', 'build', 'showcase', 'saas', 'microservice', 'dashboard'],
    response: "Here are some featured projects built with Spring Boot & React:\n\n1. 📊 **Enterprise SaaS Analytics Dashboard:** Real-time data visualization platform built with React & Spring Boot REST services.\n2. 🔐 **Cloud Microservices API Gateway:** Spring Security 6 & JWT auth engine with role-based access control.\n3. 🤖 **AI Intelligent Document Assistant:** Modern React glassmorphic web client with stream integration."
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'job', 'available', 'work', 'remote', 'location'],
    response: "I am actively available for new engineering roles & projects! 💼\n\n• 📧 **Email:** dev.portfolio@example.com\n• 🌍 **Location:** India (Open for Remote & Global roles)\n• 💬 Feel free to use the Contact form on this page to send a direct message!"
  },
  {
    keywords: ['admin', 'login', 'manage', 'auth', 'jwt', 'credential', 'password'],
    response: "This portfolio includes a full Spring Boot JWT Admin Dashboard! 🔑\n\n• You can click **Admin Access** in the top header.\n• Seeded Admin Credentials: `username: admin` / `password: admin123`.\n• Once logged in, you can create, edit, or delete projects and view contact messages!"
  },
  {
    keywords: ['about', 'who', 'experience', 'background', 'bio', 'developer', 'engineer'],
    response: "Hi! I am a passionate Full Stack Software Engineer specializing in scalable Java/Spring Boot backends and high-performance React frontends. I love building secure, clean, and intuitive web applications!"
  }
];

const QUICK_PROMPTS = [
  "What are your core skills?",
  "Tell me about your projects",
  "How can I hire/contact you?",
  "How does Admin login work?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Hi there! I'm the **Portfolio AI Assistant**. Ask me anything about skills, projects, experience, or contact information!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const generateBotResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    // Find matching knowledge item
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(kw => lowerText.includes(kw))) {
        return item.response;
      }
    }

    // Default friendly response
    return "Thanks for asking! I can tell you all about:\n\n• Technical skills & tech stack\n• Featured projects & architecture\n• Contact & hiring details\n• Admin Dashboard & Spring Boot JWT setup\n\nTry clicking one of the quick question buttons below! 💡";
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponseText = generateBotResponse(query);
      const botMsg = {
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Chat reset! How else can I help you today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-toggle-btn ${isOpen ? 'active' : ''}`}
        aria-label="Toggle AI Assistant Chat"
      >
        {isOpen ? <X size={24} /> : <Bot size={26} />}
        {!isOpen && <span className="chat-badge-dot"></span>}
      </button>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="chatbot-window glass-card">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="bot-avatar-box">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="chat-header-title">
                  Portfolio <span className="gradient-text">AI Assistant</span>
                </h3>
                <span className="chat-header-status">● Online & Ready</span>
              </div>
            </div>

            <div className="chat-header-actions">
              <button onClick={handleClearChat} className="chat-action-icon" title="Reset Chat">
                <RefreshCw size={15} />
              </button>
              <button onClick={() => setIsOpen(false)} className="chat-action-icon" title="Close Chat">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chat-messages-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="msg-avatar bot">
                    <Sparkles size={14} />
                  </div>
                )}
                <div className="msg-bubble">
                  <div className="msg-text">
                    {msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line.startsWith('• ') ? (
                          <div style={{ marginLeft: '0.4rem', marginTop: '0.2rem' }}>{line}</div>
                        ) : (
                          <div>{line}</div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message-row bot">
                <div className="msg-avatar bot">
                  <Sparkles size={14} />
                </div>
                <div className="msg-bubble typing-bubble">
                  <div className="typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts-container">
            {QUICK_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(prompt)}
                className="prompt-chip"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask about skills, projects, background..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chat-input-field"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="chat-send-btn"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .chatbot-toggle-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
          z-index: 999;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .chatbot-toggle-btn:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.7);
        }

        .chat-badge-dot {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 13px;
          height: 13px;
          background: var(--accent-emerald);
          border: 2px solid #0b0f19;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .chatbot-window {
          position: fixed;
          bottom: 6rem;
          right: 2rem;
          width: 380px;
          max-width: calc(100vw - 2.5rem);
          height: 520px;
          max-height: calc(100vh - 8rem);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
          animation: popupSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popupSlide {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .chat-header {
          padding: 1rem 1.25rem;
          background: rgba(17, 24, 39, 0.95);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bot-avatar-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--gradient-primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-header-title {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
        }

        .chat-header-status {
          font-size: 0.725rem;
          color: var(--accent-emerald);
          font-family: var(--font-mono);
        }

        .chat-header-actions {
          display: flex;
          gap: 0.4rem;
        }

        .chat-action-icon {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.3rem;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .chat-action-icon:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .chat-messages-body {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: rgba(11, 15, 25, 0.4);
        }

        .chat-message-row {
          display: flex;
          gap: 0.6rem;
          max-width: 85%;
        }

        .chat-message-row.user {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .msg-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .msg-avatar.bot {
          background: rgba(99, 102, 241, 0.2);
          color: var(--accent-primary);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .msg-bubble {
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-size: 0.875rem;
          line-height: 1.5;
          position: relative;
        }

        .chat-message-row.bot .msg-bubble {
          background: rgba(31, 41, 55, 0.8);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          border-top-left-radius: 2px;
        }

        .chat-message-row.user .msg-bubble {
          background: var(--gradient-primary);
          color: #fff;
          border-top-right-radius: 2px;
        }

        .msg-time {
          display: block;
          font-size: 0.65rem;
          opacity: 0.6;
          margin-top: 0.3rem;
          text-align: right;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
          padding: 4px 2px;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          background: var(--text-secondary);
          border-radius: 50%;
          animation: blink 1.4s infinite fill-mode: both;
        }

        .typing-dots span:nth-child(2) { animation-delay: .2s; }
        .typing-dots span:nth-child(3) { animation-delay: .4s; }

        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.1); }
        }

        .quick-prompts-container {
          padding: 0.6rem 0.8rem;
          display: flex;
          gap: 0.4rem;
          overflow-x: auto;
          background: rgba(17, 24, 39, 0.6);
          border-top: 1px solid var(--border-color);
        }

        .quick-prompts-container::-webkit-scrollbar {
          height: 3px;
        }

        .prompt-chip {
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

        .prompt-chip:hover {
          background: rgba(99, 102, 241, 0.2);
          color: #fff;
          border-color: var(--accent-primary);
        }

        .chat-input-area {
          padding: 0.75rem 1rem;
          background: rgba(17, 24, 39, 0.95);
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 0.5rem;
        }

        .chat-input-field {
          flex: 1;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 0.5rem 0.9rem;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
        }

        .chat-input-field:focus {
          border-color: var(--accent-primary);
        }

        .chat-send-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .chat-send-btn:not(:disabled):hover {
          background: var(--accent-secondary);
          transform: scale(1.05);
        }

        @media (max-width: 480px) {
          .chatbot-window {
            right: 1rem;
            left: 1rem;
            width: auto;
            bottom: 5.5rem;
            height: 480px;
          }
          .chatbot-toggle-btn {
            bottom: 1.25rem;
            right: 1.25rem;
            width: 52px;
            height: 52px;
          }
        }
      `}</style>
    </>
  );
}
