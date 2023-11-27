<template>
  <q-table
    title="Book Catalog"
    class="text-capitalize"
    style="max-height: calc(100vh - 260px)"
    :rows="$props.rowsObject"
    :columns="columns"
    row-key="name"
    :filter="filter"
    flat
  >
    <template v-slot:top>
      <span class="text-h6">Book Catalog</span>
      <q-space />
      <q-input v-model="filter" borderless label="Search Catalog">
        <template v-slot:after>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const columns: unknown = [
  {
    name: 'accession_no',
    label: 'Accession No.',
    align: 'center',
    required: true,
    field: 'accession_no',
    sortable: true,
  },
  {
    name: 'book_subject',
    label: 'Book Subject',
    align: 'left',
    required: true,
    field: 'book_subject',
    sortable: true,
  },
  {
    name: 'title',
    label: 'Title of the book',
    align: 'center',
    required: true,
    field: 'title',
    sortable: true,
  },
  {
    name: 'ddc_code',
    label: 'DDC Code',
    align: 'center',
    required: true,
    field: 'ddc_code',
    sortable: true,
  },
  {
    name: 'created',
    label: 'Created',
    align: 'center',
    required: true,
    field: 'created',
    sortable: true,
  },
];
const filter = ref('');

export interface BookSubjectProps {
  rowsObject: object | unknown;
}

withDefaults(defineProps<BookSubjectProps>(), {
  rowsObject: Object || [],
});
</script>
