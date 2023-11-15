<template>
  <q-table
    bordered
    :rows="rows"
    :columns="columns"
    row-key="pending_transaction_id"
    :selected-rows-label="getSelectedString"
    selection="multiple"
    class="text-capitalize"
    :filter="filter"
    v-model:selected="selected"
    :pagination="{
      rowsPerPage: 7,
      sortBy: 'name',
    }"
  >
    <template v-slot:top>
      <span class="text-h6 text-bold q-pr-md">Holds for this week</span>
      <q-space />
      <div class="row q-gutter-x-md">
        <q-btn
          v-if="selected.length > 0"
          color="blue-9"
          text-color="grey-2"
          dense
          no-caps
          :label="selected.length === 1 ? 'Accept' : 'Accept All'"
          @click="handleClick('accept', selected[0].pending_transaction_id)"
        />
        <q-btn
          v-if="selected.length > 0"
          color="red"
          text-color="grey-2"
          dense
          no-caps
          :label="selected.length === 1 ? 'Cancel' : 'Cancel All'"
          @click="handleClick('cancel', selected[0].pending_transaction_id)"
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
import { LocalStorage, Notify } from 'quasar';
import { socket } from 'src/utils/socket'


defineComponent({
  name: 'ReservationComponent',
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
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    sortable: true,
  },
  {
    name: 'request_date',
    label: 'Request Date',
    field: 'request_date',
    sortable: true,
  },
  {
    name: 'approve_date',
    label: 'Approve Date',
    field: 'approve_date',
    sortable: true,
  },
];

const rows = ref<PendingTransactions>([]);

const getSelectedString = () => {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} record${
        selected.value.length > 1 ? 's' : ''
      } selected of ${rows.value.length}`;
};

const getAllPendingHolds = async () => {
  try {
      const response = await api.post('/transactions/all', { option: 'Held' }, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`
        }
      })
      if (response.data) {
        rows.value = [];
        rows.value = response.data;
      }
  } catch (error) {
    throw error;
  }
}

const handleClick = async (option: string, transaction_id: number) => {
  try {
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
    const response = await api.post(endpoint, { transaction_id: transaction_id }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });
    rows.value = [];
    selected.value = [];

    await getAllPendingHolds();
    await socket.emit('notification', transaction_id)

    Notify.create({
      message: response.data.message,
      timeout: 1500,
      position: 'top-right'
    })
  } catch (error) {
    throw error;
  }
};

onMounted( async () => {
  await getAllPendingHolds();

  await socket.on('new_notification', async (data) => {
    if (data) {
      await getAllPendingHolds();
    }
  })
})
</script>
