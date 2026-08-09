import React, { useState } from 'react';
import { Award, ShieldCheck, Eye } from 'lucide-react';

import shivalikCertImg from '../assets/shivalik_academic_excellence_certificate.jpg';
import explorinExcellenceImg from '../assets/explorin_internship_excellence_certificate.png';
import shivatechHackathonImg from '../assets/shivatech_hackathon_2024_certificate.png';
import utkarshAiHackathonImg from '../assets/utkarsh_ai_hackathon_certificate.jpg';
import iitRoorkeeDsImg from '../assets/iit_roorkee_data_science_workshop_certificate.png';
import nptelCertImg from '../assets/nptel_generative_ai_certificate.jpg';

const AUTHENTIC_CERTIFICATES = [
  {
    id: 1,
    title: 'Certificate of Academic Excellence (Rank 1)',
    issuer: 'Shivalik College, Dehradun',
    date: 'Academic Year 2023–24',
    desc: 'Awarded First Position in B.Tech Computer Science & Engineering department for securing 1st Rank with Gold Medal honor at SHIVAFEST 2025.',
    badge: '1st Rank • Gold Medalist',
    img: shivalikCertImg,
    category: 'Academic Honor'
  },
  {
    id: 2,
    title: 'Explorin Internship Certificate of Excellence',
    issuer: 'Explorin Academy & Thomso',
    date: '10 Jun 2024 – 10 Aug 2024',
    desc: 'Awarded Certificate of Excellence for outstanding performance and technical delivery during MERN Stack Summer Internship with Explorin Academy.',
    badge: 'MERN Internship Excellence',
    img: explorinExcellenceImg,
    category: 'Software Engineering'
  },
  {
    id: 3,
    title: 'Shivatech Hackathon 2024 Achievement Award',
    issuer: 'iHUB Shivalik & CBII (Shivalik College)',
    date: '13th & 14th Nov 2024',
    desc: 'Awarded Certificate of Achievement for building MentorConnect mentorship platform in Shivatech Hackathon 2024.',
    badge: 'Hackathon Award Winner',
    img: shivatechHackathonImg,
    category: 'Competitive Coding'
  },
  {
    id: 4,
    title: 'UTKARSH 1.0 — Uttarakhand AI Readiness Hackathon',
    issuer: 'UTU Dehradun (Uttarakhand Technical University)',
    date: '14th May 2025 (ASDC/2025/315)',
    desc: 'Participated in UTKARSH 1.0 State AI Readiness for Sustainable Development Hackathon organized by UTU Dehradun.',
    badge: 'State AI Hackathon 2025',
    img: utkarshAiHackathonImg,
    category: 'AI & Sustainable Tech'
  },
  {
    id: 5,
    title: 'Data Science Workshop at IIT Roorkee',
    issuer: 'Explorin Academy & PayPal',
    date: '19th Jul 2024 – 21st Jul 2024',
    desc: 'Successfully completed intensive 3-day Data Science workshop at IIT Roorkee led by Explorin Academy & PayPal Lead Data Scientist.',
    badge: 'IIT Roorkee DS Workshop',
    img: iitRoorkeeDsImg,
    category: 'Data Science & Analytics'
  },
  {
    id: 6,
    title: 'NPTEL Elite Certification — Programming with Generative AI',
    issuer: 'IISc Bangalore & MoE Govt. of India',
    date: 'Aug–Oct 2025',
    desc: 'Elite Certification awarded for completing 8-week course in Programming with Generative AI (Score: 64%, Roll No: NPTEL25CS137S1054700937).',
    badge: 'NPTEL Elite Certified',
    img: nptelCertImg,
    category: 'Generative AI'
  }
];

export default function Certifications3D() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section className="certs-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Verified Credentials Portfolio</span>
          <h2 className="section-title">Certifications & <span className="gradient-text">Credentials</span></h2>
          <p className="section-subtitle">
            Authentic certificates awarded by Shivalik College, Explorin Academy, IIT Roorkee, UTU Dehradun, and IISc Bangalore / MoE Govt. of India.
          </p>
        </div>

        <div className="certs-grid">
          {AUTHENTIC_CERTIFICATES.map((cert) => (
            <div key={cert.id} className="cert-card glass-card">
              <div className="cert-hologram-glow"></div>
              
              <div className="cert-header">
                <div className="cert-icon-box">
                  <Award size={22} />
                </div>
                <span className="cert-badge">{cert.badge}</span>
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <span className="cert-issuer">{cert.issuer} • {cert.date}</span>
              <p className="cert-desc">{cert.desc}</p>

              <button onClick={() => setActiveCert(cert)} className="btn btn-secondary btn-sm cert-btn">
                <Eye size={15} />
                <span>View Certificate</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Authentic Certificate Lightbox Zoom Modal */}
      {activeCert && (
        <div className="modal-overlay" onClick={() => setActiveCert(null)}>
          <div className="modal-content cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{activeCert.title}</h2>
              <button className="close-btn" onClick={() => setActiveCert(null)}>✕</button>
            </div>
            
            <div className="cert-modal-body">
              <img src={activeCert.img} alt={activeCert.title} className="cert-img-preview" />
              <div className="cert-modal-info">
                <h4>Issued by {activeCert.issuer} ({activeCert.date})</h4>
                <p>{activeCert.desc}</p>
                <div className="verified-badge">
                  <ShieldCheck size={16} />
                  <span>Verified Official Document • Guddu Kumar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .certs-section {
          padding: 2.75rem 0;
        }

        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.75rem;
        }

        .cert-card {
          position: relative;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.35s ease;
        }

        .cert-card:hover {
          transform: translateY(-6px) perspective(800px) rotateY(3deg);
        }

        .cert-hologram-glow {
          position: absolute;
          top: -30px;
          right: -30px;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
          filter: blur(20px);
          pointer-events: none;
        }

        .cert-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .cert-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.15);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cert-badge {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
        }

        .cert-title {
          font-size: 1.2rem;
          color: #fff;
          font-weight: 700;
          margin-bottom: 0.35rem;
          line-height: 1.3;
        }

        .cert-issuer {
          font-size: 0.85rem;
          color: var(--accent-secondary);
          margin-bottom: 1rem;
        }

        .cert-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .cert-btn {
          align-self: flex-start;
        }

        .cert-modal-content {
          max-width: 820px;
        }

        .cert-img-preview {
          width: 100%;
          max-height: 520px;
          object-fit: contain;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          background: #000;
          border: 1px solid var(--border-color);
        }

        .cert-modal-info h4 {
          color: #fff;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .cert-modal-info p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--accent-emerald);
          font-family: var(--font-mono);
          font-size: 0.825rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
        }

        @media (max-width: 600px) {
          .certs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
