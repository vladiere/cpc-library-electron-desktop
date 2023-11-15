<template>
  <q-table title="Users List" class="text-capitalize" :rows="rows" :columns="columns" row-key="name" :filter="filter" >
    <template v-slot:top>
      <span class="text-h6">Users List</span>
      <q-space />
        <q-input
            placeholder="Search..."
            rounded
            dense
            outlined
            v-model="filter"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';

defineComponent({
  name: 'UsersTable',
});

interface UserDetails {
  user_id: number;
  fullname: string;
  id_number: number;
  department: string;
  email_address: string;
}

const filter = ref('')

const columns: unknown = [
  {
    name: 'fullname',
    label: 'Fullname',
    field: 'fullname',
    sortable: true,
    align: 'left'
  },
  {
    name: 'id_number',
    label: 'ID Number',
    field: 'id_number',
    sortable: true,
    align: 'left',
    sort: (a: number, b: number) => a - b,
  },
  {
    name: 'department',
    label: 'Department',
    field: 'department',
    align: 'left',
    sortable: true
  },
  {
    name: 'email_address',
    label: 'Email Address',
    field: 'email_address',
    align: 'left',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    field: 'user_status',
    align: 'center',
    sortable: true
  },
];

const rows = ref<UserDetails>([]);

const getUserDetails = async () => {
  try {
    const response = await api.post('/user/get/details', { user_id: 0 }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    })
    rows.value = response.data;
  } catch (error) {
    throw error;
  }
}

onMounted(async () => {
  await getUserDetails();
})

onBeforeUnmount(() => {
  rows.value = [];
})
</script>
