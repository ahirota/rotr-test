<template>
  <div>
    You Are Now Logged In
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  async mounted () {
    if (this.$store.state.character.listenerUnsubscribe === null && this.$store.state.user.uid !== null && this.$store.state.user.loggedIn) {
      await this.$store.dispatch('character/getUserCharacters');
    }
    if (this.$store.state.game.listenerUnsubscribe === null && this.$store.state.user.uid !== null && this.$store.state.user.loggedIn) {
      await this.$store.dispatch('game/getUserGames');
    }
  }
};
</script>
