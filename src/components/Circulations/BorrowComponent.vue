<template>
  <q-table
    bordered
    :rows="rows"
    class="text-capitalize"
    :columns="columns"
    selection="multiple"
    :selected-rows-label="getSelectedString"
    v-model:selected="selected"
    row-key="pending_transaction_id"
    :filter="filter"
    :pagination="{
      rowsPerPage: 7,
      sortBy: 'name',
    }"
  >
    <template v-slot:top>
      <span class="text-h6 text-bold q-pr-md">Borrows</span>
      <q-space />
      <div class="row q-gutter-x-md">
        <q-btn
          v-if="selected.length > 0"
          color="blue-9"
          text-color="grey-2"
          dense
          no-caps
          :label="selected.length === 1 ? 'Accept' : 'Accept All'"
          @click="handleClick('accept', selected)"
        />
        <q-btn
          v-if="selected.length > 0"
          color="red"
          text-color="grey-2"
          dense
          no-caps
          :label="selected.length === 1 ? 'Cancel' : 'Cancel All'"
          @click="handleClick('cancel', selected)"
        />
        <q-input
          square
          outlined
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:prepend>
            <q-icon name="person_search" />
          </template>
        </q-input>
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'src/boot/axios'
import { SessionStorage, Notify } from 'quasar'
import { socket } from 'src/utils/socket';

defineComponent({
  name: 'BorrowComponent',
});

const filter = ref('');
const selected = ref([]);

interface PendingTransactions {
  pending_transaction_id: number;
  title: string;
  fullname: string;
  transaction_type: string;
  status: string;
  request_date: string;
  approve_date: string;
}

const columns = [
  {
    name: 'book',
    required: true,
    label: 'Book',
    align: 'left',
    field: 'title',
    sortable: true,
  },
  {
    name: 'fullname',
    align: 'center',
    label: 'Fullname',
    field: 'fullname',
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
    name: 'request_date',
    label: 'Request Date',
    field: 'request_date',
    align: 'left',
    sortable: true,
  },
  {
    name: 'approve_date',
    label: 'Approve Date',
    field: 'approve_date',
    align: 'left',
    sortable: true,
  },
];

const rows = ref([]);

const getSelectedString = () => {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} record${
        selected.value.length > 1 ? 's' : ''
      } selected of ${rows.value.length}`;
};


const getAllPendingBorrowed = async () => {
  try {
      const response = await api.post('/transactions/all', { option: 'Borrowed' }, {
        headers: {
          Authorization: `Bearer ${SessionStorage.getItem('token')}`
        }
      })
      if (response.data) {
        rows.value = [];
        rows.value = response.data;
      }
  } catch (error) {
    throw error;
  }
};

const handleClick = async (option: string, data_set: any) => {
  try {
    data_set.map(async (item: any) => {
      let endpoint = '';
      switch (option) {
        case 'accept':
          endpoint = '/transaction/approve'
          break;
        case 'cancel':
          endpoint = '/transaction/cancel'
          break;

        default:
          throw new Error('unknown option')
          break;
      }
      const response = await api.post(endpoint, { transaction_id: item.pending_transaction_id }, {
        headers: {
          Authorization: `Bearer ${SessionStorage.getItem('token')}`
        }
      });
      selected.value = [];
      getAllPendingBorrowed();

      socket.emit("notifications", item.pending_transaction_id);

      Notify.create({
        message: response.data.message,
        timeout: 1500,
        position: 'top-right'
      })
    })
  } catch (error) {
    throw error;
  }
};



onMounted(() => {
  getAllPendingBorrowed();

  socket.on("new_notification", (data) => {
    if (data) {
      getAllPendingBorrowed();
    }
  })
})

</script>
