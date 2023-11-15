<template>
  <q-page padding class="q-mb-xl">
    <!-- content -->
    <div class="column" style="gap: 25px">
      <UsersTable v-once class="col" />
      <BooksRecords v-once class="col" />
      <EbooksRecords v-once class="col" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

defineComponent({
  name: 'TableListPage',
});

const UsersTable = defineAsyncComponent({
  loader:() => import('components/Tables/UsersList.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: true
});
const BooksRecords = defineAsyncComponent({
  loader: () => import('components/Tables/BooksRecords.vue'),
  delay: 350,
  timeout: 2300,
  suspensible: true,
});

const EbooksRecords = defineAsyncComponent({
  loader: () => import('components/Tables/EbooksRecords.vue'),
  delay: 400,
  timeout: 2300,
  suspensible: true
});
</script>
