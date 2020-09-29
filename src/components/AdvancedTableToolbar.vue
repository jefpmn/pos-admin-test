<template>
  <div class="pt-8 pb-4 px-12 flex flex-initial items-center">
      <h1 class="inline text-3xl">{{ capitalize(heading) }} <font-awesome-icon icon="angle-down" class="ml-2" /></h1>
      <div class="toolbar-separator flex-grow"></div>
      <div class="toolbar inline">
        <button
          class="add-new-outlets mx-2 rounded-full px-3 py-1 bg-indigo-800 text-white text-sm"
          :disabled="!canDuplicate"
          @click="duplicateSelectedRows"
        >
          <font-awesome-icon icon="copy" class="mr-3" />
          Duplicate
        </button>
        <button
          class="add-new-outlets mx-2 rounded-full px-3 py-1 bg-indigo-800 text-white text-sm"
          :disabled="!canDelete"
          @click="removeSelectedRows"
        >
          <font-awesome-icon icon="trash-alt" class="mr-3" />
          Delete
        </button>
        <select
          class="filter mx-2 rounded-full px-3 py-1 w-40 border border-solid border-indigo-900 bg-white text-indigo-900 text-sm outline-none"
        >
          <option value="">Filter</option>
        </select>
        <input
          type="text"
          class="search mx-2 rounded-full px-6 py-1 w-56 border border-solid border-indigo-900 bg-white text-indigo-900 text-sm outline-none"
          placeholder="Search"
        >
        <button
          class="add-new-outlets mx-2 rounded-full px-3 py-1 bg-red-600 text-white text-sm focus:outline-none"
        >
          <font-awesome-icon icon="plus" class="mr-3" />
          Add new {{ buttonContextLabel }}
        </button>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      default: ''
    },
    buttonContextLabel: {
      type: String,
      default: ''
    },
    allowDeletion: {
      type: Boolean,
      default: true
    },
    allowDuplication: {
      type: Boolean,
      default: true
    },
    selections: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    canDelete () {
      if (!this.allowDeletion) {
        return false
      }
      return this.selections.length > 0
    },
    canDuplicate () {
      if (!this.allowDuplication) {
        return false
      }
      return this.selections.length > 0
    }
  },
  methods: {
    capitalize (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    removeSelectedRows () {
      if (!this.canDelete) {
        return
      }
      this.$emit('input', 'remove')
    },
    duplicateSelectedRows () {
      if (!this.canDuplicate) {
        return
      }
      this.$emit('input', 'duplicate')
    }
  }
}
</script>
