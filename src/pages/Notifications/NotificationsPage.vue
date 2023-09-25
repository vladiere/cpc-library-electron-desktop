<template>
  <q-page padding>
    <div class="row justify-between q-mb-md">
      <span class="text-h6 text-grey-7">Notifications</span>
      <q-btn icon="mdi-broom" flat dense label="Read All" color="grey-7" />
    </div>
    <q-virtual-scroll
      style="max-height: 73vh"
      :items="notifications"
      separator
      v-slot="{ item, index }"
    >
      <ListNotifications :key="index" v-bind="item" />
    </q-virtual-scroll>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import ListNotifications, {
  NotificationsProps,
} from 'src/components/Notify/ListNotifications.vue';

defineComponent({
  name: 'NotificationsPage',
});

const notifications: NotificationsProps[] = Array.from(
  { length: 21 },
  (_, index) => ({
    id: index + 1,
    fullname: `User ${index + 1}`,
    message: `This is notification #${index + 1}`,
    time: new Date().toLocaleTimeString(),
    status: (index + 1) % 2 === 0 ? 'unread' : 'read',
  })
);

// Sort the notifications based on the "status" property
notifications.sort((a, b) => {
  // Convert status values to lowercase for case-insensitive sorting
  const statusA = a.status.toLowerCase();
  const statusB = b.status.toLowerCase();

  if (statusA < statusB) return 1;
  if (statusA > statusB) return -1;
  return 0;
});
</script>
