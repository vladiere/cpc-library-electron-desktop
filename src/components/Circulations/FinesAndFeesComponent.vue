<template>
  <q-table
    bordered
    :rows="rows"
    dense
    :columns="columns"
    row-key="name"
    :filter="filter || search || fees"
    :pagination="{
      rowsPerPage: 20,
      sortBy: 'name',
    }"
  >
    <template v-slot:body-cell-total_fines_and_fees="props">
      <q-td :key="props" :props="props">
        {{ addCommas(props.row.total_fines_and_fees) }}
      </q-td>
    </template>

    <template v-slot:body-cell-fine_type="props">
      <q-td :key="props" :props="props">
        {{ props.row.fine_type === 'Other' ? 'Not yet' : props.row.fine_type }}
      </q-td>
    </template>

    <template v-slot:top>
      <div class="row q-gutter-x-md">
        <span class="text-h6 text-bold q-pr-md">Fines and Fees</span>

        <q-btn-dropdown no-caps dense flat label="Department" dropdown-icon="mdi-chevron-down">
          <q-list dense separator>
            <q-item clickable v-close-popup @click="search = ''">
              <q-item-section>
                <q-item-label>All</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-for="item in departments" :key="item" clickable v-close-popup @click="search = item">
              <q-item-section>
                <q-item-label class="text-uppercase">{{ item }}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown no-caps dense flat label="Fee type" dropdown-icon="mdi-chevron-down">
          <q-list dense separator>
            <q-item clickable v-close-popup @click="fees = ''">
              <q-item-section>
                <q-item-label>All</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-for="item in feeTypes" :key="item" clickable v-close-popup @click="fees = item">
              <q-item-section>
                <q-item-label class="text-uppercase">{{ item }}</q-item-label>
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
        @blur="filter = ''"
        placeholder="Search..."
        v-model="filter"
      >
        <template v-slot:append>
          <q-icon :name="filter === '' ? 'mdi-magnify' : 'mdi-close-circle'" class="cursor-pointer" @click="filter = ''"/>
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
const departments = ref([]);
const feeTypes = ref([]);
const fees = ref('')

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
    name: 'fine_type',
    label: 'Fee type',
    field: 'fine_type',
    align: 'left',
    sortable: true,
    style: 'text-transform: capitalize',
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

  rows.value.map((item) => {
    const index = departments.value.indexOf(item.department);
    if (index === -1) departments.value.push(item.department);

    const newIndex = feeTypes.value.indexOf(item.fine_type);
    if (newIndex === -1) feeTypes.value.push(item.fine_type);

  })
});
</script>
