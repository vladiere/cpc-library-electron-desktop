<template>
  <q-table
    bordered
    :rows="rows"
    :columns="columns"
    row-key="name"
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
    <template v-slot:body-cell-button="{ row, col }">
      <span class="text-h6 text-bold q-pr-md">Reservations for this week</span>
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

export interface CheckOutProps {
  rows: object;
};

withDefaults(defineProps<CheckOutProps>(), {
  rows: [],
});

const handleClick = (option: string, value: any) => {
  console.log(value)
}
</script>
