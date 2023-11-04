<template>
  <div
    class="column bg-white q-px-lg q-py-md shadow-2 flex"
    style="border-radius: 5px; width: 23%"
  >
    <div class="row justify-between fit">
      <q-icon :name="img" size="5rem" color="blue-9" />

      <div class="column text-right">
        <span> {{ title }} </span>
        <span class="text-h5"> {{ count }} </span>
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
}

withDefaults(defineProps<CardsProps>(), {
  title: '',
  icon: '',
  name: '',
  label: '',
  count: 0,
});
</script>
