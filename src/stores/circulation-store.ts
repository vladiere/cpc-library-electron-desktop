import { defineStore } from 'pinia';
import { ITransactionPending } from 'src/models/transation';

export const useCirculationStore = defineStore('circulation', {
  state: () => ({
    reservations: [] as Array<ITransactionPending>,
    holds: [] as Array<ITransactionPending>,
    finefees: [] as Array<ITransactionPending>,
    borrows: [] as Array<ITransactionPending>,
    renewals: [] as Array<ITransactionPending>,
  }),

  getters: {
    getReservations: (state) => state.reservations,
    getHolds: (state) => state.holds,
    getFineFess: (state) => state.finefees,
    getBorrows: (state) => state.borrows,
    getRenewals: (state) => state.renewals,
  },

  actions: {
    initCirculations (reserved,transaction_data,approved) {
      this.reservations = reserved;
      this.holds = transaction_data.holds;
      this.finefees = transaction_data.finefees;
      this.borrows = transaction_data.borrows;
      this.renewals = transaction_data.renewals;
    }
  },
  persist: true,
});
