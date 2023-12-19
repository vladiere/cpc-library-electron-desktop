<template>
  <q-table
    bordered
    title="Books Records"
    :rows="rows"
    :columns="columns"
    row-key="name"
    dense
    :filter="filter"
    :loading="isLoading"
    class="text-capitalize q-pa-md"
    style="max-width: 100%"
    separator="vertical"
    :pagination="{
      rowsPerPage: 20,
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
        <template v-slot:append>
          <q-icon
            :name="filter ? 'cancel' : 'search'"
            @click.stop.prevent="filter = null"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import IOldResources from 'src/models/oldResources';
import { useBookStore } from 'stores/book-store';

defineComponent({
  name: 'OldResources',
});

const rows = ref<IOldResources[]>([]);
const filter = ref(null);
const bookStore = useBookStore();
const isLoading = ref(false);

const columns: unknown = [
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
    label: 'Publisher Name',
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

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    rows.value = bookStore.getBooks;
  }, 1200);
});
</script>
