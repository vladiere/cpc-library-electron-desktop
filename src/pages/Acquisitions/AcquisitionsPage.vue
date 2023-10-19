<template>
  <q-page padding>
    <!-- content -->
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="bookpurchase" label="Book Purchase" />
        <q-tab name="contributors" label="Contributors" />
      </q-tabs>
      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
      >
        <q-tab-panel name="bookpurchase">
          <BookPurchaseComponent />
        </q-tab-panel>

        <q-tab-panel name="contributors">
          <span class="text-subtitle">Contributors</span>
          <q-virtual-scroll
            style="max-height: 50vh"
            :items="contributors"
            separator
            v-slot="{ item, index }"
          >
            <Contributors :key="index" v-bind="item" />
          </q-virtual-scroll>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import BookPurchaseComponent from 'src/components/Acquisitions/BookPurchaseComponent.vue';
import Contributors, {
  ContributorsProps,
} from 'src/components/Acquisitions/ContributorsComponent.vue';

defineComponent({
  name: 'AcquisitionsPage',
});

const tab = ref('bookpurchase');

// Sample data
const contributors: ContributorsProps[] = [
  {
    id: 1,
    title: 'the seven deads',
    date: '2023-09-10',
    status: 'recommend this',
    name: 'John Doe',
  },
  {
    id: 2,
    title: 'you and only you',
    date: '2023-09-09',
    status: 'add this',
    name: 'Jane Smith',
  },
  {
    id: 3,
    title: 'functional programmin',
    date: '2023-09-08',
    status: 'recommend this',
    name: 'Alice Johnson',
  },
  {
    id: 4,
    title: 'advance OOP',
    date: '2023-09-07',
    status: 'recommend this',
    name: 'Bob Brown',
  },
  {
    id: 5,
    title: 'thinking out of the box',
    date: '2023-09-06',
    status: 'add this',
    name: 'Eve White',
  },
  {
    id: 6,
    title: 'everything is encoded',
    date: '2023-09-05',
    status: 'recommend this',
    name: 'Charlie Green',
  },
];
</script>
