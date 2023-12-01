<template>
  <q-page padding class="q-mb-lg">
    <div class="q-mt-sm column q-gutter-lg">
      <BooksTrend />
      <RecentVisits />
      <FinesAndFees />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';

defineComponent({
  name: 'StatsPage',
});

const RecentVisits = defineAsyncComponent({
  loader: () => import('components/Statistics/RecentVisitStat.vue'),
  timeout: 5000,
  delay: 300,
  suspensible: false
});

const BooksTrend = defineAsyncComponent({
  loader: () => import('components/Statistics/BooksTrendStat.vue'),
  delay: 300,
  timeout: 5000,
  suspensible: false
});

const FinesAndFees = defineAsyncComponent({
  loader: () => import('components/Statistics/FinesAndFees.vue'),
  delay: 300,
  timeout: 5000,
  suspensible: false
});

const tab = ref('yearly');
</script>
