<template>
  <q-layout view="lHh Lpr lff" :loading="loading">
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
          <div class="row relative-position items-center q-gutter-x-xs cursor-pointer">
            <q-badge v-if="unReadCounts > 0" color="negative" class="z-top" floating>{{ unReadCounts }}</q-badge>
            <q-btn-dropdown
              flat
              rounded
              dense
              :dropdown-icon="unReadCounts > 0 ? 'mdi-bell-ring' : 'mdi-bell-outline'"
              :color="unReadCounts > 0 ? 'warning' : undefined"
              no-icon-animation
            >
              <q-virtual-scroll
                style="max-height: 300px; overflow-x: hidden; max-width: 450px"
                :items="notifications"
                separator
                v-slot="{ item, index }"
              >
                <ListNotifications :key="index" v-bind="item" />
              </q-virtual-scroll>
                <div v-if="notifications.length === 0" class="column items-center q-pa-md text-grey-7">
                  Empty notifications
                </div>
                <div v-if="notifications.length > 0" class="column absolute-bottom-right q-mr-md q-mb-sm">
                  <q-icon name="mdi-broom" size="2em" color="blue-9" class="cursor-pointer" @click="readAllNotifications">
                    <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">
                     Read all
                    </q-tooltip>
                  </q-icon>
                </div>
            </q-btn-dropdown>
          </div>
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
      :mini="miniState"
      :width="250"
      :breakpoint="500"
      class="bg-primary text-grey-5 text-uppercase"
    >
      <q-list padding>
        <q-item v-ripple>
          <q-item-section header avatar>
            <q-img fit="contain" :src="appLogo" width="35px" style="border-radius: 50%" />
          </q-item-section>

          <q-item-section class="text-grey-1 text-h6">
            CPC Library
          </q-item-section>

          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300" anchor="bottom right" self="top middle">CPC Library</q-tooltip>
        </q-item>

        <q-separator size="1px" class="q-mt-sm" dark />

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
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useRoute } from 'vue-router';
import appLogo from 'src/assets/applogo.png';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';
import ListNotifications, {
  NotificationsProps,
} from 'src/components/Notify/ListNotifications.vue';
import jwt_decode from 'jwt-decode';
import { socket } from 'src/utils/socket';
import books from 'src/utils/books';

const route = useRoute();
const routeName = ref<unknown>('');
const loading = ref(true);
const miniState = ref(true);

const essentialLinks = ref<EssentialLinkProps>([
  {
    title: 'dashboard',
    icon: 'mdi-abacus',
    link: '/dashboard',
    visibility: true,
  },
  {
    title: 'user profile',
    icon: 'mdi-account-tie',
    link: '/users',
    visibility: true,
  },
  {
    title: 'table list',
    icon: 'mdi-table-of-contents',
    link: '/tables',
    visibility: true,
  },
  {
    title: 'resources',
    icon: 'mdi-book-open-page-variant-outline',
    link: '/resources',
    visibility: true,
  },
  {
    title: 'circulations',
    icon: 'mdi-book-check',
    link: '/circulations',
    visibility: true,
  },
  {
    title: 'checked out & return',
    icon: 'mdi-notebook-check-outline',
    link: '/checkedout_return',
    visibility: true,
  },
  {
    title: 'catalogue',
    icon: 'mdi-bookshelf',
    link: '/catalogue',
    visibility: true,
  },
  {
    title: 'acquisitions',
    icon: 'mdi-cart-outline',
    link: '/acquisitions',
    visibility: true,
  },
  {
    title: 'history',
    icon: 'mdi-history',
    link: '/history',
    visibility: true,
  },
  {
    title: 'logout',
    icon: 'mdi-logout',
    link: 'logout',
    visibility: true,
  },
]);

const leftDrawerOpen = ref(false);
const notifications = ref<NotificationsProps>([])
const unReadCounts = ref(0);
const decodedToken = jwt_decode(LocalStorage.getItem('token'));

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = true;
  miniState.value = !miniState.value;
}

const checkLibrarianIsAdmin = async () => {
  const acquisitions = essentialLinks.value.find((item: unknown) => item.title === 'acquisitions')
  acquisitions.visibility = decodedToken.privilege === 'admin';
  const catalogue = essentialLinks.value.find((item: unknown) => item.title === 'catalogue')
  catalogue.visibility = decodedToken.privilege === 'admin';
};

const librarianNotifications = async () => {
  try {
    const response = await api.get('/notifications/librarian', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    })
    notifications.value = response.data;
    unReadCounts.value = notifications.value.filter((item: unknown) => item.status === 'unread').length;

    // Sort the notifications based on the "status" property
    notifications.value.sort((a, b) => {
      // Convert status values to lowercase for case-insensitive sorting
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();

      if (statusA < statusB) return 1;
      if (statusA > statusB) return -1;

      return 0;
    });
  } catch (error) {
    throw error;
  }
}


const readAllNotifications = async () => {
  try {
    await api.get('/notifications/clear', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    });
    notifications.value.filter((item: unknown) => item.status = 'read')
    unReadCounts.value = 0;
  } catch (error) {
    throw error;
  }
}


onMounted(async () => {
  await books.getAllContributorsBooks();
  await checkLibrarianIsAdmin();
  await librarianNotifications();

  await socket.on('new_notification', async (data) => {
    if (data) {
      await librarianNotifications();
    }
  })
  routeName.value = route.name;
});

watchEffect(() => {
  routeName.value = route.name;
});
</script>
