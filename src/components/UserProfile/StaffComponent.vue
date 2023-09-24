<template>
  <q-item class="q-my-sm" clickable v-ripple>
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white">
        {{ letter }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <q-item-label caption lines="1">{{ email }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon name="chat_bubble" color="green" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface StaffProps {
  name: string;
  email?: string;
  letter?: string;
}

withDefaults(defineProps<StaffProps>(), {
  name: '',
  email: '',
  letter: '',
});
</script>
