import { useCirculationStore } from 'stores/circulation-store';
import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';

const circulationStore = useCirculationStore();

const getCirculations = async () => {
  try {
      const response = await api.get('/transactions/all', {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`
        }
      });
      circulationStore.initCirculations(response.data);
  } catch (error) {
    throw error;
  }
}

export default {
  getCirculations,
}
