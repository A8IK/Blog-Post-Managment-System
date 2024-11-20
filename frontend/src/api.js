import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = (data, token) => axios.post(`${API_URL}/auth/login`, data, {headers: {'Authorization':`Bearer ${token}`}});
export const getPosts = () => axios.get(`${API_URL}/blogs`);
export const createPost = (data, token) => axios.post(`${API_URL}/blogs/create`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deletePost = (id, token) => axios.delete(`${API_URL}/blogs/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
