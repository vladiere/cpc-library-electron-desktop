<template>
  <q-page padding class="q-mb-xl">
    <!-- content -->
    <q-tabs v-model="tab" align="justify" >
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
        transition-prev="slide-right"
        transition-next="slide-right"
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

        <q-tab-panel name="borrows">
          <Borrow />
        </q-tab-panel>

        <q-tab-panel name="renewal">
          <Renewal />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import Holds from 'src/components/Circulations/HoldsComponent.vue';
import FinesAndFees from 'src/components/Circulations/FinesAndFeesComponent.vue';
import Borrow from 'src/components/Circulations/BorrowComponent.vue';
import Renewal from 'src/components/Circulations/RenewalComponent.vue';

defineComponent({
  name: 'CirculationsPage',
});

const Reservations = defineAsyncComponent({
  loader: () => import('components/Circulations/ReservationComponent.vue'),
  delay: 200,
  timeout: 2000,
  suspensible: false
});

const tab = ref('reservations');
</script>
