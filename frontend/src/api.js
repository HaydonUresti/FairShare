import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Local default

export const getMessage = async () => {
  const response = await fetch(`${API_URL}/api/message`);
  const data = await response.json();
  return data;
};