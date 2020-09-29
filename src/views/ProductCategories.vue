<template>
  <div class="dashboard flex-grow flex-col">
    <AdvancedTableToolbar
      heading="Categories"
      button-context-label="category"
      :selections="selections"
      @input="handleActions"
    >
    </AdvancedTableToolbar>
    <hr class="mx-12 flex-grow">
    <AdvancedTable
      :items="categories"
      :columns="HEADER_COLUMNS"
      :loading="isLoading"
      v-model="selections"
    >
      <template v-slot:row="{ item, index, tableColumns }">
        <div
          class="advanced-table-data-cell flex-initial flex items-center justify-center"
          :style="{
            width: `${tableColumns[0].width}%`
          }"
        >
          <Checkdot v-model="item.isSelected"/>
        </div>
        <div
          class="advanced-table-data-cell flex-initial flex items-center px-4 border-l-2  border-solid border-white"
          :style="{
            width: `${tableColumns[1].width}%`
          }"
        >
          {{ item.name }}
        </div>
        <div
          class="advanced-table-data-cell flex-initial flex items-center px-4 border-l-2 border-solid border-white"
          :style="{
            width: `${tableColumns[2].width}%`
          }"
        >
          -
        </div>
      </template>
    </AdvancedTable>
  </div>
</template>

<script>
import AdvancedTable from '@/components/AdvancedTable'
import AdvancedTableToolbar from '@/components/AdvancedTableToolbar'
import Checkdot from '@/components/Checkdot'

const HEADER_COLUMNS = [
  {
    label: '_id',
    id: '_rid',
    sortable: false,
    width: '12.5%'
  },
  {
    label: 'Category name',
    id: 'name',
    sortable: false,
    width: '20.5%'
  },
  {
    label: 'Assigned products',
    id: 'products',
    sortable: false,
    width: '50%'
  }
]

export default {
  components: {
    AdvancedTable,
    AdvancedTableToolbar,
    Checkdot
  },
  data () {
    return {
      HEADER_COLUMNS: HEADER_COLUMNS,
      categories: [],
      selections: [],
      isLoading: false
    }
  },
  created () {
    this.loadProductCategories()
  },
  computed: {
    canDelete () {
      return this.selections.length > 0
    },
    canDuplicate () {
      return this.selections.length > 0
    }
  },
  methods: {
    toCurrencyIDR (text) {
      return text
    },
    handleActions (actions) {
      switch (actions) {
        case 'duplicate':
          this.duplicateSelectedRows()
          break
        case 'remove':
          this.removeSelectedRows()
          break
        default:
          break
      }
    },
    removeSelectedRows () {
      if (!this.canDelete) {
        return
      }
      this.$store.dispatch(
        'removeProductCategories',
        this.selections
      )
        .then((results) => {
          this.loadProductCategories()
          console.log(results)
        })
    },
    duplicateSelectedRows () {
      if (!this.canDuplicate) {
        return
      }
      this.$store.dispatch(
        'duplicateProductCategories',
        this.selections
      )
        .then((results) => {
          this.loadProductCategories(3000 * this.selections.length)
          console.log(results)
        })
    },
    loadProductCategories (delay = 1000) {
      this.isLoading = true
      this.categories = []
      setTimeout(() => {
        this.$store.dispatch('loadProductCategories')
          .then((categories) => {
            this.categories = categories
            this.isLoading = false
          })
      }, delay)
    }
  }
}
</script>
