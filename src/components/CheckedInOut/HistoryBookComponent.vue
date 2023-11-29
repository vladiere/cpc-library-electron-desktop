<template>
  <q-table
    bordered
    :rows="rows"
    :loading="isLoading"
    :columns="columns"
    row-key="pending_transaction_id"
    class="text-capitalize"
    :filter="filter"
    :pagination="{
      rowsPerPage: 7,
      sortBy: 'pending_transaction_id',
    }"
  >
    <template v-slot:top>
       <q-input
          square
          outlined
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          placeholder="Search..."
        >
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
    </template>
  </q-table>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { api } from 'src/boot/axios'
import { LocalStorage, debounce } from 'quasar'

const filter = ref('');
const isLoading = ref(false);

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
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
    sortable: true,
  },
  {
    name: 'last_date',
    label: 'Date',
    field: 'last_date',
    align: 'left',
    sortable: true,
  },
];

const rows = ref([]);

const getAllCheckedOutReservation = debounce(async () => {
  try {
      const response = await api.post('/transaction/book/all', {
        option: 'Returned',
        transaction_status: 'all'
      }, {
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
  await getAllCheckedOutReservation();
});

onBeforeMount(() => {
  rows.value = [];
})
</script>
