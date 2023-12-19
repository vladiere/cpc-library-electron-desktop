<template>
  <div class="fullscreen absolute-full bg-blue-2 justify-center column items-center" style="z-index: 11000">
    <div class="text-h1 text-blue-8 text-weight-bolder">CPC Library</div>
    <q-img :src="bookGIF" width="150px"/>
    <q-spinner-hourglass
      color="primary"
      size="2em"
    />
  </div>
</template>
<script setup lang="ts">
  import { defineComponent } from 'vue';
  import bookGIF from 'src/assets/lineal-book.gif';

  defineComponent({
    name: 'LoadingComponent'
  });
</script>
