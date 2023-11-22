<template>
  <q-page padding class="q-mb-lg">
    <div class="column">
      <div class="row" style="gap: 25px">
        <div
          class="col-4 column flex bg-white shadow-2"
          style="border-radius: 5px"
        >
          <q-card class="column justify-center" flat>
            <q-img
              src="src/assets/backgrounds/bg.jpg"
              height="430px"
              fit="fill"
            />

            <q-card-section class="q-pb-lg column items-center content-center">
              <q-item-section
                class="absolute"
                style="
                  top: 40%;
                  left: 50%;
                  transform: translateY(-50%) translate(-50%, -50%);
                  border-radius: 50%;
                  border: 5px solid #fff;
                "
              >
                <q-avatar
                  style="width: 100px; height: 100px"
                  color="primary"
                  text-color="white"
                >
                  <span class="text-h2 text-bold">{{
                    librarianDetails.firstname ? librarianDetails.firstname.split('')[0].toUpperCase() : ''
                  }}</span>
                </q-avatar>
              </q-item-section>

              <div class="col-2 text-h6 q-mt-xl text-capitalize">
                {{ librarianDetails.firstname }} {{ librarianDetails.middlename }} {{ librarianDetails.lastname }}
              </div>
              <div class="col-2 text-grey-8 q-pt-md">@{{ librarianDetails.privilege }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none flex flex-center">
              <div
                class="text-subtitle1 text-grey-8 text-center "
              >
                {{ stringFormatter(librarianDetails.description) || 'To be editted' }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <q-form
          class="col column bg-white q-pa-md shadow-2"
          style="border-radius: 5px; gap: 15px"
          greedy
          @submit.prevent="handleSubmitUpdate"
        >
          <span class="text-h4">Edit Profile</span>
          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">Position</span>
              <q-input
                filled
                v-model="form.privilege"
                disable
                :placeholder="librarianDetails.privilege"
              />
            </div>
            <div class="col column">
              <span class="text-grey-7">Username</span>
              <q-input
                filled
                disable
                v-model="form.username"
                :placeholder="librarianDetails.username"
              />
            </div>
            <div class="col column">
              <span class="text-grey-7">Email Address</span>
              <q-input
                filled
                v-model="form.email_address"
                :placeholder="librarianDetails.email_address"
              />
            </div>
          </div>
          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">Firstname</span>
              <q-input
                filled
                disable
                v-model="form.firstname"
                :placeholder="stringFormatter(librarianDetails.firstname)"
              />
            </div>
            <div class="col column">
              <span class="text-grey-7">Middlename</span>
              <q-input
                filled
                disable
                v-model="form.middlename"
                :placeholder="stringFormatter(librarianDetails.middlename)"
              />
            </div>
            <div class="col column">
              <span class="text-grey-7">Lastname</span>
              <q-input
                filled
                disable
                v-model="form.lastname"
                :placeholder="stringFormatter(librarianDetails.lastname)"
              />
            </div>
          </div>

          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">Street Address</span>
              <q-input
                filled
                v-model="form.street_address"
                square
                :placeholder="stringFormatter(librarianDetails.street_address)"
              />
            </div>

            <div class="col column">
              <span class="text-grey-7">Address Type</span>
              <q-input
                filled
                v-model="form.address_type"
                square
                :placeholder="stringFormatter(librarianDetails.address_type)"
              />
            </div>
          </div>

          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">State/Province/Region</span>
              <q-input
                filled
                v-model="form.state_province_region"
                :placeholder="stringFormatter(librarianDetails.state_province_region)"
              />
            </div>
            <div class="col column">
              <span class="text-grey-7">City</span>
              <q-input filled v-model="form.city" :placeholder="stringFormatter(librarianDetails.city)" />
            </div>
          </div>

          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">Postal Code</span>
              <q-input
                filled
                v-model="form.postal_code"
                type="number"
                :placeholder="librarianDetails.postal_code || ''"
              />
            </div>
            <div class="col column">
              <span class="text-grey-7">Phone/Cellphone Number</span>
              <q-input
                filled
                v-model="form.phone_number"
                @input="formatPhoneNumber"
                :placeholder="librarianDetails.phone_number || ''"
              />
            </div>
          </div>
          <div class="column">
            <span class="text-grey-7">About Me</span>
            <q-input
              filled
              v-model="form.description"
              :placeholder="stringFormatter(librarianDetails.description)"
              autogrow
            />
          </div>
          <div class="column">
            <span class="text-grey-7">My Hobbies</span>
            <q-input
              filled
              v-model="form.hobbies"
              :placeholder="stringFormatter(librarianDetails.hobbies)"
              autogrow
            />
          </div>
          <div class="row self-center">
            <q-btn rounded label="update profile" type="submit" color="primary">
              <q-tooltip class="bg-grey-10 text-grey-2"
                >Update your profile</q-tooltip
              >
            </q-btn>
          </div>
        </q-form>
      </div>
      <div
        class="column q-mt-lg bg-white shadow-2 q-gutter-y-md"
        style="border-radius: 5px"
      >
        <div class="col column q-mx-md">
          <span class="self-center text-h4 q-my-md">Library Staff</span>
          <q-btn
            v-if="librarianDetails.privilege === 'admin'"
            color="primary"
            label="Register Staff"
            rounded
            class="self-start"
            no-caps
            to="/register"
          >
            <q-tooltip class="bg-grey-10 text-grey-2"
              >Register new staff</q-tooltip
            >
          </q-btn>
        </div>
        <q-separator />
        <q-virtual-scroll
          :items="contacts"
          separator
          style="max-height: 400px"
          v-slot="{ item, index }"
        >
          <StaffComponent :key="index" v-bind="item" />
        </q-virtual-scroll>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount, onBeforeMount, defineAsyncComponent } from 'vue';
import { StaffProps } from 'components/UserProfile/StaffComponent.vue';
import { api } from 'src/boot/axios';
import jwt_decode from 'jwt-decode';
import { LocalStorage, Notify, format } from 'quasar';

defineComponent({
  name: 'UserProfile',
});

const StaffComponent = defineAsyncComponent(() => import('components/UserProfile/StaffComponent.vue'));

const librarianDetails = ref([]);
const decoded = jwt_decode(LocalStorage.getItem('token'));
const form = ref({
  librarian_id: decoded.user_id,
  firstname: '',
  middlename: '',
  lastname: '',
  email_address: '',
  phone_number: '',
  hobbies: '',
  description: '',
  street_address: '',
  city: '',
  state_province_region: '',
  postal_code: '',
  address_type: '',
  username: '',
  privilege: '',
});

const stringFormatter = (wordstring: string) => wordstring ? format.capitalize(wordstring) : '';

const formatPhoneNumber = () => {
  // Remove all non-numeric characters from the input
  let formattedNumber = form.value.phone_number.replace(/\D/g, '');

  // Check if the number starts with "09" or "+639"
  if (formattedNumber.startsWith('09')) {
    // Format as "09XX-XXX-XXXX"
    formattedNumber = formattedNumber.replace(
      /(\d{2})(\d{3})(\d{4})/,
      '09$1-$2-$3'
    );
  } else if (formattedNumber.startsWith('+639')) {
    // Format as "+639XX-XXX-XXXX"
    formattedNumber = formattedNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '+639$1-$2-$3'
    );
  }

  // Update the phoneNumber ref with the formatted number
  form.value.phone_number = formattedNumber;
};

