<template>
  <div class="advanced-table flex-initial py-1">
    <div class="advanced-table-head px-12 py-6 shadow-lg">
      <div ref="head-row" class="advanced-table-row flex items-center">
          <div
            ref="head-col-0"
            class="advanced-table-header-cell flex-initial text-center"
            :style="{
              width: columns[0].width
            }"
          >
            <Checkdot
              v-model="isSelectingAll"
              :indeterminate.sync="isSelectingFew"
              @input="selectAll($event)"
            >
          </Checkdot>
        </div>
        <div
          class="advanced-table-header-cell flex-initial px-4"
          v-for="(column, index) in headerColumns"
          :key="(index + 1)"
          :ref="`head-col-${(index + 1)}`"
          :style="{
            width: headerColumns[index].width
          }"
        >
          {{ column.label }}
        </div>
      </div>
    </div>
    <div class="advanced-table-body px-12 overflow-x-hidden">
      <div
        v-for="(item, itemIndex) in tableItems"
        class="advanced-table-row flex my-6 py-2 bg-gray-300 rounded-lg items-stretch"
        style="min-height: 5vh"
        :key="itemIndex"
      >
        <slot
          name="row"
          :item="item"
          :index="itemIndex"
          :tableColumns="headerColumnWidths"
        >
          <div class="flex-1 flex items-center justify-center">
            <Checkdot></Checkdot>
          </div>
          <div
            v-for="(column, columnIndex) in item"
            :class="[
              'flex-1',
              'flex',
              'items-center',
              'px-4',
              'justify-center'
            ]"
            :key="columnIndex"
          >
            <div class="flex-1 flex items-center px-4 justify-center">{{ column }}</div>
          </div>
        </slot>
      </div>
      <slot name="placeholder">
        <div
          v-if="(items.length < 1) && !loading"
          class="flex my-6 py-2 rounded-lg h-full"
        >
          <span class="mx-auto text-lg text-center">No entries</span>
        </div>
      </slot>
      <slot name="loader">
        <div
          v-if="loading"
          class="flex my-6 py-2 rounded-lg h-full"
        >
          <span class="mx-auto text-lg text-center">Loading...</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import Checkdot from '@/components/Checkdot'

export default {
  name: 'AdvancedTable',
  components: {
    Checkdot
  },
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isSelectingAll: false,
      isSelectingFew: false,
      tempItems: [],
      headerColumnWidths: this.getAllHeaderColumnWidths()
    }
  },
  watch: {
    items: {
      handler (newValue) {
        this.tempItems = newValue.map((item) => {
          return {
            ...item,
            isSelected: false
          }
        })
        this.headerColumnWidths = this.getAllHeaderColumnWidths()
      },
      deep: true
    },
    selectedItems (newValue) {
      this.$emit('input', newValue)
      if (this.tempItems.length < 1) {
        return
      }
      if (newValue.length > 0 &&
        (newValue.length < this.tempItems.length)
      ) {
        this.isSelectingAll = false
        this.isSelectingFew = true
        return
      }
      if (newValue.length >= this.tempItems.length) {
        this.isSelectingAll = true
        this.isSelectingFew = false
        return
      }
      this.isSelectingAll = false
      this.isSelectingFew = false
    }
  },
  computed: {
    headerColumns () {
      return this.columns.filter((column) => {
        return column.id !== '_rid' || !/^_.*/.test(column.id)
      })
    },
    tableItems: {
      get () {
        return this.tempItems
      },
      set (newValue) {
        this.tempItems = newValue
      }
    },
    selectedItems () {
      return this.tempItems.filter((item) => {
        return item.isSelected
      })
    }
  },
  methods: {
    selectAll (value) {
      const selectedItems = this.tempItems.map((item) => {
        return {
          ...item,
          isSelected: value
        }
      })

      this.tableItems = selectedItems
    },
    getAllHeaderColumnWidths () {
      const refKeys = Object.keys(this.$refs)
      var dimensions = []
      for (let i = 0; i < refKeys.length; i++) {
        if (!/^head-col-\d/.test(refKeys[i])) {
          continue
        }
        if (i === 0) {
          dimensions.push({
            id: this.columns[i].id,
            width: (this.$refs[refKeys[i]].clientWidth /
              this.$refs['head-row'].clientWidth) * 100
          })
          continue
        }
        dimensions.push({
          id: this.columns[i].id,
          width: (this.$refs[refKeys[i]][0].clientWidth /
            this.$refs['head-row'].clientWidth) * 100
        })
      }
      return dimensions
    }
  }
}
</script>
