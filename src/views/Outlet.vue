<template>
  <div class="dashboard flex-grow">
    <div class="header pt-8 pb-4 px-12 shadow-lg flex flex-1 items-center">
        <h1 class="inline-block text-3xl">Outlet</h1>
        <div class="toolbar-separator flex-grow"></div>
        <div class="toolbar inline-block float-right">
          <select
            class="filter mx-2 rounded-full px-3 py-1 w-56 border border-solid border-indigo-900 bg-white text-indigo-900 text-sm font-semibold"
          >
            <option value="">Filter</option>
          </select>
          <input
            type="text"
            class="search mx-2 rounded-full px-6 py-1 w-56 border border-solid border-indigo-900 bg-white text-indigo-900 text-sm font-semibold"
            placeholder="Search"
          >
          <button class="add-new-outlets mx-2 rounded-full px-3 py-1 bg-red-600 text-white text-sm font-semibold">
            <font-awesome-icon icon="plus" class="mr-3" />
            Add new outlet
          </button>
        </div>
    </div>
    <AdvancedList>
    </AdvancedList>
  </div>
</template>

<script>
import AdvancedList from '@/components/AdvancedList'
// const minimizeModeClass = []

export default {
  name: 'Outlet',
  components: {
    AdvancedList
  },
  computed: {
  }
}
</script>
