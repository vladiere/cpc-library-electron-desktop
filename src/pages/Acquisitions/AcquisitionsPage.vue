<template>
  <q-page padding>
    <!-- content -->
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="bookpurchase" label="Book Purchase" />
        <q-tab name="contributors" label="Contributors" />
        <q-tab name="contributorsDetails" label="History" />
      </q-tabs>
      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
      >
        <q-tab-panel name="bookpurchase">
          <BookPurchaseComponent />
        </q-tab-panel>

        <q-tab-panel name="contributors">
          <q-virtual-scroll
            style="max-height: calc(100vh - 100%)"
            :items="contributorsList"
            separator
            v-slot="{ item, index }"
          >
            <ContributorsComponent :key="index" v-bind="item" @actionPerformed="handleActionPerformed" />
          </q-virtual-scroll>
            <div v-if="contributorsList.length === 0" class="text-h3 text-grey-7 text-weight-light column items-center q-my-xl">
              No Contributors as of now
            </div>
        </q-tab-panel>

        <q-tab-panel name="contributorsDetails">
          <div class="text-h3 text-weight-light text-grey-7 text-center flex flex-center" v-if="contributeHistory.length === 0">Contributors History is empty</div>
          <q-virtual-scroll
              style="max-height: calc(100vh - 100px)"
              :items="contributeHistory"
              separator
              v-slot="{ item, index }"
          >
            <ContributreHistory :key="index" v-bind="item" />
          </q-virtual-scroll>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, defineAsyncComponent, onMounted } from 'vue';
import { ContributorsProps } from 'components/Acquisitions/ContributorsComponent.vue';
import { api } from 'src/boot/axios';
import { LocalStorage, debounce } from 'quasar';
import { socket } from 'src/utils/socket';
import { useBookStore } from 'stores/book-store';
import { ContributeHistoryProps } from 'components/Acquisitions/ContributreHistory.vue';

defineComponent({
  name: 'AcquisitionsPage',
});

const tab = ref('bookpurchase');

const BookPurchaseComponent = defineAsyncComponent({
  loader: () => import('components/Acquisitions/BookPurchaseComponent.vue'),
  delay: 200,
  timeout: 2300,
  suspensible: false
});

const ContributorsComponent = defineAsyncComponent({
  loader: () => import('components/Acquisitions/ContributorsComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const ContributreHistory = defineAsyncComponent({
  loader: () => import('components/Acquisitions/ContributeHistory.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});
// Sample data
const contributorsList = ref<ContributorsProps>([]);
const contributeHistory = ref<ContributeHistoryProp>([]);
const bookStore = useBookStore();

const getContributors = debounce(async () => {
  try {
    const response = await api.post('/contributors/get/all', { file_status: 'pending' }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    })
    contributorsList.value = response.data;
  } catch (error) {
    throw error;
  }
}, 1500);

const handleActionPerformed = async (data: object) => {
  if (data) {
    await getContributors();
  }
}

onMounted(async () => {
  contributeHistory.value = bookStore.getEbooks;
  await getContributors();
  await socket.on('new_notification', async () => {
    await getContributors();
  })
});

</script>
