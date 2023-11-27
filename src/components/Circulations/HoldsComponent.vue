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
          padding="5px 15px"
          no-caps
          :label="selected.length === 1 ? 'Accept' : 'Accept All'"
          @click="handleClick('accept', selected)"
        />
        <q-btn
          v-if="selected.length > 0"
          color="red"
          text-color="grey-2"
          dense
          padding="5px 15px"
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
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useCirculationStore } from 'stores/circulation-store';
import circulations from 'src/utils/circulations';
import { ICirculation } from 'src/models/circulations';
import { debounce } from 'quasar';

defineComponent({
  name: 'ReservationComponent',
});

const filter = ref('');
const selected = ref([]);
const circulationStore = useCirculationStore();

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

const rows = ref<ICirculation>([]);

const getSelectedString = () => {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} record${
        selected.value.length > 1 ? 's' : ''
      } selected of ${rows.value.length}`;
};

const acceptHolds = debounce(async(endpoint: string, transaction_id: number) => {
  try {
    const response = await api.post(endpoint, { transaction_id: transaction_id }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });

    if (response.status == 200) circulationStore.deleteCirculations('holds', transaction_id);
  } catch (error) {
    throw error;
  }
}, 1500);

const handleClick = async (option: string, data_set: object) => {
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
    data_set.map(async (item: unknown) => {
      await acceptHolds(endpoint, item.pending_transaction_id);
      selected.value = [];

      Notify.create({
        message: response.data.message,
        timeout: 1500,
        progess: true,
        position: 'top'
      });
    });
  } catch (error) {
    throw error;
  }
};

onMounted(() => {
  rows.value = circulationStore.getHolds;
});

watch(() => circulationStore.getHolds, () => {
  rows.value = circulationStore.getHolds;
})
</script>
