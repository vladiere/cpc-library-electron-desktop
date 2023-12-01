<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>

<template>
  <q-page padding class="column q-gutter-y-lg q-pb-xl">
    <div v-if="!isLoading" class="row justify-evenly items-start text-uppercase q-mt-lg">
      <CardsComponentProps
        v-for="cards in cardsComponent"
        :key="cards.title"
        v-bind="cards"
      />
    </div>
    <div v-if="isLoading" class="row justify-evenly items-start text-uppercase q-mt-lg">
      <q-skeleton animation="wave" height="150px" width="23%" v-for="index in 4" :key="index"/>
    </div>
    <div class="column items-center content-center">
      <TrendChart :data_object="trend_books" v-if="!isLoading"/>
      <q-skeleton height="250px" animation="wave" v-if="isLoading" width="97%"/>
    </div>
    <div class="column items-center">
      <div class="row" style="width: 97%; gap: 25px">
        <DepartmentalOnlineChart class="col" :data_object="department_online" v-if="!isLoading" />
        <q-skeleton height="420px" animation="wave" v-if="isLoading" width="50%" class="col"/>
        <VolumeBorrowingChart class="col" :data_object="busy_book_borrowed" v-if="!isLoading" />
        <q-skeleton height="420px" animation="wave" v-if="isLoading" width="50%" class="col"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent, computed, ref } from 'vue';
import { CardsProps } from 'components/Dashboard/CardsComponent.vue';
import { socket } from 'src/utils/socket';
import { api } from 'src/boot/axios';
import { LocalStorage, debounce } from 'quasar';

const CardsComponentProps = defineAsyncComponent({
  loader: () => import('components/Dashboard/CardsComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
})

const VolumeBorrowingChart = defineAsyncComponent({
  loader: () => import('components/Dashboard/VolumeBorrowingChart.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const DepartmentalOnlineChart = defineAsyncComponent({
  loader: () => import('components/Dashboard/DepartmentalOnlineChart.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const TrendChart = defineAsyncComponent({
  loader: () => import('components/Dashboard/TrendChart.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const cards_value = ref({
  totalActive: 0,
  totalVisit: 0,
  totalRegister: 0,
  totalAmount: 0,
});
const isLoading = ref(true);
const busy_book_borrowed = ref([]);
const department_online = ref([]);
const trend_books = ref([]);

const cardsComponent = ref<CardsProps[]>([
  {
    title: 'Fines & Fees',
    icon: 'mdi-cached',
    img: 'mdi-currency-php',
    label: 'Updated now',
    count: computed(() => cards_value.value.totalAmount),
    loading: isLoading,
  },
  {
    title: 'new register',
    icon: 'mdi-cached',
    img: 'mdi-account-multiple-plus',
    label: 'Updated now',
    count: computed(() => cards_value.value.totalRegister),
    loading: isLoading,
  },
  {
    title: 'recent visits',
    icon: 'mdi-cached',
    img: 'mdi-history',
    label: 'Updated now',
    count: cards_value.value.totalVisit,
    loading: isLoading,
  },
  {
    title: 'online users',
    icon: 'mdi-cached',
    img: 'mdi-web',
    label: 'Updated now',
    count: computed(() => cards_value.value.totalActive),
    loading: isLoading,
  }
]);

const getDashboard = debounce(async () => {
  try {
    const response = await api.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });

    cards_value.value.totalActive = response.data.total_active.total_active;
    cards_value.value.totalRegister = response.data.new_register.new_register;
    cards_value.value.totalAmount = parseFloat(response.data.total_fine_fees.total_fines_fees);

    trend_books.value = response.data.trend_books;
    department_online.value = response.data.department_online;
    busy_book_borrowed.value = response.data.busy_book_borrowed;

  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}, 1500)

onMounted(async () => {
  isLoading.value = true;
  await getDashboard();
  await socket.on('new_connected', (data) => {
    if (data) {
      cards_value.value.totalActive += 1;
      const onlineUsersCard = cardsComponent.value.find(card => card.title === 'online users');
      onlineUsersCard.count = cards_value.value.totalActive;
    }
  })

  await socket.on('user_logout', () => {
    cards_value.value.totalActive = cards_value.value.totalActive !== 0 ? cards_value.value.totalActive - 1 : cards_value.value.totalActive;
    const onlineUsersCard = cardsComponent.value.find(card => card.title === 'online users');
    onlineUsersCard.count = cards_value.value.totalActive;
  })

  await socket.on('disconnected', () => {
    if (cards_value.value.totalActive !== 0) {
      cards_value.value.totalActive -= 1;
    }
    const onlineUsersCard = cardsComponent.value.find(card => card.title === 'online users');
    onlineUsersCard.count = cards_value.value.totalActive;
  })

  await socket.on('new_visitor', () => {
    const recentVisitCard = cardsComponent.value.find(card => card.title === 'recent visits');
    cards_value.value.totalVisit += 1;
    recentVisitCard.count = cards_value.value.totalVisit;
    console.log('new visitor');
  })

})
</script>
