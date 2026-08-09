import { Mail, Heart, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function CinematicOutroContact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="outro-contact-section">
      <div className="container">
        {/* Monitor Screen Zoom Graphic */}
        <div className="outro-monitor-card glass-card">
          <div className="monitor-glass-frame">
            <span className="outro-sub-tag">// Final Scene</span>
            <h2 className="outro-headline">
              LET'S BUILD <br />
              <span className="gradient-text">SOMETHING GREAT.</span>
            </h2>

            <p className="outro-subtext">
              Have an exciting project, full-stack software role, or mentorship opportunity? Reach out directly!
            </p>

            <div className="outro-actions-row">
              <a href="mailto:dev.portfolio@example.com" className="btn btn-primary btn-lg">
                <Mail size={18} />
                <span>Send Direct Email</span>
              </a>

              <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg">
                <GithubIcon size={18} />
                <span>GitHub Profile</span>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg">
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Closing Thanks Outro Banner */}
        <div className="outro-final-banner">
          <div className="final-orb-gk">
            <span className="gk-text">GK.</span>
          </div>
          <h3 className="thanks-text">THANKS FOR VISITING</h3>
          <p className="signature-sub">Guddu Kumar • Full Stack Developer</p>

          <button onClick={scrollToTop} className="back-top-btn" title="Return to Top Scene">
            <ArrowUp size={16} />
            <span>Back to Top</span>
          </button>
        </div>
      </div>

      <style>{`
        .outro-contact-section {
          padding: 6rem 0 3rem;
          position: relative;
        }

        .outro-monitor-card {
          padding: 4rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 4rem;
        }

        .outro-sub-tag {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--accent-cyan);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .outro-headline {
          font-size: clamp(2.2rem, 6vw, 3.8rem);
          font-weight: 900;
          line-height: 1.15;
          margin: 0.75rem 0 1.25rem;
        }

        .outro-subtext {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          font-size: 1.1rem;
        }

        .outro-actions-row {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .btn-lg {
          padding: 0.9rem 1.8rem;
          font-size: 1rem;
          border-radius: var(--radius-md);
        }

        .outro-final-banner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .final-orb-gk {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
          margin-bottom: 1.25rem;
          animation: floatOrb 4s infinite alternate ease-in-out;
        }

        .gk-text {
          font-family: var(--font-mono);
          font-size: 1.3rem;
          font-weight: 900;
          color: #fff;
        }

        .thanks-text {
          font-family: var(--font-mono);
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 3px;
          color: #fff;
          margin-bottom: 0.35rem;
        }

        .signature-sub {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1.75rem;
        }

        .back-top-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }

        .back-top-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          color: #fff;
          border-color: var(--accent-primary);
        }

        @media (max-width: 600px) {
          .outro-monitor-card { padding: 2rem 1.25rem; }
          .outro-actions-row { flex-direction: column; }
          .outro-actions-row .btn { width: 100%; }
        }
      `}</style>
    </section>
  );
}
