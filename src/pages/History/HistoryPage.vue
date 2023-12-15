<template>
  <q-page padding class="q-pb-xl">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="transactionhistory" label="Book Transactions" />
        <q-tab name="contributionshistory" label="Contributions" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-grey-2">
        <q-tab-panel name="transactionhistory" class="q-pa-none">
          <HistoryReturned />
        </q-tab-panel>

        <q-tab-panel name="contributionshistory">
          <div class="text-h3 text-weight-light text-grey-7 text-center flex flex-center q-mt-lg" v-if="contributeHistory.length === 0">Contributors History is empty</div>

          <div v-if="contributeHistory.length !== 0" class="row q-gutter-x-md q-ml-xs q-mb-md">
            <q-input flat dense outlined @blur="search = ''" v-model="search" placeholder="Search...">
              <template v-slot:append>
                <q-icon :name="!search ? 'mdi-magnify' : 'mdi-close-circle'" @click="search = ''" class="cursor-pointer"/>
              </template>
            </q-input>
            <q-btn-dropdown flat dense no-caps label="Categories" dropdown-icon="mdi-chevron-down">
              <q-list separator style="max-height: 35vh">
                <q-item clickable v-close-popup @click="filter = ''">
                  <q-item-section>
                    <q-item-label>All</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-for="category in categories" :key="category" clickable v-close-popup @click="filter = category">
                  <q-item-section>
                    <q-item-label>{{ category }}</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>
          </div>

          <div class="text-h3 text-weight-light text-grey-7 text-center flex flex-center q-mt-lg" v-if="contributelist.length === 0 && contributeHistory.length !== 0">No search found</div>

          <q-virtual-scroll
              style="max-height: calc(100vh - 100px)"
              :items="contributelist"
              separator
              v-slot="{ item, index }"
          >
            <ContributreHistory :key="index" v-bind="item" />
          </q-virtual-scroll>
        </q-tab-panel>
      </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, computed, onMounted, ref } from 'vue'
import { ContributeHistoryProps } from 'components/Acquisitions/ContributeHistory.vue';
import { useBookStore } from 'stores/book-store';

defineComponent({
  name: 'HistoryPage'
});


const ContributreHistory = defineAsyncComponent({
  loader: () => import('components/Acquisitions/ContributeHistory.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const HistoryReturned = defineAsyncComponent({
  loader: () => import('components/CheckedInOut/HistoryBookComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const tab = ref('transactionhistory');
const contributeHistory = ref<ContributeHistoryProps>([]);
const bookStore = useBookStore();
const categories = ref([]);
const search = ref('');
const filter = ref('');

const contributelist = computed(() => {
  if (search.value.toLowerCase() === '' && filter.value.toLowerCase() === '') {
    return contributeHistory.value;
  }
  if (search.value.toLowerCase() === '' && filter.value.toLowerCase() !== '') {
    return contributeHistory.value.filter(book =>
      Object.values(book).some(value => String(value).toLowerCase().includes(filter.value.toLowerCase()))
    );
  }

  if (search.value.toLowerCase() !== '' && filter.value.toLowerCase() === '') {
    return contributeHistory.value.filter(book =>
      Object.values(book).some(value => String(value).toLowerCase().includes(search.value.toLowerCase()))
    );
  }

  return contributeHistory.value;
})

onMounted(() => {
  contributeHistory.value = bookStore.getEbooks;
  console.log(contributeHistory.value)

  contributeHistory.value.map((item) => {
    const temp = item.category_name.split(', ');
    temp.forEach((cat) => {
      const index = categories.value.indexOf(cat);
      if (index === -1) categories.value.push(cat)
    })
  });
})
</script>
