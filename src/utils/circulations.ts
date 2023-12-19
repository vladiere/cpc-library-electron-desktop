import { useCirculationStore } from 'stores/circulation-store';
import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';

const circulationStore = useCirculationStore();

const calculateFinesFees = async () => {
  try {
    await api.get('/get/finesfees', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });
  } catch (error) {
    throw error;
  }
}

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
  calculateFinesFees,
}
