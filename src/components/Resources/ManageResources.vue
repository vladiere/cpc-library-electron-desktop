<template>
  <q-table
    bordered
    title="Manage Resources"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :pagination="{
      rowsPerPage: 8,
      sortBy: 'name',
    }"
    :filter="filter"
    class="text-capitalize q-pa-md"
  >
    <template v-slot:body-cell-button="{ row, col }">
      <q-td key="button" :props="col.props">
        <q-btn
          icon="edit_square"
          size="md"
          color="green-9"
          flat
          dense
          @click="handleButtonClick('edit', row)"
        >
          <q-tooltip class="bg-grey-9 text-grey-1" :delay="200"
            >edit item</q-tooltip
          >
        </q-btn>
      </q-td>
    </template>
    <template v-slot:top>
      <span class="text-h5 text-bold">Mange Resources</span>
      <q-space />
      <q-input
        class="text-lowercase"
        dense
        debounce="300"
        color="primary"
        v-model="filter"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBookStore } from 'stores/book-store';
import books from 'src/utils/books';

defineComponent({
  name: 'ManageResources',
});

const router = useRouter();
const filter = ref('');

const columns: unknown = ref([
  {
    name: 'button',
    required: true,
    align: 'center',
    label: 'Manage',
    field: 'button',
  },
  {
    name: 'Title of the Book',
    required: true,
    label: 'Title of the Book',
    align: 'left',
    field: 'title',
    sortable: true,
  },
  {
    name: 'Author',
    required: true,
    label: 'Author',
    align: 'left',
    field: 'author_name',
    sortable: true,
  },
  {
    name: 'Edition',
    required: true,
    label: 'Edition',
    align: 'center',
    field: 'edition',
    sortable: true,
  },
  {
    name: 'Publisher',
    required: true,
    label: 'Publisher',
    align: 'left',
    field: 'publisher_name',
    sortable: true,
  },
  {
    name: 'Cost Price',
    required: true,
    label: 'Cost Price',
    align: 'center',
    field: 'cost_price',
    sortable: true,
  },
]);

const rows = ref([]);
const bookStore = useBookStore();

const handleButtonClick = (act: string, row: object) => {
  if (act === 'edit') {
    router.push({
      name: 'Edit Record',
      query: { dataJSON: JSON.stringify(row) },
    });
  }
};

onMounted(async () => {
  await books.getAllContributorsBooks();
  rows.value = await bookStore.getBooks;
});

</script>
