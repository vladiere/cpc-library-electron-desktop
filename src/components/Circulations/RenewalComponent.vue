<template>
  <q-list bordered class="rounded-borders text-capitalize shadow-2">
    <q-item-label header class="text-h5">Renewals of books</q-item-label>
    <q-item-label header class="text-h4 text-blue-6" v-if="renewalList.length === 0">At the moment, no renewals are available.</q-item-label>

    <q-virtual-scroll
      :items="renewalList"
      style="max-height: calc(100vh - 150px)"
      separator
      v-slot="{ item, index }"
    >
      <q-item :key="index">
        <q-item-section avatar top>
          <q-avatar color="primary" text-color="white" class="text-uppercase">
            {{ item.fullname.split('')[0] }}
          </q-avatar>
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm text-capitalize">{{ item.fullname }}</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">[ {{ item.title }} ]</span>
            <span class="text-grey-8"> - another {{ item.renewal_days }} {{ item.renewal_days > 1 ? 'days' : 'day' }}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            <span class="text-weight-bolder text-primary">FROM:</span>
            @Original Due date: > {{ item.original_due_date }}
            <span class="text-weight-bolder text-primary">TO:</span>
            @New Due date: > {{ item.new_due_date }}
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="15px" color="red-4" flat dense round icon="mdi-close-outline" @click="handleRenewalOfBook(item.renewal_id, 'Cancelled')" :loading="isLoading" >
              <q-tooltip :delay="300" class="bg-red-5 text-grey-2">Cancel</q-tooltip>
            </q-btn>
            <q-btn class="gt-xs" size="15px" color="teal-4" flat dense round icon="mdi-check-all" @click="handleRenewalOfBook(item.renewal_id, 'Approved')" :loading="isLoading" >
              <q-tooltip :delay="300" class="bg-teal-5 text-grey-2" >Accept</q-tooltip>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-virtual-scroll>
  </q-list>
</template>

<script setup lang="ts">
import { defineComponent, watch, ref, onMounted } from 'vue';
import { IRenewal } from 'src/models/circulations';
import { useCirculationStore } from 'stores/circulation-store';
import { api } from 'boot/axios';
import { LocalStorage, Notify, debounce } from 'quasar';

defineComponent({
  name: 'RenewalComponent',
});

const renewalList = ref<IRenewal>([]);
const circulationStore = useCirculationStore();
const isLoading = ref(false);

const sendRenewalStatus = debounce(async(renew_id: number, renewal_status: string) => {
  try {
    const response = await api.post('/transaction/renew/manage', { renewal_id: renew_id, renewal_status: renewal_status }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });
    if (response.status === 200) {
      circulationStore.deleteCirculations('renewals', renew_id);
      Notify.create({
        message: response.data.message,
        position: 'top',
        progress: true,
        timeout: 2300,
        type: response.data.status === 200 || 201 ? 'positive' : 'warning',
      })
    }
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}, 1500);

const handleRenewalOfBook = async(renew_id: number, renewal_status: string) => {
  isLoading.value = true;
  await sendRenewalStatus(renew_id,renewal_status);
}

onMounted(() => {
  renewalList.value = circulationStore.getRenewals;
});

watch(() => circulationStore.getRenewals, () => {
  renewalList.value = circulationStore.getRenewals;
})
</script>
