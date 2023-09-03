<script setup lang="ts">
import { ref } from "vue";

const taskList = ref<string[]>([]);
const newTask = ref<string>("");
const selectedTask = ref<string>("");

const addTask = () => {
  taskList.value.push(newTask.value);
  newTask.value = "";
  selectedTask.value = "";
};

const selectTask = (task: string) => {
  selectedTask.value = task;
};

const deleteTask = (task: string) => {
  taskList.value.splice(taskList.value.indexOf(task), 1);
  selectedTask.value = "";
};
</script>

<template>
  <!-- ADD TASK -->
  <section>
    <h2 class="">Add Task</h2>
    <input
      class="shadow appearance-none border rounded mx-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      v-model="newTask"
    />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="addTask"
    >
      Add Task
    </button>
  </section>
  <!-- TASK LIST-->
  <section>
    <h2>Task List</h2>
    <div v-for="task in taskList" :key="task">
      <span @click="selectTask(task)">
        {{ task }}
      </span>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="deleteTask(task)"
      >
        delete
      </button>
    </div>
  </section>
  <!-- SELECT TASK -->
  <section>
    <h2>Selected Task</h2>
    <h3>{{ selectedTask }}</h3>
  </section>
</template>

<style scoped>
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>
