import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Layers, Sparkles, CheckCircle2, Network, Zap } from 'lucide-react';

const TECH_DATA = [
  { 
    name: 'Java Spring Boot', 
    category: 'Backend Enterprise Core', 
    color: 0x6366f1, 
    hex: '#6366f1', 
    desc: 'Core enterprise backend mastery: Java 21, Spring Boot 3, Spring Security 6 JWT, Microservices & REST APIs.', 
    connects: ['MERN Stack', 'DSA Skills', 'Redis', 'PostgreSQL', 'Docker'],
    skills: ['Java 21 LTS', 'Spring Boot 3', 'Spring Security 6', 'JWT Auth', 'Microservices', 'Spring Data JPA']
  },
  { 
    name: 'MERN Stack', 
    category: 'Full Stack Web Core', 
    color: 0x10b981, 
    hex: '#10b981', 
    desc: 'Full Stack MERN development: MongoDB, Express.js, React.js, and Node.js (Explorin Internship 2024).', 
    connects: ['Java Spring Boot', 'React.js', 'MongoDB', 'Node.js & Express'],
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'Full Stack Development']
  },
  { 
    name: 'DSA Skills', 
    category: 'Problem Solving & CS', 
    color: 0xf59e0b, 
    hex: '#f59e0b', 
    desc: '700+ Data Structures & Algorithms challenges solved across C++ & Java on LeetCode/GeeksforGeeks.', 
    connects: ['Java Spring Boot', 'C++ Language', 'MERN Stack'],
    skills: ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'C++', 'Java 21']
  },
  { 
    name: 'React.js', 
    category: 'Frontend UI Mastery', 
    color: 0x06b6d4, 
    hex: '#06b6d4', 
    desc: 'Reactive Single Page Applications with Hooks, Redux, Tailwind CSS, Vite & Glassmorphism UI.', 
    connects: ['MERN Stack', 'WebSockets', 'Java Spring Boot'],
    skills: ['React 18', 'Vite', 'Hooks & State', 'Component Architecture', 'Tailwind CSS']
  },
  { 
    name: 'MongoDB', 
    category: 'NoSQL Database', 
    color: 0x059669, 
    hex: '#059669', 
    desc: 'NoSQL document database storage for MERN stack & MentorConnect / Job Portal services.', 
    connects: ['MERN Stack', 'Node.js & Express', 'Docker'],
    skills: ['MongoDB Atlas', 'Mongoose ODM', 'Aggregation Pipelines', 'BSON Schemas']
  },
  { 
    name: 'Node.js & Express', 
    category: 'Server-Side JavaScript', 
    color: 0x84cc16, 
    hex: '#84cc16', 
    desc: 'Event-driven asynchronous backend services and RESTful APIs for MERN applications.', 
    connects: ['MERN Stack', 'MongoDB', 'React.js'],
    skills: ['Node.js Runtime', 'Express.js Framework', 'REST API Routes', 'JWT Middleware']
  },
  { 
    name: 'Redis', 
    category: 'In-Memory Cache', 
    color: 0xef4444, 
    hex: '#ef4444', 
    desc: 'In-memory data caching for sub-millisecond query performance & JWT session management.', 
    connects: ['Java Spring Boot', 'PostgreSQL'],
    skills: ['In-Memory Cache', 'Session Storage', 'Key-Value Store', 'TTL Expiration']
  },
  { 
    name: 'PostgreSQL', 
    category: 'Relational SQL Database', 
    color: 0x3b82f6, 
    hex: '#3b82f6', 
    desc: 'Relational database management for LeadFlow-CRM & enterprise backend pipelines.', 
    connects: ['Java Spring Boot', 'Redis'],
    skills: ['PostgreSQL 16', 'SQL Queries', 'Relational Schemas', 'Indexing & Joins']
  },
  { 
    name: 'Docker', 
    category: 'DevOps & Containers', 
    color: 0x0284c7, 
    hex: '#0284c7', 
    desc: 'Containerization & multi-service deployment orchestrations using Docker Compose.', 
    connects: ['Java Spring Boot', 'MongoDB', 'PostgreSQL'],
    skills: ['Docker Images', 'Docker Compose', 'Container Isolation', 'Production Builds']
  },
  { 
    name: 'WebSockets', 
    category: 'Real-Time Streaming', 
    color: 0xec4899, 
    hex: '#ec4899', 
    desc: 'STOMP & SockJS real-time bi-directional messaging for Chat-Sphere application.', 
    connects: ['React.js', 'Java Spring Boot'],
    skills: ['WebSockets', 'STOMP Protocol', 'SockJS', 'Bi-directional Streaming']
  },
  { 
    name: 'C++ Language', 
    category: 'Core Computer Science', 
    color: 0x8b5cf6, 
    hex: '#8b5cf6', 
    desc: 'Primary language for starting Data Structures & Algorithms from 1st semester.', 
    connects: ['DSA Skills', 'Java Spring Boot'],
    skills: ['C++ STL', 'Pointers & Memory', 'Fast I/O', 'Algorithm Design']
  }
];

