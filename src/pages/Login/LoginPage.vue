<template>
<q-page>
  <LoadingComponent  v-if="loading"/>
  <div class="relative">
    <div class="flex flex-center fullscreen">
      <q-img
        fit="fill"
        src="../../assets/backgrounds/bg.jpg"
        alt="library_background"
        :ratio="16 / 5"
      />
      <q-img
        fit="cover"
        :ratio="16 / 5"
        src="../../assets/backgrounds/bg2.jpg"
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
        src="../../assets/librarylogo.png"
        style="border-radius: 50%"
        width="40%"
        class="self-center"
      />
      <span class="text-h4 text-bold">Login</span>
      <q-form
        class="column q-gutter-sm"
        greedy
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
</q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { loginApi } from 'src/boot/axios';
import { LocalStorage, debounce, Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { useLibrarianDataStore } from 'stores/user';
import LoadingComponent from 'components/Loaders/LoadingComponent.vue';

defineComponent({
  name: 'LoginPage',
});

const form = ref({
  username: '',
  password: '',
});
const isPwd = ref(true);
const router = useRouter();
const loading = ref(false);
const userStore = useLibrarianDataStore();
const loginInvalidPrompt = ref('');

const submitLogin = debounce(async () => {
  try {
     const response = await loginApi.post('login/librarian', {
      form: form.value,
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    });

    LocalStorage.set('token', response.data.user.accessToken);
    LocalStorage.set('refresh', response.data.user.refreshToken);
    userStore.initLibrarian(response.data.user.accessToken,response.data.user.refreshToken);

    loading.value = false;
    router.push('/dashboard');
  } catch (error: unknown) {
    loading.value = false;
    loginInvalidPrompt.value = error.response.data.error;
    throw error;
  } finally {
    loading.value = false;
    if (loginInvalidPrompt.value){
      Notify.create({
        position: 'top',
        message: loginInvalidPrompt.value,
        progress: true,
        color: 'negative',
        timeout: 3000,
      });
      loginInvalidPrompt.value = '';
    }
  }
}, 1500)

const handleSubmit = async () => {
  try {
    loading.value = true;
    await submitLogin();
  } catch (error: unknown) {
    loading.value = false;
    console.error(error);
   }
};
</script>
