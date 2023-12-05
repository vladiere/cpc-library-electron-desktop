<template>
  <q-table
    bordered
    :loading="isLoading"
    :rows="rows"
    :columns="columns"
    row-key="pending_transaction_id"
    dense
    class="text-capitalize"
    :filter="filter"
    :pagination="{
      rowsPerPage: 20,
      sortBy: 'approve_date',
    }"
  >
    <template v-slot:top>
      <q-input
        outlined
        dense
        v-model="filter"
        placeholder="Search..."
      >
        <template v-slot:append>
          <q-icon :name="!filter ? 'mdi-magnify' : 'mdi-close-circle'" @click="filter = ''" class="cursor-pointer"/>
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { api } from 'src/boot/axios'
import { LocalStorage, debounce, Notify } from 'quasar'
import { socket } from 'src/utils/socket';

const filter = ref('');
const isLoading = ref(false);
const rows = ref([]);

const columns = [
  {
    name: 'title',
    required: true,
    label: 'Book Title',
    align: 'left',
    field: 'title',
    sortable: true,
  },
  {
    name: 'author_name',
    align: 'center',
    label: 'Author Name',
    field: 'author_name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'fullname',
    align: 'center',
    label: 'Fullname',
    field: 'fullname',
    align: 'left',
    sortable: true,
  },
  {
    name: 'department',
    align: 'center',
    label: 'Department',
    field: 'department',
    sortable: true,
    style: 'text-transform: uppercase'
  },
  {
    name: 'role',
    label: 'Role',
    field: 'role',
    align: 'left',
    sortable: true
  },
  {
    name: 'hold_status',
    label: 'Status',
    field: 'hold_status',
    align: 'left',
    sortable: true,
  },
  {
    name: 'requested_date',
    label: 'Date Hold',
    field: 'requested_date',
    align: 'left',
    sortable: true,
  },
  {
    name: 'approve_date',
    label: 'Approved at',
    field: 'approve_date',
    align: 'left',
    sortable: true,
  },
];


const getAllHoldsRecords = debounce(async () => {
  try {
      const response = await api.get('/holds/records', {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`
        }
      });
      if (response.data) {
        rows.value = [];
        rows.value = response.data
      }
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}, 1500);

onMounted( async () => {
  isLoading.value = true;
  await getAllHoldsRecords();
});

onBeforeMount(() => {
  rows.value = [];
})
</script>
