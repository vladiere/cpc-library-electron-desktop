<template>
  <q-table
     title="Treats"
     :rows="rows"
     :columns="columns"
     row-key="name"
  >
    <template v-slot:top>
      <q-input
        outlined
        rounded
        v-model="filter"
        dense
      >
        <template v-slot:append>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const filter = ref('');

  const columns: unknown = [
  {
    name: 'fullname',
    label: 'Fullname',
    align: 'center',
    required: true,
    field: 'fullname',
    sortable: true,
  },
  {
    name: 'department',
    label: 'Department',
    align: 'center',
    required: true,
    field: 'department',
    sortable: true,
  },
  {
    name: 'file_title',
    label: 'Book Title',
    align: 'left',
    required: true,
    field: 'file_title',
    sortable: true,
  },
  {
    name: 'author_fullname',
    label: 'Author',
    align: 'center',
    required: true,
    field: 'author_fullname',
    sortable: true,
  },
  {
    name: 'category_name',
    label: 'Category',
    align: 'center',
    required: true,
    field: 'category_name',
    sortable: true,
  },
  {
    name: 'publisher',
    label: 'Publisher',
    align: 'center',
    required: true,
    field: 'publisher_name',
    sortable: true,
  },
  {
    name: 'publisher',
    label: 'Publisher',
    align: 'center',
    required: true,
    field: 'publisher_name',
    sortable: true,
  },
  {
    name: 'uploaded_date',
    label: 'Upload Date',
    align: 'center',
    required: true,
    field: 'uploaded_date',
    sortable: true,
  },
];

  export interface HistoryContributionProps {
    rows: object
  }

  withDefaults(defineProps<HistoryContributionProps>(), {
    rows: Object || []
  })
</script>
