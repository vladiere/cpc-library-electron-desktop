<template>
  <q-list>
    <q-item class="text-capitalize">
      <q-item-section avatar top>
        <q-avatar class="bg-primary text-white">{{
          name.split('')[0]
        }}</q-avatar>
      </q-item-section>

      <q-item-section top class="col-2 gt-sm">
        <q-item-label class="q-mt-sm">{{ name }}</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">[ {{ title }} ]</span>
          <span class="text-grey-8"> - {{ status }}</span>
        </q-item-label>
        <q-item-label caption lines="1"> Date: {{ date }} </q-item-label>
        <q-item-label
          lines="1"
          class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
        >
          <span class="cursor-pointer">Open in File</span>
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn class="gt-xs" size="12px" flat dense round icon="mdi-delete">
            <q-tooltip class="bg-red-5 text-white">Delete</q-tooltip>
          </q-btn>
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="mdi-check-all"
          >
            <q-tooltip class="bg-green-5 text-white">Accept</q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
    </q-item>

    <q-separator inset spaced />
  </q-list>
</template>

<script setup lang="ts">
export interface ContributorsProps {
  id: number;
  title: string;
  date: string;
  status: string;
  name: string;
}

withDefaults(defineProps<ContributorsProps>(), {
  id: 0,
  title: '',
  date: '',
  status: '',
  name: '',
});
</script>
