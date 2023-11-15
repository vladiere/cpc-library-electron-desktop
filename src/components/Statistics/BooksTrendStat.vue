<template>
  <div id="chart" class="shadow-2 q-pa-md">
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
  name: 'BooksTrendStat',
});

const series = [
  {
    name: 'The anonymous',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
  {
    name: 'The Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  },
  {
    name: 'Free Cash Flow On River',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  },
];

const chartOptions = {
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  title: {
    text: 'Most Borrowed Books',
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: unknown) {
        return `This book has ${val}`;
      },
    },
  },
};
</script>
