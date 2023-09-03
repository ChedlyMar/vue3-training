<script setup lang="ts">
const { taskList } = defineProps<{ taskList: string[] }>();

defineEmits<{
  selectTask: [task: string];
  deleteTask: [task: string];
}>();
</script>

<template>
  <section>
    <h5>Task List</h5>
    <div v-for="task in taskList" :key="task">
      <span @click="$emit('selectTask', task)">{{ task }} </span>
      <button @click="$emit('deleteTask', task)">Delete</button>
    </div>
  </section>
</template>