const contacts = ref<StaffProps[]>([]);

const handleSubmitUpdate = async () => {
  try {
    const newForm = {
      librarian_id: decoded.user_id,
      firstname: form.value.firstname || librarianDetails.value.firstname,
      middlename: form.value.middlename || librarianDetails.value.middlename,
      lastname: form.value.lastname || librarianDetails.value.lastname,
      email_address: form.value.email_address || librarianDetails.value.email_address,
      phone_number: form.value.phone_number || librarianDetails.value.phone_number,
      hobbies: form.value.hobbies || librarianDetails.value.hobbies,
      description: form.value.description || librarianDetails.value.description,
      street_address: form.value.street_address || librarianDetails.value.street_address,
      city: form.value.city || librarianDetails.value.city,
      state_province_region: form.value.state_province_region || librarianDetails.value.state_province_region,
      postal_code: form.value.postal_code || librarianDetails.value.postal_code,
      address_type: form.value.address_type || librarianDetails.value.address_type,
      username: form.value.username || librarianDetails.value.username,
      privilege: form.value.privilege || librarianDetails.value.privilege,
    }

    const response = await api.post( '/update/librarian/info', { librarian_info: newForm }, {
        headers: {
          Authorization: `Bearer ${ LocalStorage.getItem('token') }`,
        },
      }
    );

    librarianDetails.value = response.data;
    Notify.create({
      message: response.data.message,
      type: 'positive',
      position: 'top',
      timeout: 2500,
    });
  } catch (error) {
    throw error;
  }
};

const getLibrarianStaffs = async () => {
  try {

    const response = await api.post( '/get/librarian', { librarian_id: decoded.user_id, option: '' },
      {
        headers: {
          Authorization: `Bearer ${ LocalStorage.getItem('token') }`,
        },
      }
    );
    contacts.value = response.data;
  } catch (error) {
    throw error;
  }
};

const getLibrarianDetails = async () => {
  try {
      const response = await api.post('/get/librarian', { librarian_id: decoded.user_id, option: 'single' }, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token') as string}`
        }
      })
      librarianDetails.value = response.data[0];
  } catch (error) {
    throw error;
  }
}

onMounted(async () => {
  await getLibrarianDetails();
  await getLibrarianStaffs();
});

</script>
