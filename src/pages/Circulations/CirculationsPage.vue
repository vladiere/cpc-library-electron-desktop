<template>
  <q-page padding class="q-mb-xl">
    <!-- content -->
    <q-tabs v-model="tab" align="justify" narrow-indicator>
      <q-tab class="text-grey-8" name="reservations" label="Reservations" />
      <q-tab class="text-grey-8" name="holds" label="Holds" />
      <q-tab class="text-grey-8" name="finesfees" label="Fines and Fees" />
      <q-tab class="text-grey-8" name="borrows" label="Borrows" />
      <q-tab class="text-grey-8" name="renewal" label="Renewals" />
    </q-tabs>
    <div class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
        class="bg-grey-2 text-dark text-center"
      >
        <q-tab-panel name="reservations">
          <Reservations />
        </q-tab-panel>

        <q-tab-panel name="holds">
          <Holds />
        </q-tab-panel>

        <q-tab-panel name="finesfees">
          <FinesAndFees />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import Reservations from 'src/components/Circulations/ReservationComponent.vue';
import Holds from 'src/components/Circulations/HoldsComponent.vue';
import FinesAndFees from 'src/components/Circulations/FinesAndFeesComponent.vue';

defineComponent({
  name: 'CirculationsPage',
});

const tab = ref('reservations');
</script>
