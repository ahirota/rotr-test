<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
  export default {
    components: {Navbar},
    mounted() {
      const vm = this;
      this.$fire.auth.onAuthStateChanged(async function (user) {
        if (user) {
          vm.$store.commit('user/setLoggedInStatus', true);
          vm.$store.commit('user/setUserProps', user);
          await vm.$store.dispatch('user/setUserFirebaseEntry', {
            loggedIn: true,
            uid: vm.$fireAuth.currentUser.uid,
            name: vm.$fireAuth.currentUser.displayName,
            email: vm.$fireAuth.currentUser.email,
            defaultIcon: vm.$fireAuth.currentUser.photoURL,
            message: ""
          });
          await vm.$router.push('main');
        } else {
          console.log('User is not logged in.');
        }
      })
    }
  }
</script>

<style>
  
</style>
