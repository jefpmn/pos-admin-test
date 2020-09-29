<template>
  <div class="dashboard flex-grow flex-col">
    <AdvancedTableToolbar
      heading="Products"
      button-context-label="product"
      :selections="selections"
      @input="handleActions"
    >
    </AdvancedTableToolbar>
    <hr class="mx-12 flex-grow">
    <AdvancedTable
      :items="products"
      :columns="HEADER_COLUMNS"
      :loading="isLoading"
      v-model="selections"
    >
      <template v-slot:row="{ item, index, tableColumns }">
        <div
          class="advanced-table-data-cell flex-1 flex items-center justify-center"
          :style="{
            width: `${tableColumns[0].width}%`
          }"
        >
          <Checkdot v-model="item.isSelected"/>
        </div>
        <div
          class="advanced-table-data-cell flex-1"
          :style="{
            width: `${tableColumns[1].width}%`
          }"
        >
          <img
            class="inline-block rounded-lg w-20 h-20"
            :src="item.imageURL"
            :alt="item.code"
          >
        </div>
        <div
          class="advanced-table-data-cell flex-1 flex items-center px-4 justify-center"
          :style="{
            width: `${tableColumns[2].width}%`
          }"
        >
          {{ item.code }}
        </div>
        <div
          class="advanced-table-data-cell flex-1 flex items-center px-4 border-l-2 border-r-2 border-solid border-white"
          :style="{
            width: `${tableColumns[3].width}%`
          }"
        >
          {{ item.name }}
        </div>
        <div
          class="advanced-table-data-cell flex-1 items-center px-4"
          :style="{
            width: `${tableColumns[4].width}%`
          }"
        >
          <div
            class="inline-block border border-solid border-indigo-800 text-indigo-800 bg-white px-2 py-1 m-1 text-sm rounded-full whitespace-no-wrap"
            v-for="(variant, variantIndex) in item.variants"
            :key="variantIndex"
          >
            {{ variant.productVariant.variantName }}
          </div>
        </div>
        <div
          class="advanced-table-data-cell flex-1 flex items-center px-4 border-l-2 border-r-2 border-solid border-white"
          :style="{
            width: `${tableColumns[5].width}%`
          }"
        >
          {{ '' }}
        </div>
        <div
          class="advanced-table-data-cell flex-1 flex items-center px-4"
          :style="{
            width: `${tableColumns[6].width}%`
          }"
        >
          {{ item.category.categoryName }}
        </div>
        <div
          class="advanced-table-data-cell flex-1 flex items-center px-4 border-l-2 border-r-2 border-solid border-white"
          :style="{
            width: `${tableColumns[7].width}%`
          }"
        >
          {{ item.price }}
        </div>
        <div
          class="flex-1 flex items-center px-4"
          :style="{
            width: `${tableColumns[8].width}%`
          }"
        >
          {{ item.price }}
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
    label: '',
    id: 'images',
    sortable: false,
    width: '12.5%'
  },
  {
    label: 'Code',
    id: 'code',
    sortable: false,
    width: '12.5%'
  },
  {
    label: 'Product name',
    id: 'name',
    sortable: false,
    width: '12.5%'
  },
  {
    label: 'Variants',
    id: 'variants',
    sortable: false,
    width: '12.5%'
  },
  {
    label: 'Outlets',
    id: 'outlets',
    sortable: false,
    width: '12.5%'
  },
  {
    label: 'Category',
    id: 'category',
    sortable: false,
    width: '12.5%'
  },
  {
    label: 'Price',
    id: 'price',
    sortable: false,
    width: '12.5%'
  },
  {
    label: 'Cost',
    id: 'cost',
    sortable: false,
    width: '12.5%'
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
      products: [],
      selections: [],
      isLoading: false
    }
  },
  created () {
    this.loadProducts()
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
        'removeProducts',
        this.selections
      )
        .then((results) => {
          this.loadProducts()
          console.log(results)
        })
    },
    duplicateSelectedRows () {
      if (!this.canDuplicate) {
        return
      }
      this.$store.dispatch(
        'duplicateProducts',
        this.selections
      )
        .then((results) => {
          this.loadProducts(3000 * this.selections.length)
          console.log(results)
        })
    },
    loadProducts (delay = 1000) {
      this.isLoading = true
      this.products = []
      setTimeout(() => {
        this.$store.dispatch('loadProducts')
          .then((products) => {
            this.products = products
            this.isLoading = false
          })
      }, delay)
    }
  }
}
</script>
