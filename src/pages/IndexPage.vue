<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>

<template>
  <q-page padding class="column q-gutter-y-lg q-mb-xl">
    <div class="row justify-evenly items-start text-uppercase q-mt-lg">
      <CardsComponentProps
        v-for="cards in cardsComponent"
        :key="cards.title"
        v-bind="cards"
      /> </div>
    <div class="column items-center content-center">
      <TrendChart />
    </div>
    <div class="column items-center">
      <div class="row" style="width: 97%; gap: 25px">
        <DepartmentalOnlineChart class="col" />
        <VolumeBorrowingChart class="col" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent, ref } from 'vue';
import { CardsProps } from 'components/Dashboard/CardsComponent.vue';
import { socket } from 'src/utils/socket';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';

const CardsComponentProps = defineAsyncComponent({
  loader: () => import('components/Dashboard/CardsComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
})

const VolumeBorrowingChart = defineAsyncComponent({
  loader: () => import('components/Dashboard/VolumeBorrowingChart.vue'),
  delay: 350,
  timeout: 2300,
  suspensible: false
});

const DepartmentalOnlineChart = defineAsyncComponent({
  loader: () => import('components/Dashboard/DepartmentalOnlineChart.vue'),
  delay: 400,
  timeout: 2300,
  suspensible: false
});

const TrendChart = defineAsyncComponent({
  loader: () => import('components/Dashboard/TrendChart.vue'),
  delay: 450,
  timeout: 2300,
  suspensible: false
});

const totalActive = ref(0);
const totalVisit = ref(0);
const cardsComponent = ref<CardsProps[]>([
  {
    title: 'trend books',
    icon: 'mdi-cached',
    img: 'mdi-trending-up',
    label: 'Updated now',
    count: 25,
  },
  {
    title: 'new register',
    icon: 'mdi-cached',
    img: 'mdi-account-multiple-plus',
    label: 'Updated now',
    count: 4,
  },
  {
    title: 'recent visits',
    icon: 'mdi-cached',
    img: 'mdi-history',
    label: 'Updated now',
    count: totalVisit.value,
  },
]);

const getUserActive = async () => {
  try {
    const response = await api.get('/user/active', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    })
    totalActive.value = response.data.total_active;
    cardsComponent.value.push({
      title: 'online users',
      icon: 'mdi-cached',
      img: 'mdi-account-group',
      label: 'Updated now',
      count: totalActive.value,
    })
  } catch (error) {
    throw error;
  }
}

onMounted(async () => {

  await getUserActive();
  await socket.on('new_connected', (data) => {
    if (data) {
      totalActive.value += 1;
      const onlineUsersCard = cardsComponent.value.find(card => card.title === 'online users');
      onlineUsersCard.count = totalActive.value;
    }
  })

  await socket.on('user_logout', () => {
    totalActive.value -= 1;
    const onlineUsersCard = cardsComponent.value.find(card => card.title === 'online users');
    onlineUsersCard.count = totalActive.value;
  })

  await socket.on('disconnected', () => {
    if (totalActive.value !== 0) {
      totalActive.value -= 1;
    }
    const onlineUsersCard = cardsComponent.value.find(card => card.title === 'online users');
    onlineUsersCard.count = totalActive.value;
  })

  await socket.on('new_visitor', () => {
    const recentVisitCard = cardsComponent.value.find(card => card.title === 'recent visits');
    totalVisit.value += 1;
    recentVisitCard.count = totalVisit.value;
    console.log('new visitor');
  })

})
</script>
