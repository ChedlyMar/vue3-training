<script setup lang="ts">
import { usePost } from "../composable/post";
const { postList, fetchPostList, fetchPostById, deletePost } = usePost();
fetchPostList();

const selectPost = (postId: string) => {
  fetchPostById(postId);
};
</script>

<template>
  <h2>List Post</h2>
  <div v-for="post in postList" :key="post.id" class="py-2 px-4">
    <h3 class="bg-orange-500" @click="selectPost(post.id)">{{ post.title }}</h3>
    <p>{{ post.body }}</p>
    <button @click="deletePost(post.id)">delete</button>
  </div>
</template>