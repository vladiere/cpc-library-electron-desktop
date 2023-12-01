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
import { defineComponent, ref, onMounted } from 'vue';

defineComponent({
  name: 'RecentVisitChart',
});

interface DataObjectProperties {
  department: string;
  online: number;
}

interface DataObject {
  data_object: DataObjectProperties[];
}

const props = withDefaults(defineProps<DataObject>(), {
  data_object: [] as Array<DataObject>,
});

const series = ref([]);
const labels = ref([]);
const chartOptions = ref({});

onMounted(() => {
  props.data_object.map((item) => {
    series.value.push(item?.online)
    labels.value.push(item.department.toUpperCase())
  });

  chartOptions.value = {
    chart: {
      width: 450,
      type: 'pie',
    },
    title: {
      text: 'Departmental online',
      align: 'center',
    },
    labels: labels.value,
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
  }
})
</script>
