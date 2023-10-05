<template>
  <q-list bordered class="rounded-borders text-capitalize shadow-2">
    <q-item-label header>Renewals of books</q-item-label>

    <q-item>
      <q-item-section avatar top>
        <q-avatar color="primary" text-color="white" class="text-uppercase">
          r
        </q-avatar>
      </q-item-section>

      <q-item-section top class="col-2 gt-sm">
        <q-item-label class="q-mt-sm">Rhaeanne</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">[ the seven dwarfs ]</span>
          <span class="text-grey-8"> - another 2 days</span>
        </q-item-label>
        <q-item-label caption lines="1">
          @rstoenescu in #3: > Generic type parameter for props
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete">
            <q-tooltip :delay="300" class="bg-red-5 text-grey-2"
              >Remove</q-tooltip
            >
          </q-btn>
          <q-btn class="gt-xs" size="12px" flat dense round icon="done">
            <q-tooltip :delay="300" class="bg-teal-5 text-grey-2"
              >Accept</q-tooltip
            >
          </q-btn>
          <q-btn size="12px" flat dense round icon="more_vert">
            <q-tooltip class="bg-grey-5 text-grey-10">More</q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item>
      <q-item-section avatar top>
        <q-avatar color="primary" text-color="white" class="text-uppercase">
          c
        </q-avatar>
      </q-item-section>

      <q-item-section top class="col-2 gt-sm">
        <q-item-label class="q-mt-sm">cherinne</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">[ the 99 stories ]</span>
          <span class="text-grey-8"> - another 2 days</span>
        </q-item-label>
        <q-item-label caption lines="1">
          @rstoenescu in #3: > Generic type parameter for props
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete">
            <q-tooltip :delay="300" class="bg-red-5 text-grey-2"
              >Remove</q-tooltip
            >
          </q-btn>
          <q-btn class="gt-xs" size="12px" flat dense round icon="done">
            <q-tooltip :delay="300" class="bg-teal-5 text-grey-2"
              >Accept</q-tooltip
            >
          </q-btn>
          <q-btn size="12px" flat dense round icon="more_vert">
            <q-tooltip class="bg-grey-5 text-grey-10">More</q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
defineComponent({
  name: 'RenewalComponent',
});
</script>
