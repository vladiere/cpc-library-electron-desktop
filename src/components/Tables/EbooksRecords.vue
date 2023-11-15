<template>
  <q-table
    bordered
    title="Books Records"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    class="text-capitalize q-pa-md"
    style="max-width: 75vw"
    :pagination="{
      rowsPerPage: 10,
      sortBy: 'name',
    }"
  >
    <template v-slot:top>
      <span class="text-h6">eBooks Records</span>
      <q-space />
      <q-input
        outlined
        rounded
        dense
        class="text-lowercase"
        color="primary"
        v-model="filter"
        label="Search..."
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-if="filter" v-slot:append>
          <q-icon
            name="cancel"
            @click.stop.prevent="filter = null"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';


defineComponent({
  name: 'EbooksRecords'
});

const rows = ref([])
const filter = ref(null);

//  {
//      "contribution_id": 29,
//      "user_id": 1,
//      "author_fullname": "tessa sloan",
//      "category_name": "roman",
//      "publisher_name": "mybooks",
//      "file_title": "billionair boss protector",
//      "file_path": "billionaire-boss-protector-1700010849089.epub",
//      "fullname": "lance phillip descartin ",
//      "department": "bsit",
//      "file_description": "",
//      "uploaded_date": "November 15, 2023",
//      "file_total_downloads": 0,
//      "file_status": "accepted"
//  }

const columns: unknown = [
  {
    name: 'author fullname',
    required: true,
    label: 'Author Name',
    align: 'left',
    field: 'author_fullname',
    sortable: true,
  },
  {
    name: 'file_title',
    required: true,
    label: 'eBook Title',
    align: 'left',
    field: 'file_title',
    sortable: true,
  },
  {
    name: 'category_name',
    required: true,
    label: 'Category',
    align: 'left',
    field: 'category_name',
    sortable: true,
  },
  {
    name: 'publisher name',
    required: true,
    label: 'Publisher Name',
    align: 'left',
    field: 'publisher_name',
    sortable: true,
  },
  {
    name: 'fullname',
    required: true,
    label: 'Contributor Name',
    align: 'left',
    field: 'fullname',
    sortable: true,
  },
  {
    name: 'department',
    required: true,
    label: 'Department',
    align: 'left',
    field: 'department',
    sortable: true,
  },
  {
    name: 'file_total_downloads',
    required: true,
    label: 'Total Downloads',
    align: 'left',
    field: 'file_total_downloads',
    sortable: true,
  },
];


const getUserContributions = async () => {
  try {
    const response = await api.post('/user/book/contribute/list', { user_id: 0, limit: 0 }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });
    rows.value = response.data;
  } catch (error) {
    throw error;
  }
}

onMounted(async () => {
  await getUserContributions();
});

onBeforeUnmount(() => {
  rows.value = [];
})
</script>
