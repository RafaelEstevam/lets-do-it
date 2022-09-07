/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const API = axios.create({
  // baseURL: 'https://laboracao-back.herokuapp.com',
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export {
  API,
};
