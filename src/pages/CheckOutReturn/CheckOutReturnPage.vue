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
        <q-tab-panel name="history" class="q-pa-none">
          <HistoryReturned />
        </q-tab-panel>
      </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, defineAsyncComponent } from 'vue'
import { SpinnerIos } from 'src/utils/loading';

defineComponent({
  name: 'CheckinOutPage'
});

const CheckedOutComponent = defineAsyncComponent({
  loader: () => import('components/CheckedInOut/CheckedOutComponent.vue'),
  loadingComponent: SpinnerIos(1300, 'Loading...'),
  suspensible: false
});

const ReturnComponent = defineAsyncComponent({
  loader: () => import('components/CheckedInOut/ReturnComponent.vue'),
  loadingComponent: SpinnerIos(1300, 'Loading...'),
  suspensible: false
});

const HistoryReturned = defineAsyncComponent({
  loader: () => import('components/CheckedInOut/HistoryBookComponent.vue'),
  loadingComponent: SpinnerIos(1300, 'Loading...')
});

const tab = ref('checkedout');

</script>
