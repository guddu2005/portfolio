const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-fwu7.onrender.com/api';

const getHeaders = (requireAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (requireAuth) {
    const token = localStorage.getItem('portfolio_jwt_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // Auth
  async login(username, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Authentication failed');
    }
    if (data.token) {
      localStorage.setItem('portfolio_jwt_token', data.token);
      localStorage.setItem('portfolio_user', JSON.stringify({ username: data.username, role: data.role }));
    }
    return data;
  },

  logout() {
    localStorage.removeItem('portfolio_jwt_token');
    localStorage.removeItem('portfolio_user');
  },

  getStoredUser() {
    try {
      const user = localStorage.getItem('portfolio_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('portfolio_jwt_token');
  },

  // Projects
  async getProjects(category = 'all', featured = false) {
    let url = `${API_BASE_URL}/projects`;
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    if (category && category !== 'all') params.append('category', category);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async getProjectById(id) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  },

  async createProject(projectData) {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(projectData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create project');
    return data;
  },

  async updateProject(id, projectData) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(projectData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update project');
    return data;
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete project');
    return data;
  },

  // Contact
  async submitContact(contactData) {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(contactData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send message');
    return data;
  },

  async getContactMessages() {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      headers: getHeaders(true),
    });
    if (!res.ok) throw new Error('Failed to fetch contact messages');
    return res.json();
  },

  async deleteContactMessage(id) {
    const res = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete message');
    return data;
  }
};
