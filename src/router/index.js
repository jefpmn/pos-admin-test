import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Outlet from '../views/Outlet.vue'
import Products from '../views/Products.vue'
import ProductVariants from '../views/ProductVariants.vue'
import ProductCategories from '../views/ProductCategories.vue'
import Devices from '../views/Devices.vue'
import StatisticAndReports from '../views/StatisticAndReports.vue'
import Accounts from '../views/Accounts.vue'
import Settings from '../views/Settings.vue'
import NotFound from '../views/NotFound.vue'
import Routes from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'security'
    }
  },
  {
    path: '/' + Routes.dashboard.name,
    name: Routes.dashboard.name + '-redirect',
    redirect: { name: Routes.dashboard.name }
  },
  {
    path: Routes.dashboard.path,
    name: Routes.dashboard.name,
    component: Dashboard,
    meta: {
      layout: 'back-office',
      requireAuth: true
    }
  },
  {
    path: Routes.outlets.path,
    name: Routes.outlets.name,
    component: Outlet,
    meta: {
      layout: 'back-office',
      requireAuth: true
    }
  },
  {
    path: Routes.products.path,
    name: Routes.products.name,
    component: Products,
    meta: {
      layout: 'back-office',
      requireAuth: true
    }
  },
  {
    path: Routes.variants.path,
    name: Routes.variants.name,
    component: ProductVariants,
    meta: {
      layout: 'back-office',
      requireAuth: true
    }
  },
  {
    path: Routes.categories.path,
    name: Routes.categories.name,
    component: ProductCategories,
    meta: {
      layout: 'back-office',
      requireAuth: true
    }
  },
  {
    path: Routes.devices.path,
    name: Routes.devices.name,
    component: Devices,
    meta: {
      layout: 'back-office',
      requireAuth: true
    }
  },
  {
    path: Routes.statistics_and_reports.path,
    name: Routes.statistics_and_reports.name,
    component: StatisticAndReports,
    meta: {
      layout: 'back-office',
      requireAuth: true
    }
  },
  {
    path: Routes.accounts.path,
    name: Routes.accounts.name,
    component: Accounts,
    meta: {
      layout: 'back-office',
      requireAuth: true
    }
  },
  {
    path: Routes.settings.path,
    name: Routes.settings.name,
    component: Settings,
    meta: {
      layout: 'back-office',
      requireAuth: true
    }
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
    meta: {
      layout: 'security'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
