<script setup lang="ts">
import { usePost } from "../composable/post";

const { selectedPost } = usePost();
</script>

<template>
  <h2>Detail Post</h2>
  <h1>{{ selectedPost?.title }}</h1>
</template>