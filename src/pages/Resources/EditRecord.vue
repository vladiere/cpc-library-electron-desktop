<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-x-md q-pa-md">
      <div class="col column relative-position">
        <q-img
          :src="defaultImage"
          :style="book_record.img_path ? 'max-height: 470px' : 'max-height: 470px; opacity: 0.7'"
          fit="fill"
        />
        <q-btn
          round
          icon="mdi-image-edit"
          color="primary"
          class="absolute-top-right q-mt-sm q-mr-sm"
          @click="showDialog = !showDialog"
        >
          <q-tooltip class="bg-grey-10 text-grey-1" :delay="250"
            >Change Book Image</q-tooltip
          >
        </q-btn>
      </div>
      <div class="col column q-gutter-y-md q-px-md text-capitalize">
        <div class="row q-gutter-x-md">
          <q-input
            class="col"
            outlined
            v-model="book_record.cost_price"
            label="Cost Value"
          />
          <q-input
            class="col"
            outlined
            v-model="book_record.edition"
            label="Edition"
          />
        </div>
        <q-input
          outlined
          v-model="book_record.publisher_name"
          label="Publisher"
          autogrow
        />
        <q-input
          outlined
          v-model="book_record.title"
          label="Title of the Book"
        />
        <q-input outlined v-model="book_record.author_name" label="Author" />
        <q-input
          outlined
          v-model="book_record.remarks"
          label="Remarks"
          autogrow
        />

        <q-btn
          label="Save Changes"
          color="primary"
          rounded
          class="self-center"
          @click="handleChangeRecord"
          :disable="onSucess"
        />
      </div>
    </div>
    <q-dialog
      v-model="showDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-grey-2 text-grey-10">
        <q-card-section class="column justify-center" style="width: 400px">
          <q-file
            class="col"
            filled
            outlined
            v-model="fileData"
            accept="image/*"
            label="Change Book Image"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
            <template v-if="fileData" v-slot:append>
              <q-icon
                name="cancel"
                @click.stop.prevent="fileData = null"
                class="cursor-pointer"
              />
            </template>
          </q-file>
          <q-img
            v-if="fileData"
            :src="imagePreview"
            fit="fill"
            style="width: 100%"
          />
        </q-card-section>
        <q-card-section class="row reverse q-gutter-x-md">
          <q-btn
            label="Upload"
            color="primary"
            dense
            :loading="loading"
            no-caps
            padding="2px 8px"
            rounded
            @click="handleUploadImage"
          />
          <q-btn
            label="Close"
            flat
            dense
            :loading="loading"
            v-close-popup
            no-caps
            @click="fileData = null"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { LocalStorage, Notify } from 'quasar';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import { linkimg } from 'src/utils/links';

defineComponent({
  name: 'EditRecordPage',
});

const route = useRoute();
const book_record = ref<any>([]);
const showDialog = ref(false);
const fileData = ref(null);
const defaultImage = ref<any>('');
const onSucess = ref(false);
const hasImage = ref(true);


const handleChangeRecord = async () => {
  try {
    const response = await api.post(
      'update/book/record',
      { book_record: JSON.stringify(book_record.value) },
      {
        headers: {
          Authorization: `Bearer ${
            LocalStorage.getItem('token') as string
          }`, // Include the token in the request headers
        },
      }
    );

    Notify.create({
      message: response.data.message,
      position: 'top-right',
      type: 'positive',
      timeout: 2500,
    });

    onSucess.value = true;
  } catch (error: any) {
    throw new Error(error);
  }
};

const imagePreview = computed(() => {
  if (fileData.value) {
    return URL.createObjectURL(fileData.value);
  } else {
    return '';
  }
});

const handleUploadImage = async () => {
  try {
    if (fileData.value) {
      const response = await api.post(
        '/upload/book/image',
        { image: fileData.value, book_id: book_record.value.book_id },
        {
          headers: {
            Authorization: `Bearer ${
              LocalStorage.getItem('token')
            }`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      Notify.create({
        position: 'top-right',
        message: response.data.message,
        type: 'positive',
        timeout: 2500,
      });

      defaultImage.value = URL.createObjectURL(fileData.value);
      showDialog.value = false;
      fileData.value = null;
    } else {
      Notify.create({
        message: 'Attach image file',
        type: 'negative',
        position: 'top',
        timeout: 2500,
      });
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

onMounted( async () => {
  book_record.value = await JSON.parse(route.query.dataJSON as string);

  if (
    book_record.value.img_path === '' ||
    book_record.value.img_path === null
  ) {
    defaultImage.value =
      'src/assets/no-image-available.png';
  } else {
    defaultImage.value = linkimg + book_record.value.img_path;
  }

});
</script>
