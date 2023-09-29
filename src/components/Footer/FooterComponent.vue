<template>
  <div class="column text-subtitle1 q-pa-sm">
    <div class="col-3 items-center row q-gutter-x-md">
      <div class="col column q-gutter-y-sm">
        <div class="row items-center q-gutter-x-sm">
          <q-img src="src/assets/applogo.png" style="width: 10%" />
          <span class="text-bold"> CPC Library </span>
        </div>
        <span>Providing Knowledge Since 2020</span>
        <span>Proudly Serving the CPC Community</span>
      </div>
      <div class="col column q-gutter-y-sm">
        <span>School CPC Founded in March 2005</span>
        <span>CPC Library Establish in July 2020</span>
      </div>
      <div class="col column q-mt-md">
        <div class="row q-gutter-x-sm">
          <span class="text-bold">Address: </span>
          <span>Cordova, Poblacion, 6017, Cebu</span>
        </div>
        <div class="row q-gutter-x-sm">
          <span class="text-bold">Phone: </span>
          <span>(032) 494 1410</span>
        </div>
        <div class="row q-gutter-x-sm">
          <span class="text-bold">Email: </span>
          <span>cpc.library@gmail.com</span>
        </div>
      </div>
    </div>
    <div class="col self-center">
      <span class="text-bold">© 2023 CPC Library. All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'FooterComponent',
});
</script>
