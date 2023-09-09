<script setup lang="ts">
import AddPost from "./components/AddPost.vue";
import EditPost from "./components/EditPost.vue";
import ListPost from "./components/ListPost.vue";
</script>

<template>
  <div>
    <h1 class="text-orange-400 text-4xl">App.vue</h1>
  </div>
  <add-post />
  <edit-post />
  <list-post />
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
