<template>
  <nav
    class="sidebar-navigation
      bg-gray-400
      flex-initial
      min-h-screen
      shadow-inner
      py-20"
  >
    <ul>
      <SidebarNavigationLink
        v-for="(navigation, name, index) in rootNavigations"
        :key="index"
        :active="isActiveLink(navigation.name)"
        :name="navigation.name"
        :label="navigation.text"
        :icon="navigation.icon"
        :path="navigation.path"
        :navigations="getSubNavigations(navigation.name)"
      />
    </ul>
  </nav>
</template>

<script>
import Routes from '@/router/routes'
import SidebarNavigationLink from '@/components/SidebarNavigationLink'

export default {
  components: {
    SidebarNavigationLink
  },
  data () {
    return {
      navigations: this.convertToArray(Routes)
    }
  },
  computed: {
    rootNavigations () {
      if (this.navigations.length < 1) {
        return []
      }
      return this.navigations
        .filter((navigation) => {
          return !/\./.test(navigation.name)
        })
    },
    subNavigations () {
      if (this.navigations.length < 1) {
        return []
      }
      return this.navigations
        .filter((navigation) => {
          return /\./.test(navigation.name)
        })
        .map((navigation) => {
          const rootNavigationName = navigation.name.match(/^(.*)\./)[1]
          return {
            root: rootNavigationName,
            ...navigation
          }
        })
    }
  },
  methods: {
    isActiveLink (name) {
      if (this.isExactPath(name) || this.hasRootPath(name)) {
        return true
      }
      return false
    },
    isExactPath (name) {
      return this.$route.name === name
    },
    hasRootPath (name) {
      return this.subNavigations
        .findIndex((subNavigation) => {
          return (subNavigation.root === name) &&
            (subNavigation.name === this.$route.name)
        }) !== -1
    },
    getSubNavigations (name) {
      return this.subNavigations.filter((subNavigation) => {
        return subNavigation.root === name
      })
    },
    convertToArray (obj) {
      const keys = Object.keys(obj)
      const result = []
      for (let i = 0; i < keys.length; i++) {
        result.push(obj[keys[i]])
      }
      return result
    }
  }
}
</script>
