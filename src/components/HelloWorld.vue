<script setup lang="ts">
// const {msg} = defineProps({
//   msg: { type: String, required: true }
// })

const { msg } = defineProps<{
  msg: string;
  bar?: number;
}>();

// defineProps<{ msg: string }>();
// const props = defineProps({
//   msg: String,

// })
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
