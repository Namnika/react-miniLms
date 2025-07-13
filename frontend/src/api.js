// api.js
import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// import api from './api';

// const res = await api.get('/admin/courses');


export default api;
