<template>
  <div id="chart" class="shadow-2 q-pa-md">
    <apexchart
      type="donut"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'OnlineUsers',
});

const series = [15, 17, 55, 41];
const chartOptions = {
  chart: {
    type: 'donut',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  labels: ['BSIT', 'BSHM', 'BSED', 'BEED'],
  title: {
    text: 'Online Department',
  },
};
</script>
