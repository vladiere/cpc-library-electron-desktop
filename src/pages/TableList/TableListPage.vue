<template>
  <q-page padding class="q-mb-xl">
    <!-- content -->
    <div class="column" style="gap: 25px">
      <UsersTable />
      <NewResources />
      <OldResources />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import UsersTable from 'components/Tables/UsersList.vue';
import NewResources from 'components/Tables/NewResources.vue';
import OldResources from 'components/Tables/OldResources.vue';

defineComponent({
  name: 'TableListPage',
});
</script>
