import { defineStore } from "pinia";

export const useCounterStore = defineStore("couter", {
  state: () => ({ counter: 5 }),

  getters: {
    eaven: (state) => state.counter % 2 == 0,
  },

  actions: {
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    },
  },
});
