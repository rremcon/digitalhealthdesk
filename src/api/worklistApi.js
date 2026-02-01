import api from './client';

export const fetchRequests = async () => {
  const response = await api.get('/api/requests');
  return response.data;
};

export const createRequest = async (payload) => {
  const response = await api.post('/api/requests', payload);
  return response.data;
};

export const assignRequest = async (requestId, payload) => {
  const response = await api.post(`/api/requests/${requestId}/assign`, payload);
  return response.data;
};
