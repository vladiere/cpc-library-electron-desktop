<template>
  <div id="chart" class="shadow-2 q-pa-md text-capitalize">
    <apexchart
      type="bar"
      height="450"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

defineComponent({
  name: 'BooksTrendStat',
});

type ObjectData = {
  data_object: object;
}

const props = withDefaults(defineProps<ObjectData>(), {
  data_object: [] as Array<ObjectData>,
});


const categories = ref([]);
const series = ref<object>([]);

const chartOptions = {
  chart: {
    type: 'bar',
    height: 450,
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
    categories: categories.value,
  },
  title: {
    text: 'Popular borrowed books',
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

onMounted(() => {

  props.data_object.map((item) => {
    const index = categories.value.indexOf(item.month.slice(0, 3));
    if (index === -1) categories.value.push(item.month.slice(0, 3));
  });


  props.data_object.forEach((item) => {
    if (series.value.length > 0) {
      const existingData = series.value.find((data) => data.name === item.title);

      if (existingData) {
        // If the series with the same title exists, add another total record
        existingData.data.push(item.total_records);
      } else {
        // If the series with the same title doesn't exist, add a new series
        series.value.push({ name: item.title, data: [item.total_records] });
      }
    } else {
      // If series is empty, add a new series
      series.value.push({ name: item.title, data: [item.total_records] });
    }
  });

});
</script>
