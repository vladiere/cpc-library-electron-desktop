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
                <div v-if="notifications.length > 0" class="column absolute-bottom-right ">
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

    <!-- <q-footer bordered class="bg-grey-7 text-white"> -->
    <!--   <q-toolbar> -->
    <!--     <q-toolbar-title> -->
    <!--       <FooterComponent /> -->
    <!--     </q-toolbar-title> -->
    <!--   </q-toolbar> -->
    <!-- </q-footer> -->
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useRoute, useRouter } from 'vue-router';
import appLogo from 'src/assets/applogo.png';
import { useLibrarianDataStore } from 'src/stores/user';
import { api } from 'src/boot/axios';
import { SessionStorage } from 'quasar';
import ListNotifications, {
  NotificationsProps,
} from 'src/components/Notify/ListNotifications.vue';
import FooterComponent from 'src/components/Footer/FooterComponent.vue';
import jwt_decode from 'jwt-decode';
import IDecodedModel from 'src/models/decodedModel';
import { socket } from 'src/utils/socket'

const route = useRoute();
const router = useRouter();
const routeName = ref<unknown>('');
const librarianStore = useLibrarianDataStore();
const loading = ref(true);

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
    title: 'logout',
    icon: 'mdi-logout',
    link: 'logout',
    visibility: true,
  },
]);

const leftDrawerOpen = ref(false);
const notifications = ref<NotificationsProps>([])
const unReadCounts = ref(0);
const decodedToken: IDecodedModel = jwt_decode(SessionStorage.getItem('token'));

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const getLibrarianDetails = async () => {
  try {

    const response = await api.post(
      '/get/librarian',
      { librarian_id: decodedToken.user_id, option: 'single' },
      {
        headers: {
          Authorization: `Bearer ${
            SessionStorage.getItem('token') as string
          }`,
        },
      }
    );

    librarianStore.initLibrarian(response.data[0]);

    const acquisitions = essentialLinks.value.find((item: any) => item.title === 'acquisitions')
    acquisitions.visibility = librarianStore.privilege === 'admin';
    const catalogue = essentialLinks.value.find((item: any) => item.title === 'catalogue')
    catalogue.visibility = librarianStore.privilege === 'admin';
  } catch (error: any) {
    router.push('/');
    throw new Error(error);
  }
};

const librarianNotifications = async () => {
  try {
    const response = await api.get('/notifications/librarian', {
      headers: {
        Authorization: `Bearer ${SessionStorage.getItem('token')}`
      }
    })
    notifications.value = response.data;
    unReadCounts.value = notifications.value.filter((item: any) => item.status === 'unread').length;
  } catch (error) {
    throw error;
  }
}


// Sort the notifications based on the "status" property
notifications.value.sort((a, b) => {
  // Convert status values to lowercase for case-insensitive sorting
  const statusA = a.status.toLowerCase();
  const statusB = b.status.toLowerCase();

  if (statusA < statusB) return 1;
  if (statusA > statusB) return -1;

  return 0;
});

const readAllNotifications = async () => {
  try {
    await api.get('/notifications/clear', {
      headers: {
        Authorization: `Bearer ${SessionStorage.getItem('token')}`
      }
    });
    notifications.value.filter((item: any) => item.status = 'read')
    unReadCounts.value = 0;
  } catch (error) {
    throw error;
  }
}


onMounted(() => {
  getLibrarianDetails();
  librarianNotifications();

  socket.on("new_notification", (data) => {
    if (data) {
      librarianNotifications();
    }
  })
  routeName.value = route.name;
});

watchEffect(() => {
  routeName.value = route.name;
});
</script>
