<template>
  <q-page padding class="q-gutter-md">
    <!-- content -->
    <q-btn label="Back" icon="mdi-keyboard-return" flat dense to="/resources" />
    <div v-if="dataToSend.length === 0" class="column items-center">
      <q-uploader
        url="http://localhost:3000/api/upload/excel"
        label="Upload Excel File"
        color="primary"
        field-name="exceldata"
        square
        bordered
        auto-upload
        accept=".xlsx, .xls"
        max-file-size="200000"
        max-total-size="200000"
        style="max-width: 300px"
        :headers="[{ name: 'Authorization', value: `Bearer ${token}` }]"
        @rejected="onFileRejected"
        @uploaded="onFileUpload"
      />
    </div>
    <BulkUploadComponent v-else :data="dataToSend" />
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import BulkUploadComponent from 'src/components/Resources/BulkUploadComponent.vue';

defineComponent({
  name: 'BulkUpload',
});

const $q = useQuasar();
const temp = new String($q.sessionStorage.getItem('token'));
const token = temp.split(' ')[1];
const dataToSend = ref([]);

const mapErrors: Record<string, string> = {
  accept: 'Excel/Spreedsheet file only',
  'max-file-size': 'Exceeded max file size',
  'max-total-size': 'Exceeded max total size',
};

interface RejectedEntry {
  failedPropValidation: string; // Assuming 'failedPropValidation' is a string
}

const onFileRejected = (rejectedEntries: RejectedEntry[]) => {
  rejectedEntries.forEach((entry: RejectedEntry) => {
    $q.notify({
      message: mapErrors[entry.failedPropValidation],
      position: 'top',
      timeout: 3000,
      type: 'negative',
    });
  });
};

const onFileUpload = (data: any) => {
  const { xhr } = data;

  if (xhr.status === 200) {
    const responseText = xhr.responseText;
    const jsonResponse = JSON.parse(responseText);

    dataToSend.value = jsonResponse.jsonData;

    $q.notify({
      message: jsonResponse.message,
      position: 'top-right',
      type: 'positive',
      timeout: 3000,
    });
  } else {
    $q.notify({
      message: 'File upload failed something went wrong',
      type: 'negative',
      position: 'top',
      timeout: 3000,
    });
  }
};
</script>
