import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeWorldBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 2.5, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 100);
    pointLight2.position.set(-20, -20, -10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x06b6d4, 2, 80);
    pointLight3.position.set(0, 30, -20);
    scene.add(pointLight3);

    // 3. 3D Particle Starfield Universe
    const starsCount = 700;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);

    const palette = [
      new THREE.Color(0x6366f1),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < starsCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 120;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 4. Floating 3D Geometric Polyhedrons (3D Objects World)
    const shapesGroup = new THREE.Group();

    // Shape 1: Icosahedron
    const geo1 = new THREE.IcosahedronGeometry(2.5, 0);
    const mat1 = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: true,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.3
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    mesh1.position.set(-14, 8, -5);
    shapesGroup.add(mesh1);

    // Shape 2: TorusKnot
    const geo2 = new THREE.TorusKnotGeometry(1.8, 0.4, 64, 16);
    const mat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x9333ea,
      emissiveIntensity: 0.4
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.set(16, -10, -8);
    shapesGroup.add(mesh2);

    // Shape 3: Octahedron
    const geo3 = new THREE.OctahedronGeometry(2.2, 0);
    const mat3 = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      emissive: 0x0891b2,
      emissiveIntensity: 0.3
    });
    const mesh3 = new THREE.Mesh(geo3, mat3);
    mesh3.position.set(-12, -12, -12);
    shapesGroup.add(mesh3);

    // Shape 4: Dodecahedron
    const geo4 = new THREE.DodecahedronGeometry(2, 0);
    const mat4 = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x059669,
      emissiveIntensity: 0.3
    });
    const mesh4 = new THREE.Mesh(geo4, mat4);
    mesh4.position.set(14, 12, -15);
    shapesGroup.add(mesh4);

    scene.add(shapesGroup);

    // 5. Interactive Mouse & Scroll Camera Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    let targetScrollY = 0;
    const handleScroll = () => {
      targetScrollY = window.scrollY * 0.015;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // 6. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Stars Field
      starField.rotation.y = elapsedTime * 0.02;
      starField.rotation.x = elapsedTime * 0.01;

      // Rotate Geometric 3D Objects
      mesh1.rotation.x = elapsedTime * 0.4;
      mesh1.rotation.y = elapsedTime * 0.5;

      mesh2.rotation.x = elapsedTime * 0.3;
      mesh2.rotation.y = elapsedTime * 0.4;

      mesh3.rotation.y = elapsedTime * 0.6;
      mesh3.rotation.z = elapsedTime * 0.3;

      mesh4.rotation.x = elapsedTime * 0.5;
      mesh4.rotation.z = elapsedTime * 0.4;

      // Smooth Mouse Interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Camera 3D Orbital Tilt & Scroll Parallax
      camera.position.x = currentMouseX * 4;
      camera.position.y = -currentMouseY * 4 - (targetScrollY * 0.2);
      camera.lookAt(0, -targetScrollY * 0.2, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="three-world-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
