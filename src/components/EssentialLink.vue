<template>
  <q-item clickable v-ripple :to="handleClick(link)" active-class="text-grey-1">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" size="34px" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useLibrarianDataStore } from 'stores/user';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  title: '',
  caption: '',
  link: '#',
  icon: '',
});

const librarianStore = useLibrarianDataStore();

const handleClick = (link: string) => {
  if (link === 'logout') {
    librarianStore.clearLibrarian();
    return '/';
  } else {
    return link;
  }
};
</script>
