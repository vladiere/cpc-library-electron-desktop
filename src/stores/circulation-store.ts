import { defineStore } from 'pinia';
import { ICirculation, IFineFees, IRenewal } from 'src/models/circulations';


export const useCirculationStore = defineStore('circulation', {
  state: () => ({
    reservations: [] as Array<ICirculation>,
    holds: [] as Array<ICirculation>,
    finefees: [] as Array<IFineFees>,
    borrows: [] as Array<ICirculation>,
    renewals: [] as Array<IRenewal>,
    all_renewals: [] as Array<IRenewal>,
  }),

  getters: {
    getReservations: (state) => state.reservations,
    getHolds: (state) => state.holds,
    getFinesFees: (state) => state.finefees,
    getBorrows: (state) => state.borrows,
    getRenewals: (state) => state.renewals,
    getAllRenewals: (state) => state.all_renewals,
    isEmpty: (state) => {
      return (
        state.reservations.length === 0 ||
        state.holds.length === 0 ||
        state.finefees.length === 0 ||
        state.borrows.length === 0 ||
        state.renewals.length === 0
      )
    },
  },

  actions: {
    initCirculations (data) {
      this.reservations = data.reserved;
      this.holds = data.held;
      this.finefees = data.finefees;
      this.borrows = data.borrowed;
      this.renewals = data.renewal;
      this.all_renewals = data.all_renewals;
    },
    updateStatus (type, id, status, approved_date) {
      let index;
      switch (type) {
        case 'reservations':
          index = reservations.findIndex(reserve => reserve.pending_transaction_id === id);
          if (index !== -1) {
            this.reservations[index].status = status;
            this.reservations[index].approve_date = approved_date;
          }
          break;
        case 'holds':
          index = holds.findIndex(held => held.pending_transaction_id === id);
          if (index !== -1) {
            this.holds[index].status = status;
            this.holds[index].approve_date = approved_date;
          }
          break;
        case 'borrows':
          index = borrows.findIndex(borrow => borrow.pending_transaction_id === id);
          if (index !== -1) {
            this.borrows[index].status = status;
            this.borrows[index].approve_date = approved_date;
          }
          break;
        case 'renewals':
          index = renewals.findIndex(renew => renew.pending_transaction_id === id);
          if (index !== -1) {
            this.renewals[index].approval_status = status;
          }
          break;
        default:
          throw new Error('Invalid circulation type');
          break;
      }
    },
    deleteCirculations (type, id) {
      let index;
      switch (type) {
        case 'reservations':
          index = this.reservations.findIndex(reserve => reserve.pending_transaction_id === id);
          if (index !== -1) {
            this.reservations.splice(index, 1);
          }
          break;
        case 'holds':
          index = this.holds.findIndex(held => held.pending_transaction_id === id);
          if (index !== -1) {
            this.holds.splice(index, 1);
          }
           break;
        case 'borrows':
          index = this.borrows.findIndex(borrow => borrow.pending_transaction_id === id);
          if (index !== -1) {
            this.borrows.splice(index, 1);
          }
          break;
        case 'renewals':
          index = this.renewals.findIndex(renew => renew.renewal_id === id);
          if (index !== -1) {
            this.renewals.splice(index, 1);
          }
          break;
        default:
          throw new Error('Invalid circulation type');
          break;
      }
    }
  }
});
