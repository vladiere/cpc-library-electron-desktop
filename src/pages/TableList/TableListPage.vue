<template>
  <q-page padding class="q-mb-xl">
    <!-- content -->
    <div class="column" style="gap: 25px">
      <UsersTable class="col" />
      <BooksRecords class="col" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import UsersTable from 'components/Tables/UsersList.vue';
import BooksRecords from 'components/Tables/BooksRecords.vue';

defineComponent({
  name: 'TableListPage',
});
</script>
