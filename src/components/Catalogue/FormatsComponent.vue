<template>
  <q-list>
    <q-item>
      <q-item-section>
        <div class="row q-gutter-x-lg">
          <span>#{{ id }}</span>
          <span>{{ format }}</span>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
export interface FormatsProps {
  id: number;
  format: string;
}

withDefaults(defineProps<FormatsProps>(), {
  id: 0,
  format: '',
});
</script>
