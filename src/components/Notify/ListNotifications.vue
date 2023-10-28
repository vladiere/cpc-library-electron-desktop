<template>
  <q-list class="text-capitalize">
    <q-item clickable v-ripple :class="status === 'unread' ? 'text-bold' : ''">
      <q-item-section>
        <q-item-label :class="status ==='unread' ? 'text-grey-10' : 'text-grey-8'">{{ fullname }}</q-item-label>
        <q-item-label caption lines="2">{{ message }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>{{ notification_date }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator inset />
  </q-list>
</template>

<script setup lang="ts">
export interface NotificationsProps {
  notification_id: number;
  message: string;
  fullname: string;
  notification_type: string;
  notification_date: string;
  status: string;
}

withDefaults(defineProps<NotificationsProps>(), {
  notification_id: 0,
  fullname: '',
  message: '',
  notification_type: '',
  notification_date: '',
  status: '',
});
</script>
