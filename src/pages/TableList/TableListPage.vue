<template>
  <q-page padding class="q-mb-xl">
    <!-- content -->
    <div class="column" style="gap: 25px">
      <UsersTable v-once class="col" />
      <BooksRecords v-once class="col" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

defineComponent({
  name: 'TableListPage',
});

const UsersTable = defineAsyncComponent(() =>
  import('components/Tables/UsersList.vue')
);
const BooksRecords = defineAsyncComponent(() =>
  import('components/Tables/BooksRecords.vue')
);
</script>
