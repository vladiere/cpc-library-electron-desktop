<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-md">
      <div class="col column q-gutter-y-md q-pa-md shadow-2 rounded-borders">
        <span class="text-h5">Change Password</span>
        <q-form
          greedy
          @submit.prevent="handleChangePassSubmit"
          class="column q-gutter-y-sm"
          @reset="onSuccess"
        >
          <q-input
            outlined
            v-model="form.newPass"
            label="New Password"
            type="password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Enter new password']"
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="passes.newPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click="passes.newPass = !passes.newPass"
              />
            </template>
          </q-input>
          <span v-if="passes.newPass" class="text-grey-8">{{
            form.newPass
          }}</span>
          <q-input
            outlined
            v-model="form.confirmPass"
            label="Confirm password"
            type="password"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Enter confirm password',
            ]"
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="passes.confirmPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click="passes.confirmPass = !passes.confirmPass"
              />
            </template>
          </q-input>
          <span v-if="passes.confirmPass" class="text-grey-8">{{
            form.confirmPass
          }}</span>
          <q-btn
            type="submit"
            label="Save Change"
            class="self-start"
            color="primary"
            rounded
          />
        </q-form>
      </div>
      <div class="col column q-gutter-y-d q-pa-md shadow-2 rounded-borders">
        <span class="text-h5">System Settings</span>
        <div class="row q-gutter-x-md items-center q-pl-lg"></div>
        <div class="row q-pl-lg">
          <q-btn
            no-caps
            label="Check and Install Update"
            icon-right="mdi-sync"
            flat
            dense
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Notify, LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';
import { defineComponent, ref } from 'vue';
import jwt_decode from 'jwt-decode';

defineComponent({
  name: 'SettingsPage',
});

const passes = ref({
  newPass: false,
  confirmPass: false,
});
const form = ref({
  newPass: '',
  confirmPass: '',
});

const onSuccess = () => {
  for (const key in form.value) {
    form.value[key as keyof typeof form.value] = '';
  }
};

const handleChangePassSubmit = async () => {
  try {
    if (form.value.newPass === form.value.confirmPass) {
      const decoded: unknown = jwt_decode(
        LocalStorage.getItem('token') as string
      );

      const newFormData = {
        password: form.value.newPass,
        librarian_id: decoded.user_id,
      };
      const response = await api.post(
        '/librarian/change/password',
        { librarian_data: newFormData },
        {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.status_code === 200) {
        Notify.create({
          message: response.data.message,
          type: 'positive',
          position: 'top',
          timeout: 2400,
        });

        onSuccess();
      } else {
        Notify.create({
          message: response.data.message,
          type: 'negative',
          position: 'top',
          timeout: 2400,
        });
      }
    } else {
      Notify.create({
        message: 'Password does not match',
        position: 'top',
        type: 'negative',
        timeout: 2400,
      });
    }
  } catch (error) {
    throw error;
  }
};
</script>
