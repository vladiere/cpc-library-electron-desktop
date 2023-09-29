<template>
  <q-item :key="id" dense>
    <q-item-section>
      <q-item-label>
        <div class="row justify txt-left">
          <div class="col-1">
            <span>{{ subject }}</span>
          </div>
          <div class="col-1">
            <span>{{ ddc }}</span>
          </div>
          <div class="col-1">
            <span>{{ created }}</span>
          </div>
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface BookSubjectProps {
  id: number;
  subject: string;
  ddc: string;
  created: string;
}

withDefaults(defineProps<BookSubjectProps>(), {
  id: 0,
  subject: '',
  ddc: '',
  create: '',
});
</script>
