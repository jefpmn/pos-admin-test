<template>
  <li
    ref="rootRef"
    :class="[
      'ml-4',
      'my-2',
      'z-40',
      active
        ? 'shadow-sm'
        : ''
    ]"
    :style="placeholdDimension"
    @mouseover="handleOnMouseOver()"
    @mouseleave="handleOnMouseLeave()"
  >
    <router-link
      tag="a"
      :to="path"
      :class="[
        'block',
        'transition-all',
        'duration-300',
        'ease-in-out',
        'transform',
        isSubnav
          ? [
              'rounded-l-lg',
              'rounded-r-lg',
              'shadow-lg'
            ]
          : 'rounded-l-lg',
        'px-6',
        'py-6',
        active
          ? [
              'bg-white',
              isHovered
                ? [
                    'absolute',
                    'bg-indigo-700',
                    'text-white',
                    'rounded-r-lg'
                  ]
                : 'text-red-700'
            ]
          : [
            isSubnav
              ? [
                  isHovered
                    ? 'text-white'
                    : [
                        'text-gray-700',
                        'bg-gray-400'
                      ],
                ]
              : [
                  isHovered
                  ? [
                      'absolute',
                      'text-white',
                      'rounded-r-lg'
                    ]
                  : 'text-gray-700'
              ]
            ],
        isHovered
          ? [
              '-translate-y-3',
              'bg-indigo-700',
              'scale-110'
            ]
          :
            'static'
      ]"
    >
      <font-awesome-icon v-if="!isSubnav" :icon="icon || 'box'" size="lg" />
      <span v-if="isSubnav || isHovered"
        :class="[
          isSubnav
          ? ''
          : 'ml-3'
        ]">
        {{ label }}
      </span>
    </router-link>
    <ul
      v-if="hasSubNavigations"
      :class="[
        'py-4',
        'px-1',
        isHovered
          ? [
              'absolute',
              'visible'
            ]
          : [
            'hidden'
          ]
      ]"
      :style="subNavPosition"
      @mouseover="handleOnMouseOver()"
      @mouseleave="handleOnMouseLeave()"
    >
      <SidebarNavigationLink
        v-for="(navigation, name, index) in navigations"
        :is-subnav="true"
        :key="index"
        :name="navigation.name"
        :label="navigation.text"
        :icon="navigation.icon"
        :path="navigation.path"
      />
    </ul>
  </li>
</template>

<script>
import SidebarNavigationLink from '@/components/SidebarNavigationLink'

export default {
  name: 'SidebarNavigationLink',
  components: {
    SidebarNavigationLink
  },
  props: {
    'is-subnav': {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    navigations: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isHovered: false
    }
  },
  computed: {
    placeholdDimension () {
      if (!this.isHovered) {
        return {}
      }
      if (this.isHovered && this.isSubnav) {
        return {}
      }
      return {
        width: `${this.$refs.rootRef.clientWidth}px`,
        height: `${this.$refs.rootRef.clientHeight}px`
      }
    },
    subNavPosition () {
      if (!this.isHovered) {
        return {}
      }

      const posY = this.$refs.rootRef.offsetTop +
        ((this.$refs.rootRef.clientHeight / 100) * 80)
      const posX = this.$refs.rootRef.offsetLeft +
        ((this.$refs.rootRef.clientWidth / 100) * 90)

      return {
        top: `${posY}px`,
        left: `${posX}px`
      }
    }
  },
  methods: {
    hasSubNavigations () {
      return this.navigations.length > 0
    },
    handleOnMouseOver () {
      this.isHovered = true
    },
    handleOnMouseLeave () {
      this.isHovered = false
    }
  }
}
</script>
