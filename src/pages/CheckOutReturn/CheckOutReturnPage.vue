<template>
  <q-page padding>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="checkedout" label="Checked Out" />
        <q-tab name="return" label="Return" />
        <q-tab name="history" label="History" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-grey-2">
       <q-tab-panel name="checkedout" class="q-pa-none">
         <CheckedOutComponent />
        </q-tab-panel>
        <q-tab-panel name="return" class="q-pa-none">
          <ReturnComponent />
        </q-tab-panel>
      </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, defineAsyncComponent } from 'vue'

defineComponent({
  name: 'CheckinOutPage'
});

const CheckedOutComponent = defineAsyncComponent({
  loader: () => import('components/CheckedInOut/CheckedOutComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const ReturnComponent = defineAsyncComponent({
  loader: () => import('components/CheckedInOut/ReturnComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const tab = ref('checkedout');

</script>
