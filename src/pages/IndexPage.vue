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
        <RecentVisitChart class="col" />
        <OnlineChart class="col" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardsComponentProps, {
  CardsProps,
} from 'components/Dashboard/CardsComponent.vue';
import OnlineChart from 'src/components/Dashboard/OnlineChart.vue';
import RecentVisitChart from 'src/components/Dashboard/RecentVisitChart.vue';
import TrendChart from 'src/components/Dashboard/TrendChart.vue';
import { socket } from 'src/utils/socket';
import { api } from 'src/boot/axios';
import { SessionStorage } from 'quasar';

const totalActive = ref(0);
const totalVisit = ref(0);
const cardsComponent = ref<CardsProps[]>([
  {
    title: 'trend books',
    icon: 'mdi-cached',
    img: '../../src/assets/icons/trend.png',
    label: 'Updated now',
    count: 25,
  },
  {
    title: 'new register',
    icon: 'mdi-cached',
    img: '../../src/assets/icons/account-plus.png',
    label: 'Updated now',
    count: 4,
  },
  {
    title: 'recent visits',
    icon: 'mdi-cached',
    img: '../../src/assets/icons/recent-visit.png',
    label: 'Updated now',
    count: totalVisit.value,
  },
]);

const getUserActive = async () => {
  try {
    const response = await api.get("/user/active", {
      headers: {
        Authorization: `Bearer ${SessionStorage.getItem('token')}`
      }
    })
    totalActive.value = response.data.total_active;
    cardsComponent.value.push({
      title: 'online users',
      icon: 'mdi-cached',
      img: '../../src/assets/icons/web.png',
      label: 'Updated now',
      count: totalActive.value,
    })
  } catch (error) {
    throw error;
  }
}

onMounted(() => {

  getUserActive();
  socket.on("new_connected", (data) => {
    if (data) {
      totalActive.value += 1;
      const onlineUsersCard = cardsComponent.value.find(card => card.title === 'online users');
      onlineUsersCard.count = totalActive.value;
    }
  })

  socket.on("user_logout", () => {
    totalActive.value -= 1;
    const onlineUsersCard = cardsComponent.value.find(card => card.title === 'online users');
    onlineUsersCard.count = totalActive.value;
  })

  socket.on("disconnected", () => {
    if (totalActive.value !== 0) {
      totalActive.value -= 1;
    }
    const onlineUsersCard = cardsComponent.value.find(card => card.title === 'online users');
    onlineUsersCard.count = totalActive.value;
  })

  socket.on("new_visitor", () => {
    const recentVisitCard = cardsComponent.value.find(card => card.title === 'recent visits');
    totalVisit.value += 1;
    recentVisitCard.count = totalVisit.value;
    console.log("new visitor");
  })

})
</script>
