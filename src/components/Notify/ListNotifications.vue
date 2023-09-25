<template>
  <q-list class="text-capitalize">
    <q-item clickable v-ripple :class="status === 'unread' ? 'text-bold' : ''">
      <q-item-section>
        <q-item-label>{{ fullname }}</q-item-label>
        <q-item-label caption lines="2">{{ message }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>{{ time }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator inset />
  </q-list>
</template>

<script setup lang="ts">
export interface NotificationsProps {
  id: number;
  fullname: string;
  message: string;
  time: string;
  status: string;
}

withDefaults(defineProps<NotificationsProps>(), {
  id: 0,
  fullname: '',
  message: '',
  time: '',
  status: '',
});
</script>
