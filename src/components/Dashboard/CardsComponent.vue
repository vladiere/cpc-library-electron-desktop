<template>
  <div
    class="column bg-white q-px-lg q-py-md shadow-2 flex"
    style="border-radius: 5px; width: 23%"
  >
    <div class="row justify-between fit">
      <q-icon :name="img" size="5rem" color="blue-9" />

      <div class="column text-right">
        <span> {{ title }} </span>
        <span class="text-h5" v-if="!loading"> {{ formatNumber(count) }} </span>
        <q-spinner-oval class="self-end q-mt-sm" color="primary" size="1.5em" v-if="loading"/>
      </div>
    </div>

    <hr style="width: 100%" />

    <div
      class="row items-center q-gutter-x-xs text-grey-7"
      style="font-size: 12px"
    >
      <q-icon :name="icon" size="16px" />
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CardsProps {
  title: string;
  icon: string;
  img: string;
  label: string;
  count: number;
  loading: boolean;
}

withDefaults(defineProps<CardsProps>(), {
  title: '',
  icon: '',
  name: '',
  label: '',
  count: 0,
  loading: false,
});

const formatNumber = (total_fees: number) => {
  if (total_fees < 1000) {
    return total_fees.toString();
  } else if (total_fees < 1000000) {
    return (total_fees / 1000).toFixed(1) + 'k';
  } else {
    return (total_fees / 1000000).toFixed(1) + 'M';
  }
}
</script>
