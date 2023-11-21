<template>
  <q-item>
    <q-item-section>
      <q-item-label overline class="text-uppercase">{{ fullname }} - {{ department }}</q-item-label>
      <q-item-label>{{ wordFormatter(file_title) }} - {{ wordFormatter(category_name) }}</q-item-label>
      <q-item-label caption lines="3">{{ wordFormatter(file_description) }}</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>{{ uploaded_date }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
  import { format } from 'quasar';

  export interface ContributeHistroProps {
    author_fullname: string;
    category_name: string;
    file_title: string;
    fullname: string;
    department: string;
    file_description: string;
    uploaded_date: string;
  }

  withDefaults(defineProps<ContributeHistroProps>(), {
    author_fullname: '',
    category_name: '',
    file_title: '',
    fullname: '',
    department: '',
    file_description: '',
    uploaded_date: '',
  });

  const wordFormatter = (word: string) => {
    return format.capitalize(word);
  }
</script>
