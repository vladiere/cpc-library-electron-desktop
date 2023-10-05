<template>
  <q-page padding>
    <!-- content -->
    <q-tabs v-model="tab" align="justify" class="q-mb-md">
      <q-tab class="text-grey-7" name="booksubj" label="Book Subject" />
      <q-tab
        class="text-grey-7"
        name="classification"
        label="Classification Number"
      />
      <q-tab class="text-grey-7" name="others" label="Others" />
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="slide-down"
      transition-next="slide-down"
      class="bg-whte text-center shadow-2 rounded-borders"
    >
      <q-tab-panel name="booksubj" class="q-gutter-md">
        <div class="text-h6">Book Subject</div>
        <div class="column">
          <div class="row q-gutter-x-md">
            <div class="col">
              <q-select
                filled
                v-model="text"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                label="Accession No"
                :options="options"
                @filter="filterFn"
                @filter-abort="abortFilterFn"
                style="width: 250px"
                hint="With hide-selected and fill-input"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col">
              <q-input v-model="text" dense outlined label="Book subject" />
            </div>
            <div class="col">
              <q-input v-model="text" dense outlined label="DDC" />
            </div>
            <q-btn label="Add Subject" no-caps rounded color="primary" />
          </div>
        </div>
        <div class="col row q-gutter-x-lg q-ml-sm text-h6 text-bold">
          <span>Subject</span>
          <span>DDC</span>
          <span>Created</span>
        </div>
        <q-virtual-scroll
          style="max-height: 300px"
          :items="bookSubject"
          separator
          v-slot="{ item, index }"
        >
          <BookSubject :key="index" v-bind="item" />
        </q-virtual-scroll>
      </q-tab-panel>

      <q-tab-panel name="classification" class="q-gutter-md">
        <div class="text-h6">Dewey Decimal Classification</div>
        <q-virtual-scroll
          style="max-height: 300px"
          :items="categories"
          separator
          v-slot="{ item, index }"
        >
          <ClassificationNo :key="index" v-bind="item" />
        </q-virtual-scroll>
      </q-tab-panel>

      <q-tab-panel name="others" class="gutter-md">
        <div class="text-h6">Formats</div>
        <div class="column items-start q-gutter-y-md">
          <q-input v-model="text" label="Add new Format" outlined />
          <q-btn color="primary" label="Add Format" />
        </div>
        <div class="text-h6">Avalable Formats</div>

        <div class="q-ml-xs q-my-md row q-gutter-x-md">
          <span>No.</span>
          <span>Format</span>
        </div>
        <q-virtual-scroll
          style="max-height: 300px"
          :items="ebookFormats"
          separator
          v-slot="{ item, index }"
        >
          <FormatsComponent :key="index" v-bind="item" />
        </q-virtual-scroll>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import BookSubject, {
  BookSubjectProps,
} from 'src/components/Catalogue/BookSubject.vue';
import ClassificationNo, {
  ClassificationProps,
} from 'src/components/Catalogue/ClassificationNo.vue';
import FormatsComponent, {
  FormatsProps,
} from 'src/components/Catalogue/FormatsComponent.vue';
import IBookModel from 'src/models/bookModel';
import { api } from 'src/boot/axios';
import { SessionStorage } from 'quasar';

defineComponent({
  name: 'CataloguePage',
});

const tab = ref('booksubj');
const text = ref('');
const options = ref<IBookModel[]>([]);
let dataOptions: IBookModel[] = [];

// Sample data
const bookSubject: BookSubjectProps[] = [
  {
    id: 1,
    subject: 'History',
    ddc: '900',
    created: '2023-09-10',
  },
  {
    id: 2,
    subject: 'Science',
    ddc: '500',
    created: '2023-09-09',
  },
  {
    id: 3,
    subject: 'Literature',
    ddc: '800',
    created: '2023-09-08',
  },
  {
    id: 4,
    subject: 'Mathematics',
    ddc: '510',
    created: '2023-09-07',
  },
  {
    id: 5,
    subject: 'Art',
    ddc: '700',
    created: '2023-09-06',
  },
];

const categories: ClassificationProps[] = [
  {
    id: 1,
    ddc: '001-099',
    name: 'Generalities',
  },
  { id: 2, ddc: '100-199', name: 'Philosophy' },
  { id: 3, name: '200-299 Religion', ddc: '200-299' },
  {
    id: 4,
    ddc: '300-399',
    name: 'Social Science',
  },
  { id: 5, ddc: '400-499', name: 'Languages' },
  {
    id: 6,
    ddc: '500-599',
    name: 'Natural Science',
  },
  {
    id: 7,
    ddc: '600-699',
    name: 'Applied Science',
  },
  {
    id: 8,
    ddc: '700-799',
    name: 'Arts And Recreation',
  },
  { id: 9, ddc: '800-899', name: 'Literature' },
  {
    id: 10,
    ddc: '900-999',
    name: 'Geography And History',
  },
  {
    id: 11,
    ddc: '92-920',
    name: 'Biography And Collective Biography',
  },
];

const ebookFormats: FormatsProps[] = [
  {
    id: 1,
    format: 'PDF',
  },
  {
    id: 2,
    format: 'EPUB',
  },
  {
    id: 3,
    format: 'MOBI',
  },
  {
    id: 4,
    format: 'AZW3',
  },
  {
    id: 5,
    format: 'TXT',
  },
  {
    id: 6,
    format: 'HTML',
  },
  {
    id: 7,
    format: 'CBZ',
  },
  {
    id: 8,
    format: 'FB2',
  },
  {
    id: 9,
    format: 'LIT',
  },
  {
    id: 10,
    format: 'PDB',
  },
];

const getBooksList = async () => {
  try {
    const response = await api.get('/get/all/books', {
      headers: {
        Authorization: `Bearer ${SessionStorage.getItem('token') as string}`,
      },
    });

    dataOptions = response.data;
    response.data.map((item: any) => console.log(item));
    console.log(dataOptions);
  } catch (error: any) {
    throw new Error(error);
  }
};

const filterFn = (val: any, update: any, abort: any) => {
  // call abort() at any time if you can't retrieve data somehow
  setTimeout(() => {
    update(() => {
      if (val === '') {
        options.value = dataOptions;
      } else {
        const needle = val.toLowerCase();
        options.value = dataOptions.filter(
          (v: any) => v.toLowerCase().indexOf(needle) > -1
        );
      }
    });
  }, 1500);
};

const abortFilterFn = () => {
  // console.log('delayed filter aborted')
  console.log('aborted');
};
onMounted(() => {
  getBooksList();
});
</script>
