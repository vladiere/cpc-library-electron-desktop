import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';
import { useAcquisitionStore } from 'stores/acquisition-store';

const acquisitionStore = useAcquisitionStore();

const getLibraryAcquisitions = async () => {
  try {
    if (acquisitionStore.getAcquisition.length === 0) {
      const response = await api.get('/get/library/acquisitions', {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`
        }
      });

      console.log(response.data);
    }
  } catch (error) {
    throw error;
  }
}

export default {
  getLibraryAcquisitions,
}
