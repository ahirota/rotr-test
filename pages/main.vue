<template>
  <div class="container mx-auto h-full">
    <div class="flex items-center justify-center">
      <p>
        You Are Now Logged In
      </p>
    </div>
    <div class="w-full flex">
      <div v-for="character in $store.state.character.characters" :key="character.id">
        <div>
          <img :src="character.image" />
        </div>
        <div>
          <p>{{ character.name }}</p>
          <p>{{ character.description }}</p>
        </div>
      </div>
    </div>
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
