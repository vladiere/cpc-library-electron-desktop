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
        <q-tab name="transactionhistory" label="Book Transactions" />
        <q-tab name="contributionshistory" label="Contributions" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-grey-2">
        <q-tab-panel name="transactionhistory" class="q-pa-none">
          <HistoryReturned />
        </q-tab-panel>

        <q-tab-panel name="contributionshistory">
          <div class="text-h3 text-weight-light text-grey-7 text-center flex flex-center q-mt-lg" v-if="contributeHistory.length === 0">Contributors History is empty</div>
          <q-virtual-scroll
              style="max-height: calc(100vh - 100px)"
              :items="contributeHistory"
              separator
              v-slot="{ item, index }"
          >
            <ContributreHistory :key="index" v-bind="item" />
          </q-virtual-scroll>
        </q-tab-panel>
      </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref } from 'vue'
import { ConibuteHistoryProps } from 'components/Acquisitions/ContributreHistory.vue';
import { useBookStore } from 'stores/book-store';

defineComponent({
  name: 'HistoryPage'
});

const ContributreHistory = defineAsyncComponent({
  loader: () => import('components/Acquisitions/ContributeHistory.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const HistoryReturned = defineAsyncComponent({
  loader: () => import('components/CheckedInOut/HistoryBookComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const tab = ref('transactionhistory');
const contributeHistory = ref<ContributeHistoryProp>([]);
const bookStore = useBookStore();

onMounted(() => {
  contributeHistory.value = bookStore.getEbooks;
})
</script>
