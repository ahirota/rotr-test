<template>
  <div class="container mx-auto h-full py-6">
    <div class="flex item-center justify-center">
      <h1 class="title">
        ROTR Test Index Page
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    if (this.$store.state.user.loggedIn) {
      console.log('User is logged in');
    }
  }
};
</script>

<style scoped>
  .title-page {
    width: 100%;
    height: calc(100vh - 142px);
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
</style>
