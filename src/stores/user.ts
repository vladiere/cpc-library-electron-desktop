import { defineStore } from 'pinia';

export const useLibrarianDataStore = defineStore('librarian', {
  state: () => ({
    refresh: '',
    token: ''
  }),
  actions: {
    initLibrarian(token, refresh) {
      this.refresh = refresh;
      this.token = token;
    },
    clearLibrarian() {
        this.refresh = '';
        this.token = '';
    },
  },
});
