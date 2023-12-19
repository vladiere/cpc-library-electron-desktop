<template>
  <q-page padding class="q-pb-xl">
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
import { defineComponent, defineAsyncComponent, ref, onMounted } from 'vue';
import circulations from 'src/utils/circulations';
import { debounce } from 'quasar';
import { SpinnerFacebook } from 'src/utils/loading';

defineComponent({
  name: 'CirculationsPage',
});

const tab = ref('reservations');

const Reservations = defineAsyncComponent({
  loader: () => import('components/Circulations/ReservationComponent.vue'),
  delay: 200,
  timeout: 5000,
  suspensible: true,
});

const Holds = defineAsyncComponent({
  loader: () => import('components/Circulations/HoldsComponent.vue'),
  delay: 200,
  timeout: 5000,
  suspensible: true,
});

const FinesAndFees = defineAsyncComponent({
  loader: () => import('components/Circulations/FinesAndFeesComponent.vue'),
  delay: 200,
  timeout: 5000,
  suspensible: true,
});

const Borrow = defineAsyncComponent({
  loader: () => import('components/Circulations/BorrowComponent.vue'),
  delay: 200,
  timeout: 5000,
  suspensible: true,
});

const Renewal = defineAsyncComponent({
  loader: () => import('components/Circulations/RenewalComponent.vue'),
  delay: 200,
  timeout: 5000,
  suspensible: true,
});

const getCirculations = debounce(async() => {
  try {
    await circulations.calculateFinesFees();
    await circulations.getCirculations();
  } catch (error) {
    throw error;
  } finally {
    SpinnerFacebook(false);
  }
},1500)

onMounted(async() => {
  SpinnerFacebook(true, 'Loading...');
  await getCirculations();
});
</script>
