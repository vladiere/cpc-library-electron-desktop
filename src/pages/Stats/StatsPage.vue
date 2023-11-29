<template>
  <q-page padding class="q-mb-lg">
     <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="transparent"
        align="justify"
      >
        <q-tab name="yearly" label="Yearly" />
        <q-tab name="monthly" label="Monthly" />
        <q-tab name="weekly" label="Weekly" />
      </q-tabs>
    <div class="q-mt-sm column q-gutter-lg">
      <BooksTrend />
      <RecentVisits />
      <OnlineUsersVue />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import RecentVisits from 'src/components/Statistics/RecentVisitStat.vue';
import BooksTrend from 'src/components/Statistics/BooksTrendStat.vue';
import OnlineUsersVue from 'src/components/Statistics/OnlineUsers.vue';

defineComponent({
  name: 'StatsPage',
});

const tab = ref('yearly');
</script>
