<template>
  <q-item
    clickable
    v-ripple
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
  </q-item>
</template>

<script setup lang="ts">
import { useLibrarianDataStore } from 'stores/user';
import { SessionStorage } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

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
const router = useRouter();

const handleClick = async (link: string) => {
  console.log(link);

  if (link === 'logout') {
    const response = await api.post(
      '/logout/librarian',
      { refreshToken: SessionStorage.getItem('refresh') as string },
      {
        headers: {
          Authorization: `Bearer ${SessionStorage.getItem('token') as string}`,
        },
      }
    );

    if (response.data !== '') {
      librarianStore.clearLibrarian();
      SessionStorage.clear();
      router.push('/');
    } else {
      console.log(response.data);
    }
  }
};
</script>
