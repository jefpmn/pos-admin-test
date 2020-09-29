<template>
  <div class="login flex-grow flex min-h-screen">
    <div class="billboard flex-grow h-screen bg-gray-400 overscroll-y-none overscroll-x-none">
    </div>
    <div
      class="flex-initial login-area flex flex-col my-auto h-screen bg-white px-8 py-12 shadow-inner"
      style="min-width: 480px; max-width: 500px"
    >
      <div class="mt-20 mb-8 w-3/4 mx-auto">
        <h1 class="text-4xl">POS SYSTEM</h1>
        <h1 class="text-2xl">Version 0.1</h1>
      </div>
      <form class="login-box w-3/4 mx-auto">
        <input
          type="text"
          placeholder="Username"
          v-model="username"
          class="mx-auto my-2 px-4 py-2 border border-solid border-indigo-700 w-full rounded-full outline-none"
        >
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          class="mx-auto my-2 px-4 py-2 border border-solid border-indigo-700 w-full rounded-full outline-none"
        >
        <button
          type="submit"
          class="my-2 px-8 py-2 hover:bg-white hover:text-black text-white bg-indigo-700 border border-solid border-indigo-700 w-full rounded-full outline-none transition duration-300 ease-in-out focus:outline-none"
          @click.prevent="authenticate()"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    authenticate () {
      this.$store.dispatch('authenticate', {
        username: this.username,
        password: this.password
      })
        .then((isAuthenticated) => {
          if (isAuthenticated) {
            this.sendUserToDashboard()
          }
        })
    },
    sendUserToDashboard () {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
