<template>
    <q-item clickable v-ripple :class="status === 'unread' ? 'text-bold' : ''">
      <q-item-section>
        <q-item-label :class="status ==='unread' ? 'text-grey-10' : 'text-grey-8'">{{ fullname }}</q-item-label>
        <q-item-label :caption="status === 'read'" >{{ message }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>{{ notification_date }}</q-item-label>
      </q-item-section>
    </q-item>
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
