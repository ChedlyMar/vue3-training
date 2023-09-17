<script setup lang="ts">
</script>

<template>
  <div>
    <h1 class="text-orange-400">App.vue</h1>
  </div>
  <router-link to="/">Post List</router-link>
  <router-link to="/add">Add post</router-link>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
