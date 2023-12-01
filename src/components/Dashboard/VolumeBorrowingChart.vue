<template>
  <div id="chart" class="col-5 shadow-2" style="border-radius: 5px">
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
  name: 'OnlineChart',
});

interface DataObjectProperties {
  department: string;
  total_checkedouts: number;
}

interface DataObject {
  data_object: DataObjectProperties[];
}

const props = withDefaults(defineProps<DataObject>(), {
  data_object: [] as Array<DataObject>,
});

const series = ref([{ name: 'Total borrow', data: [] }]);
const categories = ref([]);
const chartOptions = ref({});

onMounted(() => {
  props.data_object.map((item) => {
    series.value[0].data.push(parseInt(item.total_checkouts))
    categories.value.push(item.department.toUpperCase());
  });

  chartOptions.value = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
      dataLabels: {
        enabled: false
      },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Busy book-borrowing department',
      align: 'center'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: categories.value,
    }
  }
})
</script>
