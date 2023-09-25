<template>
  <div class="relative">
    <div class="flex flex-center fullscreen">
      <q-img
        fit="fill"
        src="src/assets/backgrounds/bg.jpg"
        alt="library_background"
        :ratio="16 / 5"
      />
      <q-img
        fit="cover"
        :ratio="16 / 5"
        src="src/assets/backgrounds/bg2.jpg"
        alt="library_background"
      />
    </div>
    <div class="fullscreen absolute-screen bg-dark" style="opacity: 0.5">
      <span class="text-grey-6">Sept 19, 2023</span>
    </div>
    <div
      class="absolute-center column bg-grey-3 q-pa-lg shadow-8"
      style="z-index: 9999; border-radius: 15px; gap: 15px; width: 30%"
    >
      <q-img
        src="src/assets/librarylogo.png"
        style="border-radius: 50%"
        width="40%"
        class="self-center"
      />
      <span class="text-h4 text-bold">Login</span>
      <q-form
        class="column q-gutter-sm"
        greedy
        autofocus
        @submit.prevent="handleSubmit"
      >
        <q-input
          v-model="form.username"
          outlined
          label="Username"
          :rules="[(val) => (val && val.length > 0) || 'Username Required']"
        />
        <q-input
          v-model="form.password"
          outlined
          label="Password"
          :type="isPwd ? 'password' : 'text'"
          :rules="[(val) => (val && val.length > 0) || 'Password Required']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn label="login" :loading="loading" color="primary" type="submit" />
        <q-btn label="reset" icon="mdi-sync" flat type="reset" />
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'LoginPage',
});

const $q = useQuasar();
const form = ref({
  username: '',
  password: '',
});
const isPwd = ref(true);
const router = useRouter();
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;

  try {
    const response = await api.post('login/librarian', { form: form.value });
    $q.sessionStorage.set(
      'token',
      response.data.user.librarian_id + ' ' + response.data.user.token
    );

    router.push('/dashboard');
  } catch (error: any) {
    $q.notify({
      position: 'top',
      message: error.response.data.error,
      color: 'negative',
      timeout: 3000,
    });
    loading.value = false;
  }
};
</script>
