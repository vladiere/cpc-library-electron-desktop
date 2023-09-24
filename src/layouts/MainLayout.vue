<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="bg-grey-2 text-grey-6 q-py-sm" bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="dark"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-uppercase">
          {{ routeName }}
        </q-toolbar-title>

        <div class="row q-gutter-x-lg text-uppercase content-center">
          <div class="row items-center q-gutter-x-xs cursor-pointer">
            <q-btn
              flat
              dens
              icon="mdi-calculator-variant-outline"
              label="stats"
              to="/stats"
            />
          </div>
          <div class="row items-center q-gutter-x-xs cursor-pointer">
            <q-btn-dropdown
              label="notifications"
              flat
              icon="fa-regular fa-bell"
            >
              <q-list dense bordered>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption lines="2"
                      >Secondary line text. Lorem ipsum dolor sit amet,
                      consectetur adipiscit elit.</q-item-label
                    >
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon name="star" color="yellow" />
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption lines="2"
                      >Secondary line text. Lorem ipsum dolor sit amet,
                      consectetur adipiscit elit.</q-item-label
                    >
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon name="star" color="yellow" />
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption lines="2"
                      >Secondary line text. Lorem ipsum dolor sit amet,
                      consectetur adipiscit elit.</q-item-label
                    >
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon name="star" color="yellow" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="row items-center q-gutter-x-xs cursor-pointer">
            <q-btn
              flat
              dense
              label="settings"
              icon="mdi-cog-outline"
              to="/settings"
            />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-grey-5 text-uppercase"
    >
      <q-list>
        <q-item-label header class="text-grey-1 text-h6">
          <q-img fit="contain" :src="appLogo" width="15%" />
          CPC Library
          <q-separator size="1px" class="q-mt-sm" dark />
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-11">
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>CPC Library</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useRoute } from 'vue-router';
import appLogo from 'src/assets/applogo.png';
import { useLibrarianDataStore } from 'src/stores/user';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const route = useRoute();
const routeName = ref<unknown>('');
const librarianStore = useLibrarianDataStore();
const $q = useQuasar();

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'dashboard',
    icon: 'mdi-abacus',
    link: '/dashboard',
  },
  {
    title: 'user profile',
    icon: 'mdi-account-tie',
    link: '/users',
  },
  {
    title: 'table list',
    icon: 'mdi-table-of-contents',
    link: '/tables',
  },
  {
    title: 'resources',
    icon: 'mdi-book-open-page-variant-outline',
    link: '/resources',
  },
  {
    title: 'circulations',
    icon: 'mdi-book-check',
    link: '/circulations',
  },
  {
    title: 'catalogue',
    icon: 'mdi-bookshelf',
    link: '/catalogue',
  },
  {
    title: 'acquisitions',

    icon: 'mdi-cart-outline',
    link: '/acquisitions',
  },
  {
    title: 'notifications',
    icon: 'mdi-bell-outline',
    link: '/notifications',
  },
  {
    title: 'logout',
    icon: 'mdi-logout',
    link: 'logout',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const getLibrarianDetails = async () => {
  try {
    const temp = new String($q.sessionStorage.getItem('token'));
    const token = temp?.split(' ')[1];
    const id = temp?.split(' ')[0];

    const response = await api.get(`get/librarian/${parseInt(id)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    librarianStore.initLibrarian(response.data[0]);

    console.log(response.data[0]);
  } catch (error: any) {
    throw new Error(error);
  }
};

onMounted(() => {
  getLibrarianDetails();
  routeName.value = route.name;
});

watchEffect(() => {
  routeName.value = route.name;
});
</script>
