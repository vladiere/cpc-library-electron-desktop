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
        <q-btn icon="mdi-clipboard-arrow-left" size="15px" flat dense no-caps round :loading="isLoading" color="positive" @click="handleClick(row.transaction_id)">
          <q-tooltip :delay="300" class="bg-grey-10 text-grey-2">
            Mark as returned
          </q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>

  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Select fee categories</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          dense
          borderless
          v-model="model"
          :options="options"
          options-cover
          label="fee options"
          lazy-rules
          :error="errorOption.error"
          :error-message="errorOption.message"
        />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat :loading="isLoading" label="Cancel" v-close-popup />
        <q-btn flat :loading="isLoading" label="Return" @click="handleSendClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { api } from 'src/boot/axios'
import { LocalStorage, debounce, Notify } from 'quasar'
import { socket } from 'src/utils/socket';

const filter = ref('');
const isLoading = ref(false);
const options = ref(['Late Return Fee','Damaged Book Fee','Lost Book Fee','No issue','Other']);
const showDialog = ref(false);
const rows = ref([]);
const model = ref('');
const temp = ref(null);
const errorOption = ref({
  error: false,
  message: ''
})

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


const getAllCheckedOutReservation = debounce(async () => {
  try {
      const response = await api.post('/transaction/book/all', {
        option: 'Checked Out',
        transaction_status: 'Active'
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

const returnCirculation = debounce(async(transaction_id: number) => {
  try {
     const response = await api.post('/transaction/book/check_return', { transaction_id: transaction_id, transaction_type: 'Returned', transaction_status: 'Completed', fee: model.value }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });

    if (response.status === 200) {
      await getAllCheckedOutReservation();
      temp.value = null;
      model.value = '';
      showDialog.value = false;
      await socket.emit('notifications', transaction_id);
      Notify.create({
        message: 'Marked as returned',
        position: 'top',
        progress: true,
        type: response.data.status === 200 || 201 ? 'positive' : 'warning',
        timeout: 2300,
      });
    }
  } catch (error) {
    throw error;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 1800);
  }
}, 1500)

const handleClick = async (transaction_id: number) => {
  try {
    showDialog.value = true;
    temp.value = transaction_id;
  } catch (error) {
    throw error;
  }
}

const handleSendClick = async() => {
  try {
    if (model.value !== '') {
      isLoading.value = true;
      await returnCirculation(temp.value);
    } else {
      errorOption.value.error = true;
      errorOption.value.message = 'Select fee option';
    }
  } catch (error) {
    throw error;
  }
}

onMounted( async () => {
  isLoading.value = true;
  await getAllCheckedOutReservation();
});

onBeforeMount(() => {
  rows.value = [];
})
</script>
