<template>
  <q-list>
    <q-item>
      <q-item-section avatar top>
        <q-avatar class="text-uppercase bg-primary text-white">{{
          fullname.split('')[0]
        }}</q-avatar>
      </q-item-section>

      <q-item-section top class="col-2 gt-sm">
        <q-item-label class="q-mt-sm">{{ wordFormatter(fullname) }}</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">[ {{ wordFormatter(file_title) }} ]</span>
          <span class="text-grey-8"> - {{ wordFormatter(file_status) }}</span>
        </q-item-label>
        <q-item-label caption lines="1"> {{ wordFormatter(uploaded_date) }} </q-item-label>
        <q-item-label lines="1" class="q-mt-xs" >
          <q-btn :href="linkfile + '/' + file_path" @click="downloadFile(file_path)" target="_blank" flat dense color="primary" label="download file" >
            <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">Download file to review</q-tooltip>
          </q-btn>
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            :loading="isLoading"
            color="red-5"
            round
            icon="mdi-delete"
            @click="manageUserContributions('remove', user_id, 'removed', contribution_id)"
          >
            <q-tooltip class="bg-red-5 text-white">Remove</q-tooltip>
          </q-btn>
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            :loading="isLoading"
            color="green-5"
            round
            icon="mdi-check-all"
            @click="manageUserContributions('accept', user_id, 'accepted', contribution_id)"
          >
            <q-tooltip class="bg-green-5 text-white">Accept</q-tooltip>
          </q-btn>
          <q-btn
            icon="mdi-cancel"
            size="12px"
            flat
            :loading="isLoading"
            color="yellow-10"
            dense
            round
            @click="manageUserContributions('cancel', user_id, 'cancelled', contribution_id)"
          >
            <q-tooltip class="bg-yellow-5 text-dark">Cancel</q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
    </q-item>

    <q-separator inset spaced />
  </q-list>
</template>

<script setup lang="ts">
import { format, Notify, LocalStorage, debounce } from 'quasar';
import { linkfile } from 'src/utils/links';
import { api } from 'src/boot/axios';
import { socket } from 'src/utils/socket';
import { ref } from 'vue';

const emit = defineEmits(['actionPerformed']);
const isLoading = ref(false);

export interface ContributorsProps {
  contribution_id: number;
  user_id: number;
  file_total_downloads: number;
  author_fullname: string;
  category_name: string;
  publisher_name: string;
  file_title: string;
  file_path: string;
  fullname: string;
  department: string;
  file_description: string;
  uploaded_date: string;
  file_status: string;
}

withDefaults(defineProps<ContributorsProps>(), {
  contribution_id: 0,
  user_id: 0,
  file_total_downloads: 0,
  author_fullname: '',
  category_name: '',
  publisher_name: '',
  file_title: '',
  file_path: '',
  fullname: '',
  department: '',
  file_description: '',
  uploaded_date: '',
  file_status: '',
});

const wordFormatter = (word: string) => {
  return format.capitalize(word);
}

const handleContributions = debounce(async (action: string, user_id: number, p_status: string, contribution_id: number) => {
  try {
    const response = await api.post('/contributors/manage', { action, user_id, p_status, contribution_id }, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`
      }
    })
    if (response.data.status === 201) {
      Notify.create({
        message: response.data.message,
        position: 'top-right',
        type: 'positive',
        timeout: 2300,
      });
      emit('actionPerformed', { action, user_id, p_status, contribution_id });
      socket.emit('notifications', user_id);
      isLoading.value = false;
    }
  } catch (error) {
    throw error;
  }
}, 1500)

const manageUserContributions = async (action: string, user_id: number, p_status: string, contribution_id: number) => {
  try {
    isLoading.value = true;
    await handleContributions(action,user_id,p_status,contribution_id);
  } catch (error) {
    throw error;
  }
}

const downloadFile = (fileToDownload: string) => {
  const fileUrl = linkfile + '/' + fileToDownload
  if (window.electron.ipcRenderer) {
    window.electron.ipcRenderer.send('download-file', fileUrl)
  } else {
    console.error('ipcRenderer is not Available')
  }
}

</script>
