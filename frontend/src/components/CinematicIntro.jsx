import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronDown, Volume2, Bot } from 'lucide-react';
import userPhoto from '../assets/user_photo.png';

export default function CinematicIntro({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  const speakAiVoice = () => {
    // 1. Try playing generated AI Voice audio file
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setHasInteracted(true);
        }).catch(() => {
          // 2. Fallback to Web Speech Synthesis API AI Voice
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance("Hii! I am Guddu Kumar. Welcome to my portfolio!");
            utterance.rate = 1.0;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
            setHasInteracted(true);
          }
        });
      }
    }
  };

  useEffect(() => {
    // Stage 0: Orb scaling 0 -> 1
    const t1 = setTimeout(() => setStage(1), 700);  // Logo & particles fade in
    const t2 = setTimeout(() => {
      setStage(2); // Animated User Photo & "HII!" Wave reveal
      
      // Auto-attempt voice speech on stage 2
      speakAiVoice();
    }, 1800);

    const t3 = setTimeout(() => setStage(3), 3200); // Name text reveal
    const t4 = setTimeout(() => setStage(4), 4500); // Role text & Enter button reveal

    // Global first-interaction listener to unlock browser audio autoplay restriction seamlessly
    const handleFirstInteraction = () => {
      speakAiVoice();
      setHasInteracted(true);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <div 
      className={`cinematic-intro-overlay ${stage >= 4 ? 'fade-out-ready' : ''}`}
      onClick={speakAiVoice}
    >
      {/* Generated AI Voice Audio File */}
      <audio ref={audioRef} src="/guddu_hii_voice.wav" preload="auto" />

      {/* Background Particles Canvas / Glow */}
      <div className="intro-bg-glow"></div>

      {/* AI Voice Control Button */}
      <div className="sound-control-bar">
        <button 
          onClick={(e) => { e.stopPropagation(); speakAiVoice(); }} 
          className="sound-btn" 
          title="Replay AI Voice Greeting"
        >
          <Bot size={16} />
          <span>AI Voice: "HII!" 🔊</span>
        </button>
      </div>

      {/* Central 3D Glowing Purple Orb */}
      <div className={`intro-orb ${stage >= 1 ? 'scaled-up' : ''}`}>
        <div className="orb-core"></div>
        <div className="orb-particles">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>

      

      {/* Animated Guddu Photo & Waving HII! Badge */}
      <div 
        className={`developer-photo-stage ${stage >= 2 ? 'revealed' : ''}`} 
        onClick={(e) => { e.stopPropagation(); speakAiVoice(); }} 
        style={{ cursor: 'pointer' }} 
        title="Click to hear Guddu's Voice say HII!"
      >
        <div className="photo-neon-ring"></div>
        <img src={userPhoto} alt="Guddu Kumar" className="developer-photo-img" />
        
        {/* Animated "HII!" Speech Badge */}
        <div className="hii-speech-bubble animate-bounce-wave">
          <span className="wave-emoji">👋</span>
          <span className="hii-text">HII! 🔊</span>
        </div>
      </div>

      {/* Text Emerge: HII, I'M GUDDU KUMAR */}
      <div className="intro-text-wrapper">
        <h2 className={`intro-greeting ${stage >= 3 ? 'emerge' : ''}`}>
          HII, I'M
        </h2>
        <h1 className={`intro-name ${stage >= 3 ? 'emerge' : ''}`}>
          <span className="gradient-text">GUDDU KUMAR</span>
        </h1>
        <p className={`intro-role ${stage >= 4 ? 'emerge' : ''}`}>
          FULL STACK DEVELOPER
        </p>

        {stage >= 4 && (
          <button 
            onClick={(e) => { e.stopPropagation(); speakAiVoice(); onComplete(); }} 
            className="enter-world-btn btn btn-primary"
          >
            <span>ENTER DIGITAL WORLD</span>
            <ChevronDown size={18} className="scroll-arrow" />
          </button>
        )}
      </div>

      <style>{`
        .cinematic-intro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #06080d;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 1s ease;
          cursor: pointer;
        }

        .sound-control-bar {
          position: absolute;
          top: 2rem;
          right: 2rem;
          z-index: 2010;
        }

        .sound-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(17, 24, 39, 0.85);
          border: 1px solid var(--border-glow);
          color: var(--accent-cyan);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sound-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: var(--accent-primary);
          transform: scale(1.05);
        }

        .intro-bg-glow {
          position: absolute;
          width: 650px;
          height: 650px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 75%);
          filter: blur(90px);
          animation: pulseGlow 4s infinite alternate ease-in-out;
        }

        @keyframes pulseGlow {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        .intro-orb {
          position: absolute;
          width: 130px;
          height: 130px;
          transform: scale(0);
          transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .intro-orb.scaled-up {
          transform: scale(1);
        }

        .orb-core {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, #a855f7 0%, #6366f1 70%, #06b6d4 100%);
          box-shadow: 0 0 50px rgba(168, 85, 247, 0.8), 0 0 100px rgba(99, 102, 241, 0.5);
          animation: rotateOrb 10s infinite linear;
        }

        @keyframes rotateOrb {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .orb-particles span {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #06b6d4;
          box-shadow: 0 0 10px #06b6d4;
          animation: orbit 3s infinite linear;
        }

        .orb-particles span:nth-child(1) { top: -15px; left: 50%; animation-duration: 2.5s; }
        .orb-particles span:nth-child(2) { bottom: -15px; right: 50%; animation-duration: 3.5s; }
        .orb-particles span:nth-child(3) { left: -15px; top: 50%; animation-duration: 2.8s; }
        .orb-particles span:nth-child(4) { right: -15px; bottom: 50%; animation-duration: 3.2s; }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }

        .intro-logo-box {
          position: absolute;
          top: 2.5rem;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .intro-logo-box.visible {
          opacity: 1;
        }

        .logo-gk {
          font-size: 1.8rem;
          font-weight: 900;
          font-family: var(--font-mono);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 2px;
        }

        /* Developer Photo Stage */
        .developer-photo-stage {
          position: relative;
          width: 140px;
          height: 140px;
          margin-bottom: 1.75rem;
          opacity: 0;
          transform: scale(0.6) translateY(30px);
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 10;
        }

        .developer-photo-stage.revealed {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .photo-neon-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #06b6d4 100%);
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(99, 102, 241, 0.5);
          animation: spinRing 4s infinite linear;
        }

        @keyframes spinRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .developer-photo-img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid #090d16;
          z-index: 2;
        }

        /* Speech Bubble "HII!" Badge */
        .hii-speech-bubble {
          position: absolute;
          top: -15px;
          right: -35px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: #fff;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          box-shadow: 0 4px 20px rgba(168, 85, 247, 0.6);
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          z-index: 5;
          animation: waveHii 1.5s infinite ease-in-out alternate;
        }

        .wave-emoji {
          display: inline-block;
          animation: handWave 1.2s infinite ease-in-out;
          transform-origin: 70% 70%;
        }

        @keyframes handWave {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(14deg); }
          40% { transform: rotate(-8deg); }
          60% { transform: rotate(14deg); }
          80% { transform: rotate(-4deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes waveHii {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-6px) scale(1.08); }
        }

        .intro-text-wrapper {
          text-align: center;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .intro-greeting {
          font-size: 1.1rem;
          letter-spacing: 4px;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          opacity: 0;
          transform: translateY(15px);
          filter: blur(4px);
          transition: all 0.8s ease;
        }

        .intro-greeting.emerge {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .intro-name {
          font-size: clamp(2.4rem, 7vw, 4.2rem);
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 0.75rem;
          opacity: 0;
          transform: translateY(20px);
          filter: blur(6px);
          transition: all 0.9s ease 0.2s;
        }

        .intro-name.emerge {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .intro-role {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          letter-spacing: 3px;
          color: var(--accent-cyan);
          opacity: 0;
          transform: translateY(15px);
          filter: blur(4px);
          transition: all 0.8s ease 0.4s;
          margin-bottom: 2rem;
        }

        .intro-role.emerge {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .enter-world-btn {
          margin-top: 1rem;
          padding: 0.85rem 2rem;
          border-radius: 999px;
          font-size: 1rem;
          animation: bounce 2s infinite;
        }

        .scroll-arrow {
          margin-left: 0.5rem;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        @media (max-width: 480px) {
          .sound-control-bar {
            top: 1rem; right: 1rem;
          }
          .intro-orb {
            width: 90px;
            height: 90px;
          }
          .developer-photo-stage {
            width: 110px;
            height: 110px;
          }
          .hii-speech-bubble {
            top: -10px;
            right: -20px;
            font-size: 0.75rem;
            padding: 0.25rem 0.65rem;
          }
          .intro-name {
            font-size: 2.2rem;
          }
          .intro-role {
            font-size: 0.9rem;
            letter-spacing: 2px;
          }
          .enter-world-btn {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
            width: calc(100vw - 3rem);
          }
        }
      `}</style>
    </div>
  );
}
