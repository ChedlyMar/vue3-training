import { defineStore } from "pinia";
// import axios from "axios";
import { fetchTodos } from "../api/todo";

interface ICouterStore {
  todos: Array<{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }>;
}

export const useCouterStore = defineStore("counter", {
  state: (): ICouterStore => ({
    todos: [],
  }),
  getters: {},
  actions: {
    async fetchTodo() {
      this.todos = await fetchTodos();
    },
  },
});
