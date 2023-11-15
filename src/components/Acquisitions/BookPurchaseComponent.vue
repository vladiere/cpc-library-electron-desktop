<template>
  <div class="text-h6">Book Purchase</div>
  <div class="column q-gutter-y-md">
    <q-form
      greedy
      @submit.prevent="handleSubmitPurchase"
      class="column q-gutter-y-sm"
      @reset="onSuccess"
    >
      <div class="col row q-gutter-x-md">
        <q-input
          class="col"
          v-model="form.title"
          outlined
          label="Book Title"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Enter the title of the book',
          ]"
        />
        <q-input
          class="col"
          label="Source"
          v-model="form.source"
          outlined
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Enter the source']"
        />
      </div>
      <div class="col row q-gutter-x-md">
        <q-input
          class="col"
          label="Accession No"
          v-model="form.accession_no"
          type="number"
          outlined
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Enter accession number',
          ]"
        />
        <q-input
          class="col"
          outlined
          v-model="form.accession_date"
          label="Date"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Enter the date of purchase',
            (val) => isValidDate(val) || 'Enter a valid date',
          ]"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.accession_date" mask="YYYY-DD-MM">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col row q-gutter-x-md">
        <q-input
          v-model="form.cost"
          outlined
          class="col"
          label="Price"
          type="number"
          min="0"
          max="99999"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Enter the cost price']"
        />
        <q-input
          label="Book Condition"
          class="col"
          outlined
          v-model="form.condition"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Enter the condition of the book',
          ]"
        />
      </div>
      <div class="q-pa-none" style="max-height: 300px">
        <q-input v-model="form.notes" outlined label="Note" type="textarea" />
      </div>
      <div class="row self-center">
        <q-btn
          label="Add Book Purchase"
          color="primary"
          rounded
          type="submit"
        />
      </div>
    </q-form>
    <div class="column q-gutter-y-md">
      <span class="text-subtitle">Recent Purchases</span>
      <q-virtual-scroll
        style="max-height: 50vh"
        :items="bookPurchaseRecords"
        separator
        v-slot="{ item, index }"
      >
        <BookPurchase :key="index" v-bind="item" />
      </q-virtual-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import BookPurchase, {
  BookPurchaseRecordsProps,
} from 'src/components/Acquisitions/BookPurchase.vue';
import { api } from 'src/boot/axios';
import { Notify, LocalStorage } from 'quasar';
import isValidDate from 'src/functions/isValidDate';

defineComponent({
  name: 'BookPurchaseComponent',
});

const form = ref({
  title: '',
  accession_no: '',
  cost: '',
  source: '',
  accession_date: '',
  condition: '',
  notes: '',
});

const onSuccess = () => {
  for (const key in form.value) {
    form.value[key as keyof typeof form.value] = '';
  }
};

// Sample data
const bookPurchaseRecords = ref<BookPurchaseRecordsProps[]>([]);

const handleSubmitPurchase = async () => {
  try {
    const response = await api.post(
      '/add/book/acquisition',
      { book_acquisition: form.value },
      {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
        },
      }
    );

    if (response.data.status_code === 201) {
      Notify.create({
        message: response.data.message,
        position: 'top',
        type: 'positive',
        timeout: 2400,
      });

      const newFormValue = {
        accession_no: form.value.accession_no,
        acquisition_date: form.value.accession_date,
        acquisition_id: 0,
        book_condition: form.value.condition,
        cost: form.value.cost,
        notes: form.value.notes,
        source: form.value.source,
        title: form.value.title,
      };

      bookPurchaseRecords.value.push(newFormValue);

      onSuccess();
    } else {
      Notify.create({
        message: response.data.message,
        position: 'top',
        type: 'negative',
        timeout: 2400,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getAllBookAcquisitions = async () => {
  try {
    const response = await api.get('/get/library/acquisitions', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`,
      },
    });

    bookPurchaseRecords.value = response.data;
  } catch (error) {
    throw error;
  }
};

onMounted(async () => {
  await getAllBookAcquisitions();
});

onBeforeUnmount(() => {
  bookPurchaseRecords.value = [];
})
</script>
