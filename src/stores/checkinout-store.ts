import { defineStore } from 'pinia';

export const useCheckInOutStore = defineStore('checkinout', {
  state: () => ({
    checkedout: [],
    return: [],
    history: [],
  }),

  getters: {
    getCheckOut: (state) => state.checkedout,
    getReturn: (state) => state.return,
    getHistory: (state) => state.history,
  },

  actions: {
    initCheckedInOutReturn (data_object) {
      this.checkedout = data_object.checkedout;
      this.return = data_object.return;
      this.history = data_object.history;
    }
  }
});
