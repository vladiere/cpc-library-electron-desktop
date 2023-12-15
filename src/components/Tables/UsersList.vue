<template>
  <q-table
    title="Users List"
    class="text-capitalize"
    dense
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter || sortTable"
    :loading="isLoading"
    separator="vertical"
    :pagination="{
      rowsPerPage: 20,
      sortBy: 'status',
    }"
  >
    <template v-slot:top>
      <span class="text-h6 q-mr-md">Users List</span>

      <q-btn-dropdown flat no-caps :label="!sortTable ? 'Sort by Department' : sortTable" dense>
        <q-list dense>
          <q-item clickable v-close-popup @click="sortTable = ''">
            <q-item-section>
              ALL
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup v-for="option in options" :key="option" @click="sortTable = option">
            <q-item-section>
              <q-item-label>{{ option }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-space />
        <q-input
          placeholder="Search..."
          rounded
          @blur="filter = null"
          dense
          outlined
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon
              :name="filter ? 'cancel' : 'search'"
              @click.stop.prevent="filter = null"
              class="cursor-pointer"
            />
          </template>
        </q-input>
    </template>

    <template v-slot:body-cell-status="props">
        <q-td key="status" :props="props">
          <q-badge :color="props.row.user_status === 'active' ? 'green-9' : 'orange-10'" >
            {{ props.row.user_status === 'active' ? 'online' : 'offline' }}
          </q-badge>
        </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useUserStore } from 'stores/user-store';
import { debounce } from 'quasar';
import { api } from 'quasar';

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

const filter = ref('');
const isLoading = ref(false);
const sortTable = ref('');
const userStore = useUserStore();
const options = ref([]);

const columns: unknown = [
  {
    name: 'fullname',
    label: 'Fullname',
    field: 'fullname',
    sortable: true,
    align: 'left',
    style: 'text-transform: capitalize'
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
    sortable: true,
    style: 'text-transform: uppercase'
  },
  {
    name: 'email_address',
    label: 'Email Address',
    field: 'email_address',
    align: 'left',
    sortable: true,
    style: 'text-transform: lowercase'
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

const getAllusers = debounce(() => {
  try {
    rows.value = userStore.getUsers;
    rows.value.map((item: unknown) => {
      const index = options.value.indexOf(item.department.toUpperCase());
      if (index === -1) options.value.push(item.department.toUpperCase());
    })
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}, 1500)

onMounted(() => {
  isLoading.value = true;
  getAllusers();
});

</script>
