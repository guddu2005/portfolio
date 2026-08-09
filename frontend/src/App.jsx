import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhoAmISection from './components/WhoAmISection';
import CareerTimeline3D from './components/CareerTimeline3D';
import ExplorinScene3D from './components/ExplorinScene3D';
import JobPortal3DArchitecture from './components/JobPortal3DArchitecture';
import Projects from './components/Projects';
import ChatSphereScene3D from './components/ChatSphereScene3D';
import MentorConnectScene3D from './components/MentorConnectScene3D';
import TechBubbleUniverse3D from './components/TechBubbleUniverse3D';
import DsaTerminal3D from './components/DsaTerminal3D';
import Achievements3D from './components/Achievements3D';
import Certifications3D from './components/Certifications3D';
import Contact from './components/Contact';
import CinematicIntro from './components/CinematicIntro';
import GudduAIOrb from './components/GudduAIOrb';
import CinematicOutroContact from './components/CinematicOutroContact';
import AdminModal from './components/AdminModal';
import AnimatedBackground from './components/AnimatedBackground';
import ThreeWorldBackground from './components/ThreeWorldBackground';
import { api } from './services/api';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAdmin, setIsAdmin] = useState(api.isAuthenticated());
  const [user, setUser] = useState(api.getStoredUser());
  const [adminModalState, setAdminModalState] = useState({ open: false, mode: 'login' });
  const [editingProject, setEditingProject] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setIsAdmin(api.isAuthenticated());
    setUser(api.getStoredUser());
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleOpenAdmin = (mode = 'login') => {
    setEditingProject(null);
    setAdminModalState({ open: true, mode });
  };

  const handleCloseAdmin = () => {
    setAdminModalState({ open: false, mode: 'login' });
    setEditingProject(null);
  };

  const handleLoginSuccess = (data) => {
    setIsAdmin(true);
    setUser({ username: data.username, role: data.role });
  };

  const handleLogout = () => {
    api.logout();
    setIsAdmin(false);
    setUser(null);
    showToast('Logged out of admin session', 'success');
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setAdminModalState({ open: true, mode: 'add-project' });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      showToast('Project deleted successfully', 'success');
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      showToast(err.message || 'Failed to delete project', 'error');
    }
  };

  return (
    <div className="app-root">
      {/* 1. Cinematic 3D Intro Scene */}
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      {/* Interactive Particle Network Canvas */}
      <AnimatedBackground />

      {/* Full-Page Interactive 3D WebGL World Background */}
      <ThreeWorldBackground />

      {/* Background Animated Glows */}
      <div className="bg-glow-container">
        <div className="glow-blob-1"></div>
        <div className="glow-blob-2"></div>
        <div className="glow-blob-3"></div>
      </div>

      {/* 2. Header / Navbar */}
      <Navbar
        isAdmin={isAdmin}
        user={user}
        onOpenAdmin={handleOpenAdmin}
        onLogout={handleLogout}
        unreadCount={1}
      />

      {/* Main Cinematic Story Sections */}
      <main>
        {/* 3. Hero Scene with 3D Guddu Developer Workspace */}
        <Hero />

        {/* 4. Who Am I Holographic Panels */}
        <WhoAmISection />

        {/* 5. 3D Career Journey Timeline */}
        <CareerTimeline3D />

        {/* 6. Explorin MERN Internship & Roorkee Internship 3D Scene */}
        <ExplorinScene3D />

        {/* 7. Enterprise Job Portal 3D Microservice Network Architecture */}
        <JobPortal3DArchitecture />

        {/* 8. Portfolio Projects Showcase */}
        <Projects
          isAdmin={isAdmin}
          onOpenAdmin={handleOpenAdmin}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
          refreshTrigger={refreshTrigger}
        />

        {/* 9. Chat-Sphere Real-Time Communication */}
        <ChatSphereScene3D />

        {/* 10. MentorConnect Knowledge Platform */}
        <MentorConnectScene3D />

        {/* 11. Tech Stack 3D Bubble Universe */}
        <TechBubbleUniverse3D />

        {/* 12. Futuristic DSA Terminal & Stats */}
        <DsaTerminal3D />

        {/* 13. 3D Trophy & Achievements */}
        <Achievements3D />

        {/* 14. Holographic Certifications */}
        <Certifications3D />

        {/* 15. Visitor Contact Section */}
        <Contact onShowToast={showToast} />

        {/* 16. Cinematic Outro Contact */}
        <CinematicOutroContact />
      </main>

      {/* Signature Guddu AI Floating Orb Assistant */}
      <GudduAIOrb />

      {/* Admin Modal */}
      {adminModalState.open && (
        <AdminModal
          mode={adminModalState.mode}
          projectToEdit={editingProject}
          onClose={handleCloseAdmin}
          onLoginSuccess={handleLoginSuccess}
          onRefreshProjects={() => setRefreshTrigger(prev => prev + 1)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification Container */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
