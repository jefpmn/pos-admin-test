import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Guard from './router/guard'
import store from './store'
import Backoffice from './views/layouts/Backoffice'
import Security from './views/layouts/Security'
import './assets/styles/index.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faStore,
  faTabletAlt,
  faChartLine,
  faBox,
  faCalculator,
  faWrench,
  faUserCircle,
  faInfoCircle,
  faAngleRight,
  faAngleDown,
  faPlus,
  faCopy,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faBars,
  faStore,
  faTabletAlt,
  faChartLine,
  faBox,
  faCalculator,
  faWrench,
  faUserCircle,
  faInfoCircle,
  faAngleRight,
  faAngleDown,
  faPlus,
  faCopy,
  faTrashAlt
)

Vue.component('back-office', Backoffice)
Vue.component('security', Security)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Guard(router, store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
