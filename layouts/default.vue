<template>
  <div>
    <NavigationBar />
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted () {
    const vm = this;
    this.$fire.auth.onAuthStateChanged(async function (user) {
      if (user) {
        vm.$store.commit('user/setLoggedInStatus', true);
        vm.$store.commit('user/setUserProps', user);
        await vm.$store.dispatch('user/setUserFirebaseEntry', {
          loggedIn: true,
          uid: vm.$fire.auth.currentUser.uid,
          name: vm.$fire.auth.currentUser.displayName,
          email: vm.$fire.auth.currentUser.email,
          defaultIcon: vm.$fire.auth.currentUser.photoURL
        });
        if (vm.$store.state.character.listenerUnsubscribe === null) {
          await vm.$store.dispatch('character/getUserCharacters');
        }
        if (vm.$store.state.game.listenerUnsubscribe === null) {
          await vm.$store.dispatch('game/getUserGames');
        }
        await vm.$router.push('main');
      } else {
        console.log('User is not logged in.');
      }
    });
  }
};
</script>

<style>

</style>
