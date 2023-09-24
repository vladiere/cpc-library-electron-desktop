<template>
  <div
    id="chart"
    class="q-pa-md shadow-2 bg-white flex flex-center text-h5"
    style="border-radius: 5px"
  >
    <apexchart
      type="pie"
      width="450"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'RecentVisitChart',
});

const series = [44, 55, 13, 43];
const chartOptions = {
  chart: {
    width: 450,
    type: 'pie',
  },
  title: {
    text: 'Recent visits',
    align: 'left',
  },
  labels: ['BSIT', 'BSHM', 'BSED', 'BEED'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};
</script>
