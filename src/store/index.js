import Vue from 'vue'
import Vuex from 'vuex'
import authLocalService from '@/datasources/local/authentication'
import authHttpService from '@/datasources/http/authentication'
import productHttpService from '@/datasources/http/product'
import productVariantHttpService from '@/datasources/http/product-variant'
import productCategoryHttpService from '@/datasources/http/product-category'

Vue.use(Vuex)

function handleUnauthorizedSession (store) {
  return (error) => {
    if (error.response &&
      error.response.status === 401 &&
      error.response.data.code === 401) {
      store.commit('FLUSH_AUTH_SESSION')
    }
  }
}

const initialState = {
  token: '',
  isAuthInitialized: false
}

export default new Vuex.Store({
  state: {
    ...initialState
  },
  mutations: {
    'INITIALIZE_STORED_AUTH_SESSION' (state) {
      const oldToken = authLocalService.getToken()
      if (oldToken) {
        Vue.set(state, 'token', oldToken)
      }
      Vue.set(state, 'isAuthInitialized', true)
    },
    'START_AUTH_SESSION' (state, payload) {
      authLocalService.persistToken(payload)
      Vue.set(state, 'token', payload)
    },
    'FLUSH_AUTH_SESSION' (state) {
      authLocalService.flushToken()
      Vue.set(state, 'token', initialState.token)
    }
  },
  actions: {
    authenticate ({ commit }, payload) {
      return authHttpService.authenticate(payload)
        .then((response) => {
          if (response.status === 200 && response.data.code === 200) {
            commit('START_AUTH_SESSION', response.data.token)
            return true
          }
          return false
        })
    },
    loadProducts (store, params = {}) {
      const { getters } = store
      return productHttpService.index(getters.getToken())
        .then((response) => {
          if (response.status === 200 && response.data.code === 200) {
            return response.data.products.map((product, index) => {
              return {
                _rid: index,
                _id: product.productId,
                imageURL: product.productImage,
                code: product.productCode,
                name: product.productName,
                variants: product.variants,
                outlets: {},
                categoryId: product.categoryId,
                category: product.Category,
                price: product.productPrice,
                cost: product.productCost
              }
            })
          }
          return []
        })
        .catch(handleUnauthorizedSession(store))
    },
    duplicateProducts (store, products) {
      const { getters } = store
      var promisedRequests = []
      for (let i = 0; i < products.length; i++) {
        promisedRequests.push(
          fetch(products[i].imageURL)
            .then((res) => res.blob())
            .then((blob) => {
              const productImage = new File(
                [blob],
                `PROD-${products[i].code}-DUP.jpg`,
                {
                  type: 'image/jpeg'
                }
              )
              let variants = ''
              for (let j = 0; j < products[i].variants.length; j++) {
                variants = variants + products[i].variants[i]
                  .productVariant
                  .variantId

                if (j < (products[i].variants.length - 1)) {
                  variants = variants + ','
                }
              }
              var productFormData = new FormData()
              productFormData.append('name', products[i].name)
              productFormData.append('code', products[i].code)
              productFormData.append('cost', products[i].cost)
              productFormData.append('price', products[i].price)
              productFormData.append('category', products[i].categoryId)
              productFormData.append('variants', `[${variants}]`)
              productFormData.append('image', productImage)

              return productHttpService.create(
                getters.getToken(),
                productFormData
              )
            })
        )
      }
      return Promise.all(promisedRequests)
        .catch(handleUnauthorizedSession(store))
    },
    removeProducts (store, products) {
      const { getters } = store
      var promisedRequests = []
      for (let i = 0; i < products.length; i++) {
        promisedRequests.push(productHttpService.remove(
          getters.getToken(),
          products[i]._id)
        )
      }
      return Promise.all(promisedRequests)
        .catch(handleUnauthorizedSession(store))
    },
    loadProductVariants (store, params = {}) {
      const { getters } = store
      return productVariantHttpService.index(getters.getToken())
        .then((response) => {
          if (response.status === 200 && response.data.code === 200) {
            return response.data.variants.map((variant, index) => {
              return {
                _rid: index,
                _id: variant.variantId,
                name: variant.variantName,
                type: variant.variantType,
                products: [],
                options: variant.variantOption
              }
            })
          }
          return []
        })
        .catch(handleUnauthorizedSession(store))
    },
    duplicateProductVariants (store, variants) {
      const { getters } = store
      var promisedRequests = []
      for (let i = 0; i < variants.length; i++) {
        promisedRequests.push(
          productVariantHttpService.create(getters.getToken(), {
            name: variants[i].name,
            type: variants[i].type,
            options: variants[i].options
          })
        )
      }
      return Promise.all(promisedRequests)
        .catch(handleUnauthorizedSession(store))
    },
    removeProductVariants (store, variants) {
      const { getters } = store
      var promisedRequests = []
      for (let i = 0; i < variants.length; i++) {
        promisedRequests.push(productVariantHttpService.remove(
          getters.getToken(),
          variants[i]._id))
      }
      return Promise.all(promisedRequests)
        .catch(handleUnauthorizedSession(store))
    },
    loadProductCategories (store, params = {}) {
      const { getters } = store
      return productCategoryHttpService.index(getters.getToken())
        .then((response) => {
          if (response.status === 200 && response.data.code === 200) {
            return response.data.categories.map((category, index) => {
              return {
                _rid: index,
                _id: category.id,
                name: category.categoryName
              }
            })
          }
          return []
        })
        .catch(handleUnauthorizedSession(store))
    },
    duplicateProductCategories (store, categories) {
      const { getters } = store
      var promisedRequests = []
      for (let i = 0; i < categories.length; i++) {
        promisedRequests.push(
          productCategoryHttpService.create(getters.getToken(), {
            name: categories[i].name
          })
        )
      }
      return Promise.all(promisedRequests)
        .catch(handleUnauthorizedSession(store))
    },
    removeProductCategories (store, categories) {
      const { getters } = store
      var promisedRequests = []
      for (let i = 0; i < categories.length; i++) {
        promisedRequests.push(productCategoryHttpService.remove(
          getters.getToken(),
          categories[i]._id)
        )
      }
      return Promise.all(promisedRequests)
        .catch(handleUnauthorizedSession(store))
    }
  },
  getters: {
    isAuthenticated (state) {
      return !(state.token.length < 1)
    },
    isAuthSessionInitialized (state) {
      return state.isAuthInitialized
    },
    getToken (state) {
      return () => {
        return state.token
      }
    }
  },
  modules: {
  }
})
