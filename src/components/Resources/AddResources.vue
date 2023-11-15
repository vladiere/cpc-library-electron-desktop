<template>
  <div class="column q-gutter-y-md">
    <div class="row text-h5 self-center text-capitalize q-gutter-x-sm">
      add new resources
      <span class="text-caption"
        >We require a minimum set of fields to create a new record. These are
        those fields.</span
      >
    </div>
    <div class="column q-gutter-y-md">
      <q-btn
        flat
        label="Bulk Upload"
        class="self-start"
        icon="upload"
        :to="{ name: 'Bulk Upload' }"
      >
        <q-tooltip class="bg-grey-7 text-grey-1" :delay="200"
          >Bulk Upload with your excel file</q-tooltip
        >
      </q-btn>
      <div class="self-start text-body">
        <span class="text-negative text-weight-bold">NOTE:</span> For single
        book only
      </div>
    </div>
    <q-form
      class="col column q-gutter-y-sm"
      greedy
      @submit.prevent="handleAddRecord"
    >
      <q-input
        outlined
        label="Accesion No."
        v-model="form.accession_no"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Enter Book Accession Number',
        ]"
        type="number"
      />
      <q-input
        class="col"
        outlined
        v-model="form.date_received"
        label="Date Received"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Enter the date received',
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
              <q-date v-model="form.date_received" mask="ddd MMM DD YYYY">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        outlined
        label="Author"
        v-model="form.author"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Enter Book author']"
      />
      <q-input
        outlined
        label="Book Title"
        v-model="form.title_of_the_book"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Enter Book title']"
      />
      <q-input
        outlined
        label="Edition"
        v-model="form.edition"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Enter Book edition']"
      />
      <q-input
        outlined
        label="Publisher"
        v-model="form.publisher"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Enter Book publisher']"
      />
      <q-input
        outlined
        label="Cost Price"
        v-model="form.cost_price"
        type="number"
        min="0"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Enter Book cost value']"
      />
      <q-input
        outlined
        label="Copyright Year"
        v-model="form.copyright_yr"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Enter Book copyright year',
        ]"
      />
      <q-input
        outlined
        label="Remarks(Leave empty if no remarks)"
        autogrow
        v-model="form.remarks"
      />
      <q-file
        outlined
        bottom-slots
        v-model="forImage"
        label="Book Image(Just Leave it Default if there's no image)"
        counter
        accept="image/*"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop.prevent="forImage = null"
            class="cursor-pointer"
          />
        </template>
      </q-file>

      <q-btn
        label="Add Record"
        class="self-center"
        color="primary"
        type="submit"
        rounded
      />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { Notify, LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';
import isValidDate from 'src/functions/isValidDate';
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'AddResources',
});

const forImage = ref(null);
const form = ref({
  accession_no: null,
  image: '',
  date_received: '',
  author: '',
  title_of_the_book: '',
  edition: '',
  cost_price: null,
  publisher: '',
  copyright_yr: '',
  remarks: '',
});

const handleAddRecord = async () => {
  try {
    const formData = new FormData();
    formData.append('file_img', forImage.value);
    formData.append('accession_no', form.value.accession_no);
    formData.append('date_received', form.value.date_received);
    formData.append('author', form.value.author);
    formData.append('title_of_the_book', form.value.title_of_the_book);
    formData.append('edition', form.value.edition);
    formData.append('cost_price', form.value.cost_price);
    formData.append('publisher', form.value.publisher);
    formData.append('copyright_yr', form.value.copyright_yr);
    formData.append('remarks', form.value.remarks);

    const response = await api.post( 'add/book/record', formData, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.status_code === 409) {
      Notify.create({
        message: response.data.data.message,
        color: 'negative',
        position: 'top',
        timeout: 2400,
      });
    } else {
      Notify.create({
        message: response.data.data.message,
        color: 'positive',
        position: 'center',
      });
    }
  } catch (error) {
    throw error;
  }
};
</script>