// Helper to generate dynamic canvas textures with tech text for 3D WebGL Spheres
function createTextTexture(text, hexColor) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Sphere texture background glow
  const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.4, hexColor);
  grad.addColorStop(1, '#0b0f19');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  // Label text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Fira Code, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 6;
  ctx.fillText(text, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function TechBubbleUniverse3D({ onSelectTech }) {
  const mountRef = useRef(null);
  const [selectedTech, setSelectedTech] = useState(TECH_DATA[0]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Setup Three.js WebGL Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(12, 12, 12);
    scene.add(dirLight);

    // 3. 3D WebGL Spheres Creation
    const universeGroup = new THREE.Group();
    const sphereMeshes = [];
    const sphereMap = new Map();

    const radius = 8.5;
    TECH_DATA.forEach((tech, idx) => {
      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const texture = createTextTexture(tech.name, tech.hex);

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.2,
        metalness: 0.5,
        emissive: tech.color,
        emissiveIntensity: 0.35
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Position in 3D orbit spherical distribution
      const phi = Math.acos(-1 + (2 * idx) / TECH_DATA.length);
      const theta = Math.sqrt(TECH_DATA.length * Math.PI) * phi;

      mesh.position.x = radius * Math.cos(theta) * Math.sin(phi);
      mesh.position.y = radius * Math.sin(theta) * Math.sin(phi);
      mesh.position.z = radius * Math.cos(phi);

      mesh.userData = tech;
      universeGroup.add(mesh);
      sphereMeshes.push(mesh);
      sphereMap.set(tech.name, mesh);
    });

    // 4. 3D Connected Node Lines Creation
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45,
      linewidth: 2
    });

    const linePositions = [];
    const connectedPairs = [];

    TECH_DATA.forEach(sourceTech => {
      const sourceMesh = sphereMap.get(sourceTech.name);
      if (!sourceMesh) return;

      sourceTech.connects.forEach(targetName => {
        const targetMesh = sphereMap.get(targetName);
        if (targetMesh) {
          linePositions.push(
            sourceMesh.position.x, sourceMesh.position.y, sourceMesh.position.z,
            targetMesh.position.x, targetMesh.position.y, targetMesh.position.z
          );
          connectedPairs.push({ source: sourceMesh, target: targetMesh });
        }
      });
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    universeGroup.add(linesMesh);

    // 5. Traveling Energy Pulses along Connected Lines
    const pulseCount = connectedPairs.length;
    const pulseGeometry = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(pulseCount * 3);
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));

    const pulseMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.6,
      transparent: true,
      opacity: 0.95
    });

    const pulsesMesh = new THREE.Points(pulseGeometry, pulseMaterial);
    universeGroup.add(pulsesMesh);

    scene.add(universeGroup);

    // 6. Interactive Raycasting & Drag Orbit
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (event) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sphereMeshes);

      if (intersects.length > 0) {
        const hitTech = intersects[0].object.userData;
        setSelectedTech(hitTech);
        if (onSelectTech) onSelectTech(hitTech.name);
      }
    };

    const handlePointerMove = (event) => {
      if (!isDragging) return;
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };

      universeGroup.rotation.y += deltaMove.x * 0.006;
      universeGroup.rotation.x += deltaMove.y * 0.006;

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 7. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous 3D WebGL Galaxy Orbit Rotation when not dragging
      if (!isDragging) {
        universeGroup.rotation.y += 0.003;
        universeGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08;
      }

      // Update Traveling Energy Pulses
      const pulsePositionsAttr = pulsesMesh.geometry.attributes.position;
      connectedPairs.forEach((pair, idx) => {
        const progress = (elapsed * 0.6 + idx * 0.2) % 1;
        pulsePositionsAttr.setXYZ(
          idx,
          pair.source.position.x + (pair.target.position.x - pair.source.position.x) * progress,
          pair.source.position.y + (pair.target.position.y - pair.source.position.y) * progress,
          pair.source.position.z + (pair.target.position.z - pair.source.position.z) * progress
        );
      });
      pulsePositionsAttr.needsUpdate = true;

      // Keep sphere labels oriented towards viewer
      sphereMeshes.forEach(mesh => {
        mesh.rotation.y = -universeGroup.rotation.y;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="tech-bubble-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// WebGL 3D Connected Constellation</span>
          <h2 className="section-title">My <span className="gradient-text">3D Connected Tech Universe</span></h2>
          <p className="section-subtitle">
            An interactive 3D constellation showcasing BOTH my <strong>Java Spring Boot</strong> & <strong>MERN Stack</strong> skills alongside 700+ DSA problem solving capabilities. Drag 360° & click any node!
          </p>
        </div>

        <div className="bubble-universe-container glass-card">
          {/* Three.js 3D WebGL Canvas */}
          <div className="webgl-stage-wrapper">
            <div ref={mountRef} className="webgl-canvas-mount"></div>
            <div className="webgl-hint">
              <Network size={14} />
              <span>Java Spring Boot & MERN Stack Connected Nodes — Drag 360° & Click Spheres</span>
            </div>
          </div>

          {/* Active Sphere Inspector Drawer */}
          <div className="sphere-inspector-box">
            <div className="sphere-inspector-header">
              <div className="sphere-color-badge" style={{ background: selectedTech.hex, boxShadow: `0 0 14px ${selectedTech.hex}` }}></div>
              <div>
                <h3 className="inspector-tech-name">{selectedTech.name}</h3>
                <span className="inspector-cat">{selectedTech.category}</span>
              </div>
            </div>
            <p className="inspector-tech-desc">{selectedTech.desc}</p>
            
            {/* Core Skills Breakdown */}
            <div className="skills-breakdown-box">
              <span className="connect-title"><Sparkles size={14} /> Core Skillsets & Technologies:</span>
              <div className="connect-tags-row">
                {selectedTech.skills.map((skillName, i) => (
                  <span key={i} className="skill-chip">{skillName}</span>
                ))}
              </div>
            </div>

            <div className="connected-nodes-box">
              <span className="connect-title"><Zap size={14} /> Connected Ecosystem Nodes:</span>
              <div className="connect-tags-row">
                {selectedTech.connects.map((nodeName, i) => (
                  <span key={i} className="connect-node-tag">{nodeName}</span>
                ))}
              </div>
            </div>

            <div className="inspector-note">
              <CheckCircle2 size={16} className="note-icon" />
              <span>Implemented in Guddu's Java Spring Boot microservices & MERN Stack apps</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tech-bubble-section {
          padding: 2.75rem 0;
        }

        .bubble-universe-container {
          padding: 2rem;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 2rem;
          align-items: center;
        }

        .webgl-stage-wrapper {
          position: relative;
          width: 100%;
          height: 380px;
          border-radius: var(--radius-md);
          background: rgba(9, 13, 22, 0.9);
          border: 1px solid var(--border-glow);
          overflow: hidden;
        }

        .webgl-canvas-mount {
          width: 100%;
          height: 100%;
          cursor: grab;
        }

        .webgl-canvas-mount:active {
          cursor: grabbing;
        }

        .webgl-hint {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-cyan);
          background: rgba(11, 15, 25, 0.9);
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          border: 1px solid var(--border-glow);
          pointer-events: none;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .sphere-inspector-box {
          background: rgba(11, 15, 25, 0.9);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.75rem;
        }

        .sphere-inspector-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .sphere-color-badge {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        .inspector-tech-name {
          font-size: 1.35rem;
          color: #fff;
          font-weight: 800;
        }

        .inspector-cat {
          font-size: 0.825rem;
          color: var(--accent-cyan);
          font-family: var(--font-mono);
        }

        .inspector-tech-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
          font-size: 0.925rem;
        }

        .skills-breakdown-box {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1rem;
        }

        .skill-chip {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          background: rgba(16, 185, 129, 0.15);
          color: #6ee7b7;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.15rem 0.55rem;
          border-radius: 999px;
        }

        .connected-nodes-box {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1rem;
        }

        .connect-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.4rem;
        }

        .connect-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .connect-node-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          border: 1px solid rgba(99, 102, 241, 0.3);
          padding: 0.15rem 0.55rem;
          border-radius: 999px;
        }

        .inspector-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--accent-emerald);
        }

        @media (max-width: 900px) {
          .bubble-universe-container {
            grid-template-columns: 1fr;
            padding: 1.25rem;
          }
          .webgl-stage-wrapper {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
