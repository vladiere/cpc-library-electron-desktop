<template>
  <q-page padding class="q-mb-xl">
    <!-- content -->
    <q-tabs v-model="tab" align="justify" narrow-indicator>
      <q-tab class="text-grey-8" name="add" label="Add Resources" />
      <q-tab class="text-grey-8" name="manage" label="Manage Resources" v-if="librarianStore.privilege === 'admin'" />
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
import { defineComponent, ref, defineAsyncComponent } from 'vue';
import { useLibrarianDataStore } from 'src/stores/user';

defineComponent({
  name: 'ResourcesPage',
});

const ManageResources = defineAsyncComponent(() =>
  import('components/Resources/ManageResources.vue')
);
const AddResources = defineAsyncComponent(() =>
  import('components/Resources/AddResources.vue')
);

const tab = ref('add');
const librarianStore = useLibrarianDataStore();

</script>
