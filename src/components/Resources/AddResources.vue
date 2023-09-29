<template>
  <div class="column text-capitalize q-gutter-y-md">
    <div class="row text-h5 self-center q-gutter-x-sm">
      add new resources
      <span class="text-caption"
        >We require a minimum set of fields to create a new record. These are
        those fields.</span
      >
    </div>
    <div class="row">
      <q-btn
        flat
        label="Bulk Upload"
        square
        icon="upload"
        :to="{ name: 'Bulk Upload' }"
      >
        <q-tooltip class="bg-grey-7 text-grey-1" :delay="200"
          >Bulk Upload with your excel file</q-tooltip
        >
      </q-btn>
    </div>
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Volume Copy"
      v-model="addBook.volumes"
      min="0"
      type="number"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Accesion No."
      v-model="addBook.accession_no"
      lazy-rules
      :rules="[(val) => regex.test(val)]"
      error-message="Numbers only"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      type="date"
      label="Date Received"
      v-model="addBook.date_received"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Author"
      v-model="addBook.author"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Book Title"
      v-model="addBook.title"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Edition"
      v-model="addBook.edition"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Publisher"
      v-model="addBook.publisher"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Cost Price"
      v-model="addBook.cost_price"
      type="number"
      min="0"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Copyright Year"
      v-model="addBook.copyright_yr"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Remarks(Leave empty if no remarks)"
      autogrow
      v-model="addBook.remarks"
    />
    <q-file
      standout="bg-light-blue-10 text-grey-4"
      bottom-slots
      v-model="forImage"
      label="Book Image(Just Leave it Default if there's no image)"
      counter
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
    <div class="flex flex-center">
      <q-btn label="Add Record" color="primary" rounded />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';

// import { useQuasar } from 'quasar';

defineComponent({
  name: 'AddResources',
});

const forImage = ref();
const addBook = ref({
  accession_no: 0,
  image: '',
  date_received: '',
  author: '',
  title: '',
  edition: '',
  volumes: 0,
  cost_price: 0,
  publisher: '',
  copyright_yr: '',
  remarks: '',
});

// const $q = useQuasar();
// const userStore = useUserStore();
const temp = ref<number[]>([]);
const regex = /^[0-9,\s]*$/;

// const handleAddRecord = async () => {
//   try {
//     const response = await api.post(
//       'add/single/records',
//       {
//         records: addBook.value,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userStore.token}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     $q.notify({
//       message: response.data.data.result[0][0],
//       color: 'positive',
//       position: 'center',
//     });

//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// };

watchEffect(() => {
  const currentVolume = addBook.value.volumes;
  const currentLength = temp.value.length;

  if (currentVolume > currentLength) {
    const numberOfNewItems = addBook.value.volumes - temp.value.length;
    for (let i = 0; i < numberOfNewItems; i++) {
      temp.value.push(1);
    }
  } else if (currentVolume < currentLength) {
    // Decrease the temp array by removing the last items
    const numberOfItemsToRemove = currentLength - currentVolume;
    for (let i = 0; i < numberOfItemsToRemove; i++) {
      temp.value.pop();
    }
  }
});
</script>
