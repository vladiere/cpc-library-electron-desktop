<template>
  <q-table title="Users List" :rows="rows" :columns="columns" row-key="name" />
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { SessionStorage } from 'quasar';

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

const columns: any = [
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
        Authorization: `Bearer ${SessionStorage.getItem('token')}`
      }
    })
    rows.value = response.data;
  } catch (error) {
    throw error;
  }
}

onMounted(() => {
  getUserDetails();
})
</script>
