import api from './client';

export const fetchConversations = async () => {
  const response = await api.get('/api/chats');
  return response.data;
};

export const fetchMessages = async (conversationId) => {
  const response = await api.get(`/api/chats/${conversationId}/messages`);
  return response.data;
};

export const sendMessage = async (conversationId, payload) => {
  const response = await api.post(`/api/chats/${conversationId}/messages`, payload);
  return response.data;
};
