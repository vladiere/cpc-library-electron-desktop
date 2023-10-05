<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white" class="text-capitalize">
        {{ firstname.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-capitalize"
        >{{ firstname }} {{ middlename }} {{ lastname }}</q-item-label
      >
      <q-item-label caption lines="1">{{ email_address }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label class="text-capitalize">{{ privilege }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface StaffProps {
  librarian_id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email_address: string;
  phone_number: string;
  hobbies: string;
  description: string;
  street_address: string;
  city: string;
  state_province_region: string;
  postal_code: number;
  address_type: string;
  username: string;
  privilege: string;
}

withDefaults(defineProps<StaffProps>(), {
  librarian_id: 0,
  firstname: '',
  middlename: '',
  lastname: '',
  email_address: '',
  phone_number: '',
  hobbies: '',
  description: '',
  street_address: '',
  city: '',
  state_province_region: '',
  postal_code: 0,
  address_type: '',
  username: '',
  privilege: '',
});
</script>
