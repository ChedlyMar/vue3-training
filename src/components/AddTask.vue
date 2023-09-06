<script setup lang="ts">
import { ref } from "vue";
import { useTask } from "../composable/task";
const { addTask } = useTask();

const newTask = ref<string>("");
</script>

<template>
  <h3>Add Task</h3>
  <input type="text" v-model="newTask" />
  <button @click="() => addTask(newTask)">Add Task</button>
</template>