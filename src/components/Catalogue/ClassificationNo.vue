<template>
  <q-list>
    <q-item :key="id">
      <q-item-section>
        <div class="row">
          <span class="col-2">{{ ddc }}</span>
          <span clss="col-2">{{ name }}</span>
        </div>
      </q-item-section>
      <q-separator dark />
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
export interface ClassificationProps {
  id: number;
  ddc: string;
  name: string;
}

withDefaults(defineProps<ClassificationProps>(), {
  id: 0,
  ddc: '',
  name: '',
});
</script>
