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
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
      >
        <q-tab-panel name="bookpurchase">
          <div class="text-h6">Book Purchase</div>
          <div class="column q-gutter-y-md">
            <div class="row q-gutter-x-md">
              <div class="col columnd q-gutter-y-md">
                <q-input v-model="text" outlined label="Book Title" />
                <q-input
                  v-model="text"
                  outlined
                  label="Quantity"
                  type="number"
                  min="0"
                />
              </div>
              <div class="col column q-gutter-y-md">
                <q-input
                  v-model="text"
                  outlined
                  label="Price"
                  type="number"
                  min="0"
                />
                <q-input outlined v-model="date" label="Date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row self-center">
              <q-btn label="Add Book Purchase" color="primary" rounded />
            </div>

            <div class="column q-gutter-y-md">
              <span class="text-subtitle">Recent Purchases</span>
              <q-virtual-scroll
                style="max-height: 50vh"
                :items="bookPurchaseRecords"
                separator
                v-slot="{ item, index }"
              >
                <BookPurchase :key="index" v-bind="item" />
              </q-virtual-scroll>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="contributors">
          <span class="text-subtitle">Contributors</span>
          <q-virtual-scroll
            style="max-height: 50vh"
            :items="contributors"
            separator
            v-slot="{ item, index }"
          >
            <Contributors :key="index" v-bind="item" />
          </q-virtual-scroll>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import BookPurchase, {
  BookPurchaseRecordsProps,
} from 'src/components/Acquisitions/BookPurchase.vue';
import Contributors, {
  ContributorsProps,
} from 'src/components/Acquisitions/ContributorsComponent.vue';

defineComponent({
  name: 'AcquisitionsPage',
});

const currentDate: Date = new Date();
const tab = ref('bookpurchase');
const text = ref('');
const date = ref(currentDate.toLocaleDateString());

// Sample data
const bookPurchaseRecords: BookPurchaseRecordsProps[] = [
  {
    id: 1,
    title: 'Book A',
    quantity: 2,
    price: 20.0,
    date: '2023-09-10',
  },
  {
    id: 2,
    title: 'Book B',
    quantity: 1,
    price: 15.0,
    date: '2023-09-09',
  },
  {
    id: 3,
    title: 'Book C',
    quantity: 3,
    price: 30.0,
    date: '2023-09-08',
  },
  {
    id: 4,
    title: 'Book D',
    quantity: 2,
    price: 25.0,
    date: '2023-09-07',
  },
  {
    id: 5,
    title: 'Book E',
    quantity: 1,
    price: 10.0,
    date: '2023-09-06',
  },
  {
    id: 6,
    title: 'Book F',
    quantity: 4,
    price: 40.0,
    date: '2023-09-05',
  },
  {
    id: 7,
    title: 'Book G',
    quantity: 2,
    price: 20.0,
    date: '2023-09-04',
  },
  {
    id: 8,
    title: 'Book H',
    quantity: 3,
    price: 30.0,
    date: '2023-09-03',
  },
  {
    id: 9,
    title: 'Book I',
    quantity: 2,
    price: 25.0,
    date: '2023-09-02',
  },
  {
    id: 10,
    title: 'Book J',
    quantity: 1,
    price: 12.0,
    date: '2023-09-01',
  },
];

// Sample data
const contributors: ContributorsProps[] = [
  {
    id: 1,
    title: 'the seven deads',
    date: '2023-09-10',
    status: 'recommend this',
    name: 'John Doe',
  },
  {
    id: 2,
    title: 'you and only you',
    date: '2023-09-09',
    status: 'add this',
    name: 'Jane Smith',
  },
  {
    id: 3,
    title: 'functional programmin',
    date: '2023-09-08',
    status: 'recommend this',
    name: 'Alice Johnson',
  },
  {
    id: 4,
    title: 'advance OOP',
    date: '2023-09-07',
    status: 'recommend this',
    name: 'Bob Brown',
  },
  {
    id: 5,
    title: 'thinking out of the box',
    date: '2023-09-06',
    status: 'add this',
    name: 'Eve White',
  },
  {
    id: 6,
    title: 'everything is encoded',
    date: '2023-09-05',
    status: 'recommend this',
    name: 'Charlie Green',
  },
];
</script>
