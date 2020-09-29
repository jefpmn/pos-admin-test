import httpClient from '@/datasources/http/httpClient'

const index = (accesskey) => {
  return httpClient.requestWithAuthentication(accesskey)
    .get('/product')
}

const create = (accesskey, product) => {
  return httpClient.requestWithAuthentication(accesskey)
    .post('/product', product, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

const remove = (accesskey, productId) => {
  return httpClient.requestWithAuthentication(accesskey)
    .delete('/product/' + productId)
}

export default {
  index,
  create,
  remove
}
