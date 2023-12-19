<template>
  <q-page padding class="q-pb-xl">
    <!-- content -->
    <div class="column" style="gap: 25px">
      <UsersTable class="col" />
      <BooksRecords class="col" />
      <EbooksRecords class="col" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, onMounted } from 'vue';
import books from 'src/utils/books';

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

onMounted(async() => {
  await books.getAllContributorsBooks();
})
</script>
