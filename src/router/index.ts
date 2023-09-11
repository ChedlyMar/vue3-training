import { createRouter, createWebHashHistory } from "vue-router";

import ListPost from "../components/ListPost.vue";
import AddPost from "../components/AddPost.vue";

const routes = [
  {
    path: "/",
    name: "Post List",
    component: ListPost,
  },
  {
    path: "/add",
    name: "Add Post",
    component: AddPost,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
