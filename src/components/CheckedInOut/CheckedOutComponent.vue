<template>
  <q-table
    bordered
    :rows="rows"
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
    <template v-slot:body-cell-button="{ row, col }">
      <q-td key="button" :props="col.props">
        <q-icon name="shopping_cart_checkout" size="2em" class="cursor-pointer" color="positive" @click="handleClick(row.transaction_id, 'Active')">
          <q-tooltip :delay="300" class="bg-grey-10 text-grey-2">
            Checked Out
          </q-tooltip>
        </q-icon>
        <q-icon name="mdi-cancel" size="2em" class="cursor-pointer" color="negative" @click="handleClick(row.transaction_id, 'Cancelled')">
          <q-tooltip :delay="300" class="bg-grey-10 text-grey-2">
            Cancel
          </q-tooltip>
        </q-icon>
      </q-td>
    </template>
  </q-table>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { api } from 'src/boot/axios'
import { SessionStorage, Notify } from 'quasar'
import { useUserStore } from 'src/stores/user-store';
import { socket } from 'src/utils/socket';

const filter = ref('');

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

const getAllApprovedReservation = async () => {
  try {
      const response = await api.post('/transaction/book/all', {
        option: 'Checked Out',
        transaction_status: 'Completed'
      }, {
        headers: {
          Authorization: `Bearer ${SessionStorage.getItem('token')}`
        }
      });
      if (response.data) {
        rows.value = [];
        rows.value = response.data
      }
  } catch (error) {
    throw error;
  }
}

const handleClick = async (transaction_id: number, option: string) => {
  try {
    const response = await api.post("/transaction/book/check_return", { transaction_id: transaction_id, transaction_type: 'Checked Out', transaction_status: option }, {
      headers: {
        Authorization: `Bearer ${SessionStorage.getItem('token')}`
      }
    });
    getAllApprovedReservation();
    socket.emit("notifications", transaction_id);
    Notify.create({
      message: response.data.message,
      position: 'top-right',
      timeout: 2300,
    });
  } catch (error) {
    throw error;
  }
}

onMounted(() => {
  getAllApprovedReservation();
});

onBeforeMount(() => {
  rows.value = [];
})
</script>
