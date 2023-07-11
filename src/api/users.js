import axios from 'axios'

export function getUser(id) {
  return axios.get(`http://localhost:3004/users/${id}`).then((res) => res.data)
}
