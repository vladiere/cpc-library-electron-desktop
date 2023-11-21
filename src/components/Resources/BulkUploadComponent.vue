<template>
  <q-table
    title="Accession Records"
    :rows="rows"
    :filter="filter"
    dense
    :pagination="{
      sortBy: 'name',
      rowsPerPage: 10,
    }"
    :columns="columns"
    row-key="name"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:top-left>
      <div class="row q-gutter-x-md">
        <span class="text-h6">Accession Records</span>
        <q-btn
          :color="onSuccess ? 'positive' : 'primary'"
          rounded
          :label="onSuccess ? 'Uploaded' : 'Add Records'"
          no-caps
          @click="handleClick"
          :disable="onSuccess"
          :loading="loading"
        >
          <q-tooltip class="bg-grey-8 text-grey-1" :delay="300"
            >Add all records</q-tooltip
          >
        </q-btn>
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';
import { Notify, LocalStorage } from 'quasar';

export interface BulkUploadProps {
  data: object;
}

const dataProps = defineProps<BulkUploadProps>();
const filter = ref('');
const dataToSend = ref<unknown[]>([]);
const onSuccess = ref(false);
const loading = ref(false);
const rows = ref<string[][]>([]);

const columns: unknown = ref([
  {
    name: 'Accession No.',
    required: true,
    label: 'Accession No.',
    align: 'center',
    field: 'Accession No',
    sortable: true,
  },
  {
    name: 'Date Received',
    required: true,
    label: 'Date Received',
    align: 'left',
    field: 'Date Received',
    sortable: true,
  },
  {
    name: 'Author',
    required: true,
    label: 'Author',
    align: 'left',
    field: 'Author',
    sortable: true,
  },
  {
    name: 'Title of the Book',
    required: true,
    label: 'Title of the Book',
    align: 'left',
    field: 'Title of the Book',
    sortable: true,
  },
  {
    name: 'Edition',
    required: true,
    label: 'Edition',
    align: 'center',
    field: 'Edition',
    sortable: true,
  },
  {
    name: 'Volumes',
    required: true,
    label: 'Volumes',
    align: 'center',
    field: 'Volumes',
    sortable: true,
  },
  {
    name: 'Cost Price',
    required: true,
    label: 'Cost Price',
    align: 'center',
    field: 'Cost Price',
    sortable: true,
  },
  {
    name: 'Publisher',
    required: true,
    label: 'Publisher',
    align: 'left',
    field: 'Publisher',
    sortable: true,
  },
  {
    name: 'Copyright Yr.',
    required: true,
    label: 'Copyright Yr.',
    align: 'center',
    field: 'Copyright Yr',
    sortable: true,
  },
  {
    name: 'Remarks',
    required: true,
    label: 'Remarks',
    align: 'left',
    field: 'Remarks',
    sortable: true,
  },
]);

const handleClick = async () => {
  loading.value = true;

  try {
    const response = await api.post(
      'upload/bulk/record',
      { jsonRecords: JSON.stringify(dataToSend.value).toLowerCase() },
      {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Uploaded Clicked')
    console.log(response.data);

    Notify.create({
      message: 'Successfully insert records',
      position: 'top',
      type: 'positive',
      timeout: 2500,
    });

    onSuccess.value = true;
    loading.value = false;
  } catch (error: unknown) {
    throw new Error(error.message);
  }
};

onMounted( async() => {
  // Initialize a variable to store the previous values of columns
  const previousValues: unknown = {};

  const sortedData: unknown[] = [];

  if (Array.isArray(dataProps.data)) {
    rows.value = dataProps.data.map((item: unknown) => {
      const row: unknown = {};

      columns.value.forEach((col: unknown) => {
        if (
          item.hasOwnProperty(col.field) &&
          item[col.field] !== null &&
          item[col.field] !== undefined
        ) {
          let cellValue = item[col.field];

          if (cellValue === '"') {
            cellValue = previousValues[col.field] || '';
          } else if (col.field === 'Date Received' && !isNaN(cellValue)) {
            const excelDate = parseInt(cellValue);
            const jsDate = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
            cellValue = jsDate.toDateString();
          } else {
            cellValue = cellValue.toString();
          }
          row[col.field] = cellValue;

          previousValues[col.field] = cellValue;
        } else if (previousValues.hasOwnProperty(col.field)) {
          if (item[col.field] === '"') {
            row[col.field] = previousValues[col.field] || '';
          } else {
            row[col.field] = '';
          }
        } else {
          row[col.field] = '';
        }
      });

      sortedData.push(row);
      return row;
    });
  }

  dataToSend.value = sortedData;
});
</script>
