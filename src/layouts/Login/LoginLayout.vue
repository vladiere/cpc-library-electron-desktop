<template>
  <q-layout view="hHh lpR lFr">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
defineComponent({
  name: 'LoginLayout',
});
</script>
