<template>
  <ol class="px-12 py-6 text-indigo-900">
    <li class="bg-gray-300 rounded-lg p-4 flex items-center">
      <div class="outlet-logo-container mx-2 flex-none inline-block">
        <img
          class="inline-block rounded-lg w-48 h-48"
          src="https://picsum.photos/256"
          alt=""
        >
      </div>
      <div class="outlet-excerpt-info flex-1 mx-10 inline-block">
        <div class="outlet-name block">
          <span class="inital px-2 py-1 mr-2 rounded-full bg-pink-400 inline-block align-middle text-white text-center text-sm font-semibold">
            GS
          </span>
          <span class="fullname inline align-middle text-3xl font-semibold">
            Gading Serpong
          </span>
        </div>
        <div class="outlet-address block ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, commodi sit tempore modi corrupti fugiat debitis assumenda recusandae incidunt, quas saepe totam quod, quisquam molestias iure. Repellat, blanditiis.
        </div>
        <ol class="outlet-stats block my-2">
          <li class="my-1">
            <font-awesome-icon icon="box" class="mr-3" /> 10 products
          </li>
          <li class="my-1">
            <font-awesome-icon icon="tablet-alt" class="mr-3" /> 5 devices
          </li>
          <li class="my-1">
            <font-awesome-icon icon="user-circle" class="mr-3" /> 10 employees
          </li>
        </ol>
      </div>
      <div class="outlet-actions flex-initial w-1/4 inline-block">
        <ol>
          <li>
            <router-link
              tag="a"
              to="/products"
              class="px-1 py-3 block"
            >
              <font-awesome-icon icon="box" class="mr-3" />
              Manage Products
              <font-awesome-icon icon="angle-right" size="lg" class="float-right" />
            </router-link>
          </li>
          <li>
            <router-link
              tag="a"
              to="/devices"
              class="px-1 py-3 block"
            >
              <font-awesome-icon icon="tablet-alt" class="mr-3" />
              Manage devices
              <font-awesome-icon icon="angle-right" size="lg" class="float-right" />
            </router-link>
          </li>
          <li>
            <router-link
              tag="a"
              to="/statistics-and-reports"
              class="px-1 py-3 block"
            >
              <font-awesome-icon icon="chart-line" class="mr-3" />
              See statistics & reports
              <font-awesome-icon icon="angle-right" size="lg" class="float-right" />
            </router-link>
          </li>
          <li>
            <router-link
              tag="a"
              to="/"
              class="px-1 py-3 block"
            >
              <font-awesome-icon icon="info-circle" class="mr-3" />
              Outlet details & info
              <font-awesome-icon icon="angle-right" size="lg" class="float-right" />
            </router-link>
          </li>
        </ol>
      </div>
    </li>
  </ol>
</template>
