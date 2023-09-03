<script setup lang="ts">
import { ref } from "vue";

const newTask = ref<string>("");

const emit = defineEmits<{
  addTask: [newTask: string];
}>();

const addTask = () => {
  emit("addTask", newTask.value);
  newTask.value = "";
};
</script>



<template>
  <section>
    <h5>Add Task</h5>
    <input v-model="newTask" />
    <button @click="addTask">Add Task</button>
  </section>
</template>