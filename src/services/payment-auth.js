import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_FIREBASE_PROD_URL : process.env.VUE_APP_FIREBASE_AUTH_URL,
});

export default instance;
