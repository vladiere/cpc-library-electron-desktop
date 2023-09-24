<template>
  <div
    id="chart"
    class="q-pa-md shadow-2 bg-white"
    style="width: 97%; border-radius: 5px"
  >
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'TrendChart',
});

const series = [
  {
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
  },
];
const chartOptions = {
  chart: {
    type: 'bar',
    height: 350,
  },
  title: {
    text: 'Books treding this month',
    align: 'left',
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      'South Korea',
      'Canada',
      'United Kingdom',
      'Netherlands',
      'Italy',
      'France',
      'Japan',
      'United States',
      'China',
      'Germany',
    ],
  },
};
</script>
