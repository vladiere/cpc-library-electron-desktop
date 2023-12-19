<template>
  <q-page padding class="q-mb-lg">
    <div class="q-mt-sm column q-gutter-lg">
      <q-skeleton v-if="isLoading" height="330px" animation="wave" />
      <BooksTrend v-if="!isLoading" :data_object="transaction_book"/>
      <q-skeleton v-if="isLoading" height="330px" animation="wave" />
      <RecentVisits v-if="!isLoading" :data_object="online_department"/>
      <q-skeleton v-if="isLoading" height="330px" animation="wave" />
      <FinesAndFees v-if="!isLoading" :data_object="fine_fees"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { LocalStorage, debounce } from 'quasar';

defineComponent({
  name: 'StatsPage',
});

const RecentVisits = defineAsyncComponent({
  loader: () => import('components/Statistics/RecentVisitStat.vue'),
  timeout: 5000,
  delay: 300,
  suspensible: false
});

const BooksTrend = defineAsyncComponent({
  loader: () => import('components/Statistics/BooksTrendStat.vue'),
  delay: 300,
  timeout: 5000,
  suspensible: false
});

const FinesAndFees = defineAsyncComponent({
  loader: () => import('components/Statistics/FinesAndFees.vue'),
  delay: 300,
  timeout: 5000,
  suspensible: false
});

type TransactionBookType = {
  month: string;
  title: string;
  total_records: number;
}

type OnlineDepartmentType = {
  month: string;
  department: string;
  total_counts: number;
}

type FinesFeesType = {
  month: string;
  total_amount: number;
}

const tab = ref('yearly');
const isLoading = ref(false);
const transaction_book = ref<TransactionBookType>([]);
const online_department = ref<OnlineDepartmentType>([]);
const fine_fees = ref<FinesFeesType>([]);

const getAllStats = debounce(async () => {
  try {
    const response = await api.get('/stats', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });

    if (response.status === 200) {
      fine_fees.value = response.data.fines_fees;
      online_department.value = response.data.online_department;
      transaction_book.value = response.data.transaction_book;
    }

  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}, 1500)

onMounted(async () => {
  isLoading.value = true;
  await getAllStats();
})
</script>
