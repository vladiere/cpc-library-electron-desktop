<template>
  <q-page padding class="q-mb-xl">
    <!-- content -->
    <q-tabs v-model="tab" align="justify" narrow-indicator>
      <q-tab class="text-grey-8" name="add" label="Add Resources" />
      <q-tab class="text-grey-8" name="manage" label="Manage Resources" />
    </q-tabs>
    <div class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
        class="bg-grey-2 text-dark text-center"
      >
        <q-tab-panel name="add">
          <AddResources />
        </q-tab-panel>

        <q-tab-panel name="manage">
          <ManageResources />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import AddResources from 'src/components/Resources/AddResources.vue';
import ManageResources from 'src/components/Resources/ManageResources.vue';

defineComponent({
  name: 'ResourcesPage',
});

const tab = ref('add');
</script>
