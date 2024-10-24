const API_URL = 'https://portfolio-backend-01.up.railway.app' || 'http://localhost:8000';
// const API_URL = 'http://localhost:8000';
export const endpoints = {
  education: `${API_URL}/api/education`,
  experience: `${API_URL}/api/experience`,
  projects: `${API_URL}/api/projects`,
  skills: `${API_URL}/api/skills`,
  games: `${API_URL}/api/games`,
};

export default API_URL;
