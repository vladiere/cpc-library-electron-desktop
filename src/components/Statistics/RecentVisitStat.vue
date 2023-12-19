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
import { defineComponent, onMounted, ref } from 'vue';

defineComponent({
  name: 'BooksTrend',
});

type ObjectData = {
  data_object: object;
}

const props = withDefaults(defineProps<ObjectData>(), {
  data_object: [] as Array<ObjectData>,
});

const categories = ref([]);
const series = ref([]);

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
    text: 'Most department online',
    align: 'left',
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: categories.value,
  },
};

onMounted(() => {
  props.data_object.map((item) => {
    const index = categories.value.indexOf(item.month.slice(0,3));
    if (index === -1) categories.value.push(item.month.slice(0,3));
  });

  props.data_object.forEach((item) => {
    if (series.value.length > 0) {
      const existingData = series.value.find((data) => data.name === item.department.toUpperCase());

      if (existingData) {
        // If the series with the same title exists, add another total record
        existingData.data.push(item.total_counts);
      } else {
        // If the series with the same title doesn't exist, add a new series
        series.value.push({ name: item.department.toUpperCase(), data: [item.total_counts] });
      }
    } else {
      // If series is empty, add a new series
      series.value.push({ name: item.department.toUpperCase(), data: [item.total_counts] });
    }
  });

})
</script>
