<template>
  <q-page padding>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="checkedout" label="Checked Out" />
        <q-tab name="checkedin" label="Checked In" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-grey-2">
       <q-tab-panel name="checkedout" class="q-pa-none">
          check out
        </q-tab-panel>
        <q-tab-panel name="checkedin" class="q-pa-none">
          check in
        </q-tab-panel>
      </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'


defineComponent({
  name: 'CheckinOutPage'
});

const tab = ref('checkedin');
</script>
