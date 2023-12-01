<template>
  <div
    id="chart"
    class="q-pa-md shadow-2 bg-white text-capitalize"
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
import { defineComponent, computed, onMounted, ref } from 'vue';

defineComponent({
  name: 'TrendChart',
});

interface DataObjectProperties {
  title: string;
  most_checkedout: number;
}

interface DataObject {
  data_object: DataObjectProperties[];
}

const props = withDefaults(defineProps<DataObject>(), {
  data_object: [] as Array<DataObject>,
});

var categories = ref([]);
const data = ref([]);
const series = computed(() => [ { name: 'Total Count', data: data } ]);
const chartOptions = ref({})

const setDatas = () => {
  props.data_object.map((item) => {
    categories.value.push(item.title);
    data.value.push(item.most_checkedout);
  })
}


onMounted(() => {
  setDatas();

  chartOptions.value = {
    chart: {
      type: 'bar',
      height: 350,
    },
    title: {
      text: 'Trending Books',
      align: 'center',
      floating: true,
    },
    subtitle: {
      text: 'Books that are highly sought after and frequently out of stock.',
      align: 'center',
    },
    plotOptions: {
      bar: {
        barHeight: '90%',
        distributed: true,
        borderRadius: 4,
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        }
      },
    },
    colors: [ '#1976d2', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7' ],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return ''
          }
        }
      }
    }
  };
})
</script>
