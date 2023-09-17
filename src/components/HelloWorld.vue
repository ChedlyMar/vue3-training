<script setup lang="ts">
import { useCounterStore } from "../store/couter";

const counterStore = useCounterStore();
</script>

<template>
  <h1>Counter</h1>
  <h2>{{ counterStore.counter }}</h2>
  <button @click="counterStore.increment">+</button>
  <button @click="counterStore.decrement">-</button>
  <h2 v-if="counterStore.eaven">is eaven</h2>
  <h2 v-else>is odd</h2>

  <h2>{{ counterStore.eaven ? "is eaven" : "is odd" }}</h2>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
