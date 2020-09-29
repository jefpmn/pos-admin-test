<template>
  <div id="app" class="flex w-screen min-h-full">
    <SidebarNavigation />
    <slot></slot>
  </div>
</template>

<script>
import SidebarNavigation from '@/components/SidebarNavigation'

export default {
  components: {
    SidebarNavigation
  }
}
</script>
