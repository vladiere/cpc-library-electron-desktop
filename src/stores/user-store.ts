import { defineStore } from 'pinia';
import IUser from 'src/models/userModel';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as Array<IUser>,
  }),

  getters: {
    getUsers: (state) => state.users,
  },

  actions: {
    initUsers (user) {
      this.users = user;
    },
    clearUesr () {
      this.users = [];
    }
  }
});
