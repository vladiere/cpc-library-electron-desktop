<template>
  <q-list>
    <q-item>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption lines="2"
          >Quantity: {{ quantity }} Price: {{ price }}</q-item-label
        >
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>{{ date }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator inset />
  </q-list>
</template>

<script setup lang="ts">
export interface BookPurchaseRecordsProps {
  id: number;
  title: string;
  quantity: number;
  price: number;
  date: string;
}

withDefaults(defineProps<BookPurchaseRecordsProps>(), {
  id: 0,
  title: '',
  quantity: 0,
  price: 0,
  date: '',
});
</script>
