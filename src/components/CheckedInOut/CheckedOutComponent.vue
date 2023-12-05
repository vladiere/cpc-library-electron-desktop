<template>
  <q-table
    bordered
    :loading="isLoading"
    :rows="rows"
    :columns="columns"
    dense
    row-key="pending_transaction_id"
    class="text-capitalize"
    :filter="filter"
    :pagination="{
      rowsPerPage: 20,
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
    <template v-slot:body-cell-button="{ row, col }">
      <q-td key="button" :props="col.props">
        <q-btn icon="shopping_cart_checkout" :loading="isLoading" flat no-caps dense round size="15px" color="positive" @click="handleClick(row.transaction_id, 'Active')">
          <q-tooltip :delay="300" class="bg-grey-10 text-grey-2">
            Checked Out
          </q-tooltip>
        </q-btn>
        <q-btn icon="mdi-cancel" :loading="isLoading" flat no-caps dense round size="15px" color="negative" @click="handleClick(row.transaction_id, 'Cancelled')">
          <q-tooltip :delay="300" class="bg-grey-10 text-grey-2">
            Cancel
          </q-tooltip>
        </q-btn>
      </q-td>
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
    name: 'transaction_type',
    label: 'Transaction Type',
    field: 'transaction_type',
    align: 'left',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
    sortable: true,
  },
  {
    name: 'transaction_date',
    label: 'Request Date',
    field: 'transaction_date',
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
    name: 'button',
    label: 'Action',
    align: 'center',
    field: 'button'
  },
];

const rows = ref([]);

const getAllApprovedReservation = debounce(async () => {
  try {
      const response = await api.post('/transaction/book/all', {
        option: 'Checked Out',
        transaction_status: 'Completed',
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
    setTimeout(() => {
      isLoading.value = false;
    }, 1800);
  }
}, 1500);

const checkoutCirculation = debounce(async (transaction_id: number, option: string) => {
  try {
    const response = await api.post('/transaction/book/check_return', { transaction_id: transaction_id, transaction_type: 'Checked Out', transaction_status: option, fee: 'Other' }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });

    if (response.status === 200) {
      await getAllApprovedReservation();
      await socket.emit('notifications', transaction_id);

      if (response.data.status === 200 | 201) {
        Notify.create({
          message: 'Mark as checked out',
          position: 'top',
          progress: true,
          type: 'positive',
          timeout: 2300,
        });
      } else {
        Notify.create({
          message: response.data.message,
          position: 'top',
          progress: true,
          type: 'warning',
          timeout: 2300,
        });
      }
    }
  } catch (error) {
    throw error;
  } finally {

  }
}, 500);

const handleClick = async (transaction_id: number, option: string) => {
  try {
    isLoading.value = true;
    await checkoutCirculation(transaction_id,option);
  } catch (error) {
    throw error;
  }
}

onMounted( async () => {
  isLoading.value = true;
  await getAllApprovedReservation();
});

onBeforeMount(() => {
  rows.value = [];
})
</script>
