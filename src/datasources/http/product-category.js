import httpClient from '@/datasources/http/httpClient'

const index = (accesskey) => {
  return httpClient.requestWithAuthentication(accesskey)
    .get('/category')
}

const create = (accesskey, category) => {
  return httpClient.requestWithAuthentication(accesskey)
    .post('/category', category)
}

const remove = (accesskey, categoryId) => {
  return httpClient.requestWithAuthentication(accesskey)
    .delete('/category/' + categoryId)
}

export default {
  index,
  create,
  remove
}
