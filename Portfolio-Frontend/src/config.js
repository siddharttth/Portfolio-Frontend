const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const endpoints = {
  education: `${API_URL}/api/education`,
  experience: `${API_URL}/api/experience`,
  projects: `${API_URL}/api/projects`,
  skills: `${API_URL}/api/skills`
};

export default API_URL;