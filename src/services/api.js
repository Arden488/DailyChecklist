import axios from 'axios';
import { SERVER_URL, TMP_TOKEN } from '../config';

const token = TMP_TOKEN;

export default () => {
  return axios.create({
    baseURL: SERVER_URL[process.env.NODE_ENV],
    headers: { 'Authorization': "bearer " + token }
  })
}
