<template>
  <nav class="flex items-center justify-between flex-wrap p-6">
    <div class="flex items-center flex-shrink-0 text-black mr-6" @click="toMain">
      <span class="font-semibold text-xl tracking-tight">ROTR Test App</span>
    </div>
    <div class="block lg:hidden">
      <button v-if="!$store.state.user.loggedIn" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" @click="login">
        Login
      </button>
      <button v-else class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" @click="logout">
        Login
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-black mr-4">
          Link 1
        </a>
        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-black mr-4">
          Link 2
        </a>
        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-black">
          Link 3
        </a>
      </div>
      <div>
        <button v-if="!$store.state.user.loggedIn" class="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0" @click="login">
          Login
        </button>
        <button v-else class="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0" @click="logout">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar.vue',
  methods: {
    async login () {
      try {
        const loggedIn = await this.$store.dispatch('user/loginSetup');
        if (loggedIn === false) {
          return;
        }
        await this.$router.push('main');
      } catch (error) {
        console.error(error);
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('user/logoutCleanup');
        await this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
    toMain () {
      if (!this.$store.state.user.loggedIn) {
        this.$router.push('/');
      } else {
        this.$router.push('main');
      }
    }
  }
};
</script>

<style scoped>
</style>
