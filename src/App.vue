<script setup lang="ts">
import TaskList from "./components/TaskList.vue";
import TaskAdd from "./components/TaskAdd.vue";
import TaskDetails from "./components/TaskDetails.vue";

import { ref } from "vue";

const taskList = ref<string[]>(["task 1", "task 2"]);
// const newTask = ref<string>('')
const selectedTask = ref<string>("");

const addTask = (newTask: string) => {
  taskList.value.push(newTask);
};

const deleteTask = (task: string) => {
  taskList.value.splice(taskList.value.indexOf(task), 1);
};

const selectTask = (task: string) => {
  selectedTask.value = task;
};
</script>

<template>
  <div>
    <h1 class="text-orange-400">App.vue</h1>
  </div>
  <TaskAdd @addTask="addTask" />
  <TaskList
    :taskList="taskList"
    @selectTask="selectTask"
    @deleteTask="deleteTask"
  />
  <TaskDetails :selectedTask="selectedTask" />
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
