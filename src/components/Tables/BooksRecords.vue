<template>
  <q-table
    bordered
    title="Books Records"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    class="text-capitalize q-pa-md"
    style="max-width: 75vw"
    :pagination="{
      rowsPerPage: 10,
      sortBy: 'name',
    }"
  >
    <template v-slot:top>
      <span class="text-h6">Books Records</span>
      <q-space />
      <q-input
        outlined
        rounded
        dense
        class="text-lowercase"
        color="primary"
        v-model="filter"
        label="Search..."
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-if="filter" v-slot:append>
          <q-icon
            name="cancel"
            @click.stop.prevent="filter = null"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import IOldResources from 'src/models/oldResources';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';

defineComponent({
  name: 'OldResources',
});

const rows = ref<IOldResources[]>([]);
const filter = ref(null);

const columns: unknown = [
  {
    name: 'book id',
    label: 'Book ID',
    required: true,
    align: 'left',
    field: 'book_id',
    format: (val: unknown) => `${val}`,
    sortable: true,
  },
  {
    name: 'author name',
    required: true,
    label: 'Author Name',
    align: 'left',
    field: 'author_name',
    format: (val: unknown) => `${val}`,
    sortable: true,
  },
  {
    name: 'title',
    required: true,
    label: 'Title of the Book',
    align: 'left',
    field: 'title',
    format: (val: unknown) => `${val}`,
    sortable: true,
  },
  {
    name: 'edition',
    required: true,
    label: 'Edition',
    align: 'left',
    field: 'edition',
    format: (val: unknown) => `${val}`,
    sortable: true,
  },
  {
    name: 'publisher name',
    required: true,
    label: 'Author Name',
    align: 'left',
    field: 'publisher_name',
    format: (val: unknown) => `${val}`,
    sortable: true,
  },
  {
    name: 'cost price',
    required: true,
    label: 'Cost Price',
    align: 'left',
    field: 'cost_price',
    format: (val: unknown) => `${val}`,
    sortable: true,
  },
  {
    name: 'copies',
    required: true,
    label: 'Volumes',
    align: 'left',
    field: 'copies',
    format: (val: unknown) => `${val}`,
    sortable: true,
  },
  {
    name: 'borrowed_copies',
    required: true,
    label: 'Available Copies',
    align: 'left',
    field: 'borrowed_copies',
    format: (val: unknown) => `${val}`,
    sortable: true,
  },
];

const fetchResources = async () => {
  try {
    const response = await api.post('/get/all/books/inventory', { limit: 0 }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token') as string}`,
      },
    });

    rows.value = response.data;
  } catch (error) {
    throw error;
  }
};

onMounted(async () => {
  await fetchResources();
});

onBeforeUnmount(() => {
  rows.value = [];
})
</script>
