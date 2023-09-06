<script setup lang="ts">
import { useTask } from "../composable/task";

const { taskList, selectTask, deleteTask } = useTask();
</script>

<template>
  <h2 class="h-2 m-4">Task List</h2>
  <div v-for="task in taskList" :key="task">
    <span @click="selectTask(task)">{{ task }}</span>
    <button @click="deleteTask(task)">delete</button>
  </div>
</template>