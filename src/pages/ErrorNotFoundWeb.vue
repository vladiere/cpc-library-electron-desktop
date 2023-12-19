<template>
  <div
    class="fullscreen bg-grey-14 column text-h4 text-white text-center q-pa-md flex flex-center"
  >
    <div class="row q-gutter-x-lg items-center content-center">
      <q-img class="col" src="/notfound.svg" style="width: 100px" />
      <div class="col column q-gutter-y-md">
        <span class="col">404 | Not found...</span>
        <span class="col text-h6"
          >Sorry, the page you are looking for could not be found on this
          server.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'ErrorNotFoundInWeb',
});
</script>
