<script setup lang="ts">
const { selectedTask } = defineProps<{ selectedTask: string }>();
</script>

<template>
  <section>
    <h5>Selected Task</h5>
    <div>{{ selectedTask }}</div>
  </section>
</template>

<style scoped>
</style>