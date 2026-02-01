import api from './client';

export const loginUser = async (username, password) => {
  const response = await api.post('/login', {username, password});
  return response.data;
};

export const registerUser = async (payload) => {
  const response = await api.post('/users/register', payload);
  return response.data;
};
