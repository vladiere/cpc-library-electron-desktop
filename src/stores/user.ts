import { defineStore } from 'pinia';

export const useLibrarianDataStore = defineStore('librarian', {
  state: () => ({
    refresh: '',
    token: ''
  }),
  actions: {
    initLibrarian(tokens: unknown) {
      (this.refresh = tokens.refresh),
      (this.token = tokens.token)
    },
    clearLibrarian() {
        (this.refresh = ''),
        (this.token = '')
    },
  },
});
