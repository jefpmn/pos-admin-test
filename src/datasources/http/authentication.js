import httpClient from '@/datasources/http/httpClient'

const authenticate = (credential) => {
  return httpClient.request().post('/signin', credential)
}

export default {
  authenticate
}
