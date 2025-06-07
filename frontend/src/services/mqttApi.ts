// mqttApi.ts - Axios API layer for MQTT backend
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const subscribeTopic = (topic: string) => {
  return axios.post(`${API_BASE}/subscribe`, { topic });
};

export const unsubscribeTopic = (topic: string) => {
  return axios.post(`${API_BASE}/unsubscribe`, { topic });
};

export const getMessages = () => {
  return axios.get(`${API_BASE}/messages`);
};

export const getDuplicates = () => {
  return axios.get(`${API_BASE}/duplicates`);
};

export const confirmDuplicate = (group: string[]) => {
  return axios.post(`${API_BASE}/confirm-duplicate`, { topics: group });
};
