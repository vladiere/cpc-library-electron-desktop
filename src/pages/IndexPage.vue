<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>

<template>
  <q-page padding class="column q-gutter-y-lg q-mb-xl">
    <div class="row justify-evenly items-start text-uppercase q-mt-lg">
      <CardsComponentProps
        v-for="cards in cardsCompnent"
        :key="cards.title"
        v-bind="cards"
      />
    </div>
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
import CardsComponentProps, {
  CardsProps,
} from 'components/Dashboard/CardsComponent.vue';
import OnlineChart from 'src/components/Dashboard/OnlineChart.vue';
import RecentVisitChart from 'src/components/Dashboard/RecentVisitChart.vue';
import TrendChart from 'src/components/Dashboard/TrendChart.vue';

const cardsCompnent: CardsProps[] = [
  {
    title: 'trend books',
    icon: 'mdi-cached',
    img: '../src/assets/icons/trend.png',
    label: 'Updated now',
    count: 25,
  },
  {
    title: 'online users',
    icon: 'mdi-cached',
    img: '../src/assets/icons/web.png',
    label: 'Updated now',
    count: 10,
  },
  {
    title: 'new register',
    icon: 'mdi-cached',
    img: '../src/assets/icons/account-plus.png',
    label: 'Updated now',
    count: 4,
  },
  {
    title: 'recent visits',
    icon: 'mdi-cached',
    img: '../src/assets/icons/recent-visit.png',
    label: 'Updated now',
    count: 20,
  },
];
</script>
