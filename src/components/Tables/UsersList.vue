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
import { defineComponent, ref, onMounted } from 'vue';
import { useUserStore } from 'stores/user-store';

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
const userStore = useUserStore();

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

onMounted(async () => {
  rows.value = userStore.getUsers;
})

</script>
