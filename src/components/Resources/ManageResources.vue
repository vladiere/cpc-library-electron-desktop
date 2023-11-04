<template>
  <q-table
    bordered
    title="Manage Resources"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :pagination="{
      rowsPerPage: 10,
      sortBy: 'name',
    }"
    :filter="filter"
    class="text-capitalize q-pa-md"
  >
    <template v-slot:body-cell-button="{ row, col }">
      <q-td key="button" :props="col.props">
        <q-btn
          icon="delete"
          size="md"
          color="red-9"
          flat
          dense
          @click="handleButtonClick('delete', row)"
        >
          <q-tooltip class="bg-grey-9 text-grey-1" :delay="200"
            >remove item</q-tooltip
          >
        </q-btn>
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
import { SessionStorage, Loading } from 'quasar';
import { api } from 'src/boot/axios';
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { SpinnerIos } from 'src/utils/loading'

defineComponent({
  name: 'ManageResources',
});

const router = useRouter();
const loading = ref(false);
const filter = ref('');

const columns: any = ref([
  {
    name: 'button',
    required: true,
    align: 'center',
    label: 'Manage',
    field: 'button',
  },
  {
    name: 'Accession No.',
    required: true,
    label: 'Accession No.',
    align: 'center',
    field: 'accession_no',
    sortable: true,
  },
  {
    name: 'Date Received',
    required: true,
    label: 'Date Received',
    align: 'left',
    field: 'date_received',
    sortable: true,
  },
  {
    name: 'Author',
    required: true,
    label: 'Author',
    align: 'left',
    field: 'author',
    sortable: true,
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
    name: 'Edition',
    required: true,
    label: 'Edition',
    align: 'center',
    field: 'edition',
    sortable: true,
  },
  {
    name: 'Volumes',
    required: true,
    label: 'Volumes',
    align: 'center',
    field: 'volumes',
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
  {
    name: 'Publisher',
    required: true,
    label: 'Publisher',
    align: 'left',
    field: 'publisher_name',
    sortable: true,
  },
  {
    name: 'Copyright Yr.',
    required: true,
    label: 'Copyright Yr.',
    align: 'center',
    field: 'copyright_yr',
    sortable: true,
  },
  {
    name: 'Remarks',
    required: true,
    label: 'Remarks',
    align: 'left',
    field: 'remarks',
    sortable: true,
  },
]);

const rows = ref([]);

const handleButtonClick = (act: string, row: object) => {
  if (act === 'edit') {
    router.push({
      name: 'Edit Record',
      query: { dataJSON: JSON.stringify(row) },
    });
  }
};

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await api.get('/get/all/books', {
      headers: {
        Authorization: `Bearer ${SessionStorage.getItem('token') as string}`,
      },
    });

    rows.value = response.data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error);
  }
};

onMounted(() => {
  SpinnerIos(2300, 'Loading...');
  fetchData();
});

onBeforeUnmount(() => {
  rows.value = [];
})
</script>
