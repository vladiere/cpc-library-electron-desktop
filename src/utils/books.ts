import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';
import { useBookStore } from 'stores/book-store';
import { useUserStore } from 'stores/user-store';

const bookStore = useBookStore();
const userStore = useUserStore();

const getAllContributorsBooks = async () => {
  try {
    if (bookStore.getBooks.length === 0 && bookStore.getEbooks.length === 0) {
      const response = await api.get('/contributorsbooks/all', {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`
        }
      });
      bookStore.initEBooks(response.data[1]);
      bookStore.initBooks(response.data[3]);
      userStore.initUsers(response.data[4]);
    }
  } catch (error) {
    throw error;
  }
}

export default {
  getAllContributorsBooks,
}
