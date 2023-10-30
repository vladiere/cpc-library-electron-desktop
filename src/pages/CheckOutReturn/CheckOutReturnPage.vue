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
        <q-tab name="return" label="Return" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-grey-2">
       <q-tab-panel name="checkedout" class="q-pa-none">
         <CheckOutComponent v-bind="rows" />
        </q-tab-panel>
        <q-tab-panel name="return" class="q-pa-none">
          returns
        </q-tab-panel>
      </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { SessionStorage } from 'quasar'
import CheckOutComponent, { CheckOutProps } from 'src/components/CheckedInOut/CheckedOutComponent.vue'

defineComponent({
  name: 'CheckinOutPage'
});

const tab = ref('checkedout');
const rows = ref<CheckOutProps>([]);

const getAllPendingReservation = async () => {
  try {
      const response = await api.post('/transactions/all', { option: 'Approved' }, {
        headers: {
          Authorization: `Bearer ${SessionStorage.getItem('token')}`
        }
      })
      if (response.data) {
        rows.value.push(response.data)
      }
  } catch (error) {
    throw error;
  }
}


</script>
