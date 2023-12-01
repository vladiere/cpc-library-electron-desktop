<template>
  <q-table
    bordered
    :rows="rows"
    :loading="isLoading"
    :columns="columns"
    row-key="pending_transaction_id"
    class="text-capitalize"
    :filter="filter || filterCategory"
    :pagination="{
      rowsPerPage: 7,
      sortBy: 'pending_transaction_id',
    }"
  >
    <template v-slot:top>
      <q-input
        square
        dense
        debounce="300"
        color="primary"
        v-model="filter"
        placeholder="Search..."
      >
        <template v-slot:append>
          <q-icon :name="filter ? 'mdi-close-circle' : 'mdi-magnify'" @click="filter = null" class="cursor-pointer" />
        </template>
      </q-input>

      <q-btn-dropdown flat no-caps label="Date" dropdown-icon="mdi-chevron-down">
        <q-list separator style="max-height: 35vh">
          <q-item clickable v-close-popup @click="filterCategory = ''">
            <q-item-section>
              <q-item-label>All</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-for="month in categories" :key="month" clickable v-close-popup @click="filterCategory = month">
            <q-item-section>
              <q-item-label class="text-capitalize">{{ month }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-table>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { api } from 'src/boot/axios'
import { LocalStorage, debounce } from 'quasar'

const filter = ref('');
const isLoading = ref(false);
const categories = ref(['january','febuary','march','april','may','june','july','august','september','november','december']);
const filterCategory = ref('');
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
    style: 'text-transform: uppercase',
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
