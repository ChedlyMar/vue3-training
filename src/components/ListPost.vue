<script lang="ts" setup>
import usePost from "../composable/post";
import { useRouter } from "vue-router";
const { postList, fetchPostList } = usePost();

fetchPostList();

const router = useRouter();
const selectPost = (postId: number) => {
  router.push("datail/" + postId);
};
</script>

<template>
  <h2 class="text-2xl">List Post</h2>
  <div v-for="post in postList" :key="post.id" @click="selectPost(post.id)">
    <h3 class="text-xl bg-green-500">{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
</template>