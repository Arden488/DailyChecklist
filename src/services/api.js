import axios from 'axios';
import { SERVER_URL } from '../config';

export default () => {
  const token = localStorage.getItem('access_token');
  const instance = axios.create({
    baseURL: SERVER_URL[process.env.NODE_ENV],
    headers: token ? { 'Authorization': "bearer " + token } : {}
  });

  return instance;
}
