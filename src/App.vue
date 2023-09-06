<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import AddTask from "./components/AddTask.vue";
import ListTask from "./components/ListTask.vue";
import DetailTask from "./components/DetailTask.vue";
</script>

<template>
  <div>
    <h1 class="text-orange-400">App.vue</h1>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <add-task />
  <list-task />
  <detail-task></detail-task>
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
