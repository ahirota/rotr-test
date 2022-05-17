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
      await this.$store.dispatch('characters/getUserCharacters');
    }
    if (this.$store.state.game.listenerUnsubscribe === null && this.$store.state.user.uid !== null && this.$store.state.user.loggedIn) {
      await this.$store.dispatch('games/getUserGames');
    }
  }
};
</script>
