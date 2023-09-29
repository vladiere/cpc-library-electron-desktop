<template>
  <q-page padding class="q-mb-lg">
    <!-- content -->
    <div class="column q-gutter-lg">
      <BooksTrend />
      <RecentVisits />
      <OnlineUsersVue />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import RecentVisits from 'src/components/Statistics/RecentVisitStat.vue';
import BooksTrend from 'src/components/Statistics/BooksTrendStat.vue';
import OnlineUsersVue from 'src/components/Statistics/OnlineUsers.vue';

defineComponent({
  name: 'StatsPage',
});
</script>
