<template>
  <q-table
    bordered
    title="Books Records"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    separator="vertical"
    class="text-capitalize q-pa-md"
    style="max-width: 100%"
    :pagination="{
      rowsPerPage: 10,
      sortBy: 'name',
    }"
  >
    <template v-slot:top>
      <span class="text-h6">eBooks Records</span>
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
import { useBookStore } from 'stores/book-store';


defineComponent({
  name: 'EbooksRecords'
});

const rows = ref([])
const filter = ref(null);
const bookStore = useBookStore();

const columns: unknown = [
  {
    name: 'author fullname',
    required: true,
    label: 'Author Name',
    align: 'left',
    field: 'author_fullname',
    sortable: true,
  },
  {
    name: 'file_title',
    required: true,
    label: 'eBook Title',
    align: 'left',
    field: 'file_title',
    sortable: true,
  },
  {
    name: 'category_name',
    required: true,
    label: 'Category',
    align: 'left',
    field: 'category_name',
    sortable: true,
  },
  {
    name: 'publisher name',
    required: true,
    label: 'Publisher Name',
    align: 'left',
    field: 'publisher_name',
    sortable: true,
  },
  {
    name: 'fullname',
    required: true,
    label: 'Contributor Name',
    align: 'left',
    field: 'fullname',
    sortable: true,
  },
  {
    name: 'department',
    required: true,
    label: 'Department',
    align: 'left',
    field: 'department',
    sortable: true,
    style: 'text-transform: uppercase',
  },
  {
    name: 'file_total_downloads',
    required: true,
    label: 'Total Downloads',
    align: 'left',
    field: 'file_total_downloads',
    sortable: true,
  },
];

onMounted(async () => {
  rows.value = await bookStore.getEbooks;
});

</script>
