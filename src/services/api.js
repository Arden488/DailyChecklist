import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const token = process.env.TMP_TOKEN;

export default () => {
  return axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:3030',
    headers: { 'Authorization': "bearer " + token }
  })
}
