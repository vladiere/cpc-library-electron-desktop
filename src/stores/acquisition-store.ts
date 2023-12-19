import { defineStore } from 'pinia';
import IAcquisition from 'src/models/acquisitions';

export const useAcquisitionStore = defineStore('acquisition', {
  state: () => ({
    acquisition: [] as Array<IAcquisition>,
  }),

  getters: {
    getAcquisition: (state) => state.acquisition,
  },

  actions: {
    initAcquisition (acquisition) {
      this.acquisition = acquisition;
    },
    clearAcquisition () {
      this.acquisition = [];
    },
  }
});
