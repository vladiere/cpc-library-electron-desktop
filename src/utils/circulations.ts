import { useCirculationStore } from 'stores/circulation-store';
import { useLibrarianDataStore } from 'stores/user';
import { api } from 'boot/axios';

const userStore = useLibrarianDataStore();
const circulationStore = useCirculationStore();

const getCirculations = async () => {
  try {
    console.log(userStore.token)
     const response = await api.get('/transactions/all', {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
     });
     console.log(response.data);
  } catch (error) {
    throw error;
  }
}

export default {
  getCirculations,
}
