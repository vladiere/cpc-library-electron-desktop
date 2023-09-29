<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-md">
      <div class="col column q-gutter-y-md q-pa-md shadow-2 rounded-borders">
        <span class="text-h5">Change Password</span>
        <q-form greedy class="q-gutter-md">
          <q-input outlined v-model="text.newPasss" label="New Password" />
          <q-input
            outlined
            v-model="text.confirmPass"
            label="Confirm password"
          />
          <q-btn type="submit" label="Save Change" color="primary" rounded />
        </q-form>
      </div>
      <div class="col column q-gutter-y-d q-pa-md shadow-2 rounded-borders">
        <span class="text-h5">System Settings</span>
        <div class="row q-gutter-x-md items-center q-pl-lg">
          <span class="text-subtitle1">Dark Mode</span>
          <q-toggle v-model="darkMode" icon="mdi-white-balance-sunny" />
        </div>
        <div class="row q-pl-lg">
          <q-btn
            no-caps
            label="Check and Install Update"
            icon-right="mdi-sync"
            flat
            dense
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'SettingsPage',
});

const text = ref({
  newPasss: '',
  confirmPass: '',
});
const darkMode = ref(false);
</script>
