import axios from 'axios'

function requestWithAuthentication (accessKey) {
  return axios.create({
    baseURL: '/',
    timeout: 3000,
    headers: {
      'x-access-token': accessKey
    }
  })
}

function request () {
  return axios.create({
    baseURL: '/',
    timeout: 3000,
    headers: {
      accesskey: btoa('frontEndTest123')
    }
  })
}

export default {
  requestWithAuthentication,
  request
}
