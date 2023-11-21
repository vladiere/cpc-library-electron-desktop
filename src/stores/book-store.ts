import { defineStore } from 'pinia';
import IEBooks from 'src/models/bookModel';
import IBookModel from 'src/models/bookModel';

export const useBookStore = defineStore('books', {
  state: () => ({
    ebooks: [] as Array<IEBooks>,
    books: [] as Array<IBookModel>,
  }),

  getters: {
    getEbooks: (state) => state.ebooks,
    getBooks: (state) => state.books,
  },

  actions: {
    initEBooks (ebooks) {
      this.ebooks = ebooks;
    },
    clearEBook () {
      this.ebooks = [];
    },
    initBooks (books) {
      this.books = books;
    },
    clearBook () {
      this.books = [];
    }
  }
});
