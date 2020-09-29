function Guard (router, store) {
  if (!store.getters.isAuthSessionInitialized) {
    store.commit('INITIALIZE_STORED_AUTH_SESSION')
  }
  router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !store.getters.isAuthenticated) {
      next({ name: 'login' })
    } else if (to.name === 'login' && store.getters.isAuthenticated) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  })
}

export default Guard
