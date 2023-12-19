import { defineStore } from 'pinia';

export const useCatalogueStore = defineStore('catalogue', {
  state: () => ({
    subject: [],
    classificationNo: [],
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2;
    }
  },

  actions: {
    increment () {
      this.counter++;
    }
  }
});
