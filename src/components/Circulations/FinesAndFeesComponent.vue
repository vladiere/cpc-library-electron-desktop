<template>
  <q-table
    bordered
    :rows="rows"
    dense
    :columns="columns"
    row-key="name"
    :filter="filter || search"
    :pagination="{
      rowsPerPage: 20,
      sortBy: 'name',
    }"
  >
    <template v-slot:body-cell-total_fines_and_fees="props">
      <q-td :key="col" :props="props">
        {{ addCommas(props.row.total_fines_and_fees) }}
      </q-td>
    </template>

    <template v-slot:top>
      <div class="row q-gutter-x-md">
        <span class="text-h6 text-bold q-pr-md">Fines and Fees</span>
        <q-btn-dropdown no-caps dense flat label="Department" dropdown-icon="mdi-chevron-down">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>All</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Videos</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Articles</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <q-space />
      <div class="row q-gutter-x-md">
      <q-input
        outlined
        rounded
        dense
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
import { useCirculationStore } from 'stores/circulation-store';

defineComponent({
  name: 'FinesAndFees',
});

const filter = ref('');
const search = ref('');
const selected = ref([]);
const circulationStore = useCirculationStore();

const columns = [
  {
    name: 'fullname',
    required: true,
    label: 'Fullname',
    align: 'left',
    field: 'fullname',
    sortable: true,
    style: 'text-transform: capitalize',
  },
  {
    name: 'department',
    align: 'left',
    label: 'Department',
    field: 'department',
    sortable: true,
    style: 'text-transform: uppercase',
  },
  {
    name: 'role',
    label: 'Role',
    field: 'role',
    align: 'left',
    sortable: true,
    style: 'text-transform: capitalize',
  },
  {
    name: 'title',
    label: 'Book Title',
    field: 'title',
    align: 'left',
    sortable: true,
    style: 'text-transform: capitalize',
  },
  {
    name: 'due_date',
    label: 'Due Date',
    field: 'due_date',
    align: 'left',
    sortable: true,
    style: 'text-transform: capitalize',
  },
  {
    name: 'total_fines_and_fees',
    label: 'Fine amount',
    field: 'total_fines_and_fees',
    align: 'center',
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
    sortable: true,
    style: 'text-transform: capitalize',
  },
];

const rows = ref([]);
const addCommas = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

onMounted(() => {
  rows.value = circulationStore.getFinesFees;
  console.log(circulationStore.getFinesFees);
});
</script>
