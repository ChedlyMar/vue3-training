<script lang="ts" setup>
import { useRoute } from "vue-router";
import usePost from "../composable/post";

const route = useRoute();
const { postDetail, fetchPostById } = usePost();

fetchPostById(route.params.id.toString());
</script>

<template>
  <h2 class="text-2xl">Edit Post</h2>
  <h2>{{ postDetail?.title }}</h2>
  <h2>{{ postDetail?.body }}</h2>
</template>