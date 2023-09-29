<template>
  <div id="chart" class="shadow-2 q-pa-md">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'BooksTrend',
});

const series = [
  {
    name: 'BSIT',
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
  {
    name: 'BSHM',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  },
  {
    name: 'BSED',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  },
  {
    name: 'BEED',
    data: [23, 32, 14, 20, 34, 40, 19, 25, 10],
  },
];

const chartOptions = {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  title: {
    text: 'Product Trends by Month',
    align: 'left',
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
};
</script>
