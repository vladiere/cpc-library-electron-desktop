<template>
  <q-table
    bordered
    :rows="rows"
    :columns="columns"
    class="text-capitalize"
    row-key="name"
    :filter="filter"
    :pagination="{
      rowsPerPage: 7,
      sortBy: 'name',
    }"
  >
    <template v-slot:top>
      <span class="text-h6 text-bold q-pr-md">Fines and Fees</span>
      <q-space />
      <div class="row q-gutter-x-md">
      <q-btn
        text-color="grey-10"
        rounded
        flat
        label="Remind All"
        size="md"
        @click="handleClick(selected)"
      />
      <q-input
        borderless
        placeholder="Search..."
        v-model="filter"
      >
        <template v-slot:after>
          <q-icon name="mdi-magnify"/>
        </template>
      </q-input>
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';

defineComponent({
  name: 'FinesAndFees',
});

const filter = ref('');
const selected = ref([]);

const columns = [
  {
    name: 'fullname',
    required: true,
    label: 'Fullname',
    align: 'left',
    field: 'fullname',
    sortable: true,
  },
  {
    name: 'department',
    align: 'left',
    label: 'Department',
    field: 'department',
    sortable: true,
  },
  {
    name: 'role',
    label: 'Role',
    field: 'role',
    align: 'left',
    sortable: true,
  },
  {
    name: 'title',
    label: 'Book Title',
    field: 'title',
    align: 'left',
    sortable: true,
  },
  {
    name: 'due_date',
    label: 'Due Date',
    field: 'due_date',
    align: 'left',
    sortable: true,
  },
  {
    name: 'total_fines_and_fees',
    label: 'Fine amount',
    field: 'total_fines_and_fees',
    align: 'left',
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
    sortable: true,
  },
];

const rows = ref([])

const handleClick = (items: object) => {
  console.log(items);
};

const getAllFinesFeesSummary = async () => {
  try {
    const response = await api.get('/transaction/fines_fees/summary', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });
    if (response.data) {
      rows.value = [];
      rows.value = response.data;
    }
  } catch (error) {
    throw error;
  }
}

onMounted( async () => {
  await getAllFinesFeesSummary();
});
</script>
