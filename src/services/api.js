import axios from 'axios';
import { SERVER_URL } from '../config';

const token = localStorage.getItem('access_token');

export default () => {
  return axios.create({
    baseURL: SERVER_URL[process.env.NODE_ENV],
    headers: token ? { 'Authorization': "bearer " + token } : {}
  })
}
