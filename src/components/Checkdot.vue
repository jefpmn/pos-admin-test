<template>
  <div
    :class="[
      'inline-block',
      'rounded-full',
      'bg-white',
      'p-1',
      'transition-colors',
      'duration-300',
      'ease-in-out',
      (isActive || indeterminate)
        ? [
            'border-4',
            'border-indigo-700',
          ]
        : [
            'border-2',
            'border-gray-400',
          ],
      'border-solid',
      'w-8',
      'h-8',
      'cursor-pointer'
    ]"
    @click="handleOnClick()"
  >
    <div
      v-if="isActive"
      class="flex items-center bg-indigo-700 rounded-full w-full h-full"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (newValue) {
      this.isActive = newValue
    },
    isActive (newValue) {
      if (newValue) {
        this.$emit('update:indeterminate', false)
      }
    }
  },
  data () {
    return {
      isActive: this.value
    }
  },
  methods: {
    handleOnClick () {
      this.updateValue(!this.isActive)
    },
    updateValue (newValue) {
      this.isActive = newValue
      this.$emit('input', newValue)
    }
  }
}
</script>
