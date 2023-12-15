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
import { defineComponent, ref, onMounted } from 'vue';

defineComponent({
  name: 'OnlineUsers',
});

type ObjectData = {
  data_object: object;
}

const props = withDefaults(defineProps<ObjectData>(), {
  data_object: [] as Array<ObjectData>,
});

const categories = ref([]);
const data = ref([]);
const series = ref([{
  name: 'Amount',
  data: data,
}]);


const chartOptions = {
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#77B6EA', '#545454'],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Fines and Fees',
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: categories.value,
    title: {
      text: 'Month'
    }
  },
  yaxis: {
    title: {
      text: 'Fines & Fees'
    },
    min: 5,
    max: 40
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
}

onMounted(() => {
  props.data_object.map((item) => {
    const index = categories.value.indexOf(item.month.slice(0,3));
    if (index === -1) categories.value.push(item.month.slice(0,3));

    data.value.push(parseFloat(item.total_amount));
  });

})
</script>
