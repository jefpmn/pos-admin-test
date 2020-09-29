<template>
  <div class="dashboard flex-grow">
    <div class="header mt-8 mx-8">
      <img
        class="inline-block p-5 mr-2 align-middle rounded-full w-24 h-24"
        src="https://picsum.photos/48"
        alt=""
      >
      <div class="inline-block align-middle">
        <h1 class="block text-4xl">Hi Martabak Bang</h1>
        <span class="block text-lg">Here's your summary for today</span>
      </div>
    </div>
    <div class="monitoring flex my-4 mx-6">
      <div class="flex-1 bg-gray-300 p-6 m-3 rounded-lg">
        <div class="context text-gray-700 text-xl py-1">
          <span class="align-middle">
            Today's total sales
          </span>
          <span class="align-top text-2xl font-bold float-right">
            x
          </span>
        </div>
        <div class="context-value text-2xl font-bold pt-1 pb-2 border-b border-solid border-gray-900">
          Rp. 9,870,000
        </div>
        <div class="excerpt-items py-2">
          <div
            v-for="(transaction, index) in transactions"
            class="excerpt-item flex py-1 text-indigo-900 font-semibold"
            :key="index"
          >
            <span class="item-name flex-auto text-sm">{{ transaction.id }}</span>
            <span class="item-value flex-auto text-right text-sm">
              {{ transaction.price }}
            </span>
          </div>
        </div>
        <div class="detail text-right">
          <router-link
            tag="a"
            to="/statistics-and-reports"
            class="inline-block py-2 px-1 font-bold text-xl text-red-600"
          >
            See all transactions
            <font-awesome-icon icon="angle-right" size="lg" class="ml-1"/>
          </router-link>
        </div>
      </div>
      <div class="flex-1 bg-gray-300 p-6 m-3 rounded-lg">
        <div class="context text-gray-700 text-xl py-1">
          <span class="align-middle">
            Today's total visitors
          </span>
          <span class="align-top text-2xl font-bold float-right">
            x
          </span>
        </div>
        <div
          class="context-value text-2xl font-bold pt-1 pb-2 border-b border-solid border-gray-900"
        >
          236 visitors
        </div>
        <div class="excerpt-items py-2">
          <div
            v-for="(outlet, index) in outlets"
            class="excerpt-item flex py-1 text-indigo-900 font-semibold"
            :key="index"
          >
            <span class="item-name flex-auto text-sm">{{ outlet.name }}</span>
            <span class="item-value flex-auto text-right text-sm">
              {{ outlet.transactionCount }} transactions
            </span>
          </div>
        </div>
        <div class="detail text-right">
          <router-link
            tag="a"
            to="/outlets"
            class="inline-block py-2 px-1 font-bold text-xl text-red-600"
          >
            See all outlets
            <font-awesome-icon icon="angle-right" size="lg" class="ml-1"/>
          </router-link>
        </div>
      </div>
      <div class="flex-1 bg-gray-300 p-6 m-3 rounded-lg">
        <div class="context text-gray-700 text-xl py-1">
          <span class="align-middle">
            Today's best sellers
          </span>
          <span class="align-top text-2xl font-bold float-right">
            x
          </span>
        </div>
        <div class="context-value text-2xl font-bold pt-1 pb-2 border-b border-solid border-gray-900">
          Martabak Telur
        </div>
        <div class="excerpt-items py-2">
          <div
            v-for="(item, index) in sales"
            class="excerpt-item flex py-1 text-indigo-900 font-semibold"
            :key="index"
          >
            <span class="item-name flex-auto text-sm">{{ item.name }}</span>
            <span class="item-value flex-auto text-right text-sm">{{ item.soldCount }} sold</span>
          </div>
        </div>
        <div class="detail text-right">
          <router-link
            tag="a"
            to="/products"
            class="inline-block py-2 px-1 font-bold text-xl text-red-600"
          >
            See all products
            <font-awesome-icon icon="angle-right" size="lg" class="ml-1"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    timeContext () {
      return 'today'
    },
    transactions () {
      return [
        {
          id: '#INV-0813',
          price: 'Rp. 150,000'
        },
        {
          id: '#INV-720',
          price: 'Rp. 98,000'
        },
        {
          id: '#INV-8011',
          price: 'Rp. 81,000'
        },
        {
          id: '#INV-7745',
          price: 'Rp. 56,000'
        },
        {
          id: '#INV-7745',
          price: 'Rp. 40,000'
        }
      ]
    },
    outlets () {
      return [
        {
          name: 'Gading Serpong',
          transactionCount: 70
        },
        {
          name: 'Bandar Sunway',
          transactionCount: 50
        },
        {
          name: 'Kota Bahru',
          transactionCount: 23
        },
        {
          name: 'Waroeng Batavia',
          transactionCount: 7
        },
        {
          name: 'Shah Alam',
          transactionCount: 2
        }
      ]
    },
    sales () {
      return [
        {
          name: 'Martabak Udang',
          soldCount: 70
        },
        {
          name: 'Martabak Manis',
          soldCount: 50
        },
        {
          name: 'Kota Bahru',
          soldCount: 23
        },
        {
          name: 'Waroeng Batavia',
          soldCount: 7
        },
        {
          name: 'Shah Alam',
          soldCount: 2
        }
      ]
    }
  }
}
</script>
