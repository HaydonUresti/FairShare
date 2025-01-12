import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Local backend URL

export const getMessage = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};