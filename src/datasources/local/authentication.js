const persistToken = (token) => {
  localStorage.setItem('token', token)
}

const getToken = (token) => {
  return localStorage.getItem('token')
}

const flushToken = (token) => {
  localStorage.removeItem('token')
}

export default {
  persistToken,
  getToken,
  flushToken
}
