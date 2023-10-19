<template>
  <q-list class="text-capitalize">
    <q-item>
      <q-item-section>
        <q-item-label lines="1">{{ title }}</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">Source: </span>
          {{ source }}
          <span class="text-weight-bold">Cost Price: </span>
          {{ cost }}
          <span class="text-weight-bold">Note: </span>
          {{ notes }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{
          formatDateToHumanReadable(acquisition_date)
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator inset />
  </q-list>
</template>

<script setup lang="ts">
import formatDateToHumanReadable from 'src/functions/formattedDated';
export interface BookPurchaseRecordsProps {
  accession_no: any;
  acquisition_date: string;
  acquisition_id: any;
  book_condition: string;
  cost: any;
  notes: string;
  source: string;
  title: string;
}

withDefaults(defineProps<BookPurchaseRecordsProps>(), {
  accession_no: 0,
  acquisition_date: '',
  acquisition_id: 0,
  book_condition: '',
  cost: 0,
  notes: '',
  source: '',
  title: '',
});
</script>
