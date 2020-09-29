<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
export default {
  name: 'App',
  watch: {
    isAuthenticated (newValue) {
      if (!newValue && this.$route.meta.requireAuth) {
        this.$router.push({ name: 'login' })
      }
    }
  },
  computed: {
    layout () {
      return this.$route.meta.layout || 'security'
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style>
</style>
