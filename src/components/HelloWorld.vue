<script setup lang="ts">
import { useCouterStore } from "../store/counter";
const counter = useCouterStore();
</script>

<template>
  <h1>app</h1>
  <button @click="counter.fetchTodo">get todos</button>
  <div v-for="todo in counter.todos" :key="todo.id">{{ todo.title }}</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
