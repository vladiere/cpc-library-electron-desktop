<template>
  <q-item
    clickable
    v-ripple
    v-if="visibility"
    :to="link"
    @click="handleClick(link)"
    active-class="text-grey-1"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" size="34px" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>

    <q-tooltip class="bg-grey-10 text-grey-2" :delay="300" anchor="bottom right" self="top middle">{{ title }}</q-tooltip>
  </q-item>
</template>

<script setup lang="ts">
import { useLibrarianDataStore } from 'stores/user';
import { LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  visibility: false;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  title: '',
  caption: '',
  link: '#',
  icon: '',
  visibility: false
});

const librarianStore = useLibrarianDataStore();
const router = useRouter();

const handleClick = async (link: string) => {
  if (link === 'logout') {
    const response = await api.post(
      '/logout/librarian',
      { refreshToken: LocalStorage.getItem('refresh') as string },
      {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token') as string}`,
        },
      }
    );

    if (response.data !== '') {
      librarianStore.clearLibrarian();
      LocalStorage.clear();
      router.push('/');
    } else {
      console.log(response.data);
    }
  }
};

</script>
