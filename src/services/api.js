import axios from 'axios';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjQ1MjhjNzBjYTMwNjEyMjcwN2Q5MDMifQ.lzEogpzuXLUqhPfEJHmjsUxK5MhU5BzH5s4WouunBlI';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3030',
    headers: { 'Authorization': "bearer " + token }
  })
}
