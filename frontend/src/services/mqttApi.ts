import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'; 

export const subscribeTopic = (topic: string) => {
  return axios.post(`${BASE_URL}/subscribe`, { topic });
};

export const unsubscribeTopic = (topic: string) => {
  return axios.post(`${BASE_URL}/unsubscribe`, { topic });
};

export const getMessages = () => {
  return axios.get(`${BASE_URL}/messages`);
};

export const getDuplicates = () => {
  return axios.get(`${BASE_URL}/duplicates`);
};

export const confirmDuplicate = (topics: string[]) => {
  return axios.post(`${BASE_URL}/confirm-duplicate`, { topics });
};
