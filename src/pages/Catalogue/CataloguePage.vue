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
                outlined
                use-input
                :input-debounce="0"
                dense
                v-model="form.accession_no"
                label="Accession No."
                :options="options"
                @filter="filterFn"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey-8">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col">
              <q-input
                v-model="form.book_subject"
                dense
                outlined
                label="Book subject"
              />
            </div>
            <div class="col">
              <q-input v-model="form.ddc_code" dense outlined label="DDC" />
            </div>
            <q-btn
              label="Add Subject"
              no-caps
              rounded
              color="primary"
              @click="handleAddSubject"
            />
          </div>
        </div>
        <BookSubject :rows-object="rowsObject" />
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

    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent } from 'vue';
import { ClassificationProps } from 'components/Catalogue/ClassificationNo.vue';
import { api } from 'src/boot/axios';
import { LocalStorage, Notify } from 'quasar';
import formatDateToHumanReadable from 'src/functions/formattedDated';

defineComponent({
  name: 'CataloguePage',
});

const BookSubject = defineAsyncComponent({
  loader: () => import('components/Catalogue/BookSubject.vue'),
  delay:300,
  timeout: 2300,
  suspensible: false
});

const ClassificationNo = defineAsyncComponent({
  loader: () => import('components/Catalogue/ClassificationNo.vue'),
  delay: 350,
  timeout: 2300,
  suspensible: false
});

const tab = ref('booksubj');
const options = ref([]);
let dataOptions: unknown = [];
const dataArray: unknown = [];
const rowsObject = ref<object[]>([]);
const responseData = ref<object[]>([]);
const newForm = ref({
  accession_id: null,
  book_subject: '',
  ddc_code: '',
});
const form = ref({
  accession_no: null,
  book_subject: '',
  ddc_code: '',
});

const categories: ClassificationProps[] = [
  { id: 1, ddc: '001-099', name: 'Generalities', },
  { id: 2, ddc: '100-199', name: 'Philosophy' },
  { id: 3, name: '200-299 Religion', ddc: '200-299' },
  { id: 4, ddc: '300-399', name: 'Social Science', },
  { id: 5, ddc: '400-499', name: 'Languages' },
  { id: 6, ddc: '500-599', name: 'Natural Science', },
  { id: 7, ddc: '600-699', name: 'Applied Science', },
  { id: 8, ddc: '700-799', name: 'Arts And Recreation', },
  { id: 9, ddc: '800-899', name: 'Literature' },
  { id: 10, ddc: '900-999', name: 'Geography And History', },
  { id: 11, ddc: '92-920', name: 'Biography And Collective Biography', },
];


const getBooksList = async () => {
  try {
    const response = await api.get('/get/all/books', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token') as string}`,
      },
    });
    responseData.value = response.data;

    response.data.map((item: unknown) => {
      dataOptions.push(item.accession_no);
      dataArray.push({
        accession_id: item.accession_id,
        accession_no: item.accession_no,
      });
    });
  } catch (error) {
    throw error;
  }
};

const filterFn = (val: unknown, update: unknown) => {
  // call abort() at unknown time if you can't retrieve data somehow
  setTimeout(() => {
    if (val === '') {
      update(() => {
        options.value = dataOptions;
      });
      return;
    }

    update(() => {
      options.value = dataOptions.filter((item: unknown) =>
        item.toString().startsWith(val)
      );
    });
  }, 1500);
};

const handleAddSubject = async () => {
  try {
    dataArray.map((item: unknown) => {
      if (item.accession_no === form.value.accession_no) {
        newForm.value = { ...form.value, accession_id: item.accession_id };
      }
    });

    const response = await api.post(
      '/add/book/catalog',
      { book_catalog: newForm.value },
      {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
        },
      }
    );

    if (response.data.status_code === 201) {
      responseData.value.map((item: unknown) => {
        if (form.value.accession_no === item.accession_no) {
          rowsObject.value.push({
            ...form.value,
            title: item.title,
            created: formatDateToHumanReadable(new Date().toDateString()),
          });
        }
      });

      Notify.create({
        message: response.data.message,
        type: 'positive',
        position: 'top-right',
        timeout: 2500,
      });

      Object.entries(form.value).map((item: unknown) => (item.value = ''));
    } else {
      Notify.create({
        message: response.data.message,
        type: 'negative',
        position: 'top-right',
        timeout: 2500,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getAllCatalog = async () => {
  try {
    const response = await api.get('/get/all/book/catalog', {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`,
      },
    });
    const mutatedData = response.data.map((item: unknown) => ({
      ...item,
      created: formatDateToHumanReadable(item.created),
    }));

    rowsObject.value = mutatedData;
  } catch (error) {
    throw error;
  }
};

onMounted(async () => {
  await getBooksList();
  await getAllCatalog();
});

</script>
