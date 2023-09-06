<script setup lang="ts">
import { useTask } from "../composable/task";

const { selectedTask } = useTask();
</script>
<template>
  <h1>deyail task</h1>
  <h2>{{ selectedTask }}</h2>
</template>