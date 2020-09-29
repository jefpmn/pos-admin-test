import httpClient from '@/datasources/http/httpClient'

const index = (accesskey) => {
  return httpClient.requestWithAuthentication(accesskey)
    .get('/variant')
}

const create = (accesskey, variant) => {
  return httpClient.requestWithAuthentication(accesskey)
    .post('/variant', variant)
}

const remove = (accesskey, variantId) => {
  return httpClient.requestWithAuthentication(accesskey)
    .delete('/variant/' + variantId)
}

export default {
  index,
  create,
  remove
}
