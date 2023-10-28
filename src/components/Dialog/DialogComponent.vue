<template>
  <q-dialog persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog></template>

<script setup lang="ts">

const emit = defineEmits('')

export interface DialogProps {
  notification_id: number;
  message: string;
  fullname: string;
  notification_type: string;
  notification_date: string;
  status: string;
  show: boolean;
}

withDefaults(defineProps<DialogProps>(), {
  notification_id: 0,
  fullname: '',
  message: '',
  notification_type: '',
  notification_date: '',
  status: '',
  show: boolean
});
</script>
