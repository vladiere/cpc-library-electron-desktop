<template>
  <q-page padding>
    <!-- content -->
    <q-form
      greedy
      class="row q-gutter-x-md"
      method="POST"
      @submit.prevent="handleRegisterStaff"
      @reset="onSucess"
    >
      <div class="col-3 column">
        <div class="col-4 q-gutter-y-md">
          <q-item-label header class="text-h5">Login Information</q-item-label>
          <div class="col column">
            <q-item-label>Username</q-item-label>
            <q-input
              label="Username"
              outlined
              class="col"
              v-model="form.username"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter the username',
              ]"
            />
          </div>

          <div class="col column">
            <q-item-label>Password</q-item-label>
            <q-input
              label="Password"
              outlined
              class="col"
              v-model="form.password"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter the password',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  :name="isPwd ? 'mdi-eye-off' : 'mdi-eye'"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <q-separator vertical />

      <div class="col column q-gutter-y-md">
        <q-item-label header class="text-h5">Staff Information</q-item-label>
        <div class="row q-gutter-x-md">
          <div class="col column">
            <q-item-label>Lastname</q-item-label>
            <q-input
              label="Lastname"
              outlined
              class="col"
              v-model="form.lastname"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter the lastname',
              ]"
            />
          </div>
          <div class="col column">
            <q-item-label>Firstname</q-item-label>
            <q-input
              label="Firstname"
              outlined
              class="col"
              v-model="form.firstname"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter the firstname',
              ]"
            />
          </div>
          <div class="col column">
            <q-item-label>Middlename (if no midname leave it)</q-item-label>
            <q-input
              label="Middlename"
              outlined
              class="col"
              v-model="form.middlename"
            />
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <div class="col column">
            <q-item-label>Email address</q-item-label>
            <q-input
              label="Email address"
              outlined
              class="col"
              v-model="form.email_address"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter the email address',
              ]"
            />
          </div>
          <div class="col column">
            <q-item-label>Phone number</q-item-label>
            <q-input
              label="Phone number"
              outlined
              class="col"
              v-model="form.phone_number"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter the phone number',
              ]"
            />
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <div class="col column">
            <q-item-label>Street address</q-item-label>
            <q-input
              label="Street address"
              outlined
              class="col"
              v-model="form.street_address"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter the street address',
              ]"
            />
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <div class="col column">
            <q-item-label>City</q-item-label>
            <q-input
              label="City"
              outlined
              class="col"
              v-model="form.city"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter the city',
              ]"
            />
          </div>
          <div class="col column">
            <q-item-label>State/Provice/Region</q-item-label>
            <q-input
              label="State/Provice/Region"
              outlined
              class="col"
              v-model="form.state_province_region"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Please enter the state/province/region',
              ]"
            />
          </div>
          <div class="col column">
            <q-item-label>Address type</q-item-label>
            <q-input
              label="Address type"
              outlined
              class="col"
              v-model="form.address_type"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter the address type',
              ]"
            />
          </div>
          <div class="col-2 column">
            <q-item-label>Postal Code</q-item-label>
            <q-input
              label="Postal Code"
              outlined
              class="col"
              type="number"
              min="0"
              v-model="form.postal_code"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter the postal code',
              ]"
            />
          </div>
        </div>
        <div class="col column">
          <q-item-label>Hobbies</q-item-label>
          <q-input autogrow outlined label="Hobies" v-model="form.hobbies" />
        </div>
        <div class="col column">
          <q-item-label>Description</q-item-label>
          <q-input
            autogrow
            outlined
            label="Description"
            v-model="form.description"
          />
        </div>
        <div class="col column text-capitalize">
          <q-item-label>Privilege</q-item-label>
          <div class="col row">
            <q-select
              class="col-4"
              clearable
              outlined
              v-model="form.privilege"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter the privilege',
              ]"
              :options="options"
              label="Privilege"
            />
          </div>
        </div>
        <q-btn
          label="Register"
          color="primary"
          class="self-center"
          rounded
          type="submit"
          :disabled="isDisabled"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { LocalStorage, Notify } from 'quasar';

defineComponent({
  name: 'RegisterLibrarianStaff',
});

const form = ref({
  firstname: '',
  middlename: '',
  lastname: '',

  email_address: '',
  phone_number: '',

  street_address: '',
  city: '',
  state_province_region: '',
  postal_code: '',
  address_type: '',

  username: '',
  password: '',

  hobbies: '',
  description: '',
  privilege: '',
});

const options = ['tech coordinator', 'assistant', 'vendor'];
const isPwd = ref(true);
const isDisabled = ref(false)

const onSucess = () => {
  Object.entries(form.value).map((item: unknown) => {
    item.value = '';
  });
};

const handleRegisterStaff = async () => {
  try {
    const response = await api.post('/register/librarian', form.value, {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem('token')}`,
      },
    });
    if (response.data[0].status === 404) {
      Notify.create({
        message: response.data[0].message,
        type: 'negative',
        position: 'top',
        timeout: 2500,
      });
    } else {
      Notify.create({
        message: response.data[0].message,
        type: 'positive',
        position: 'top',
        timeout: 2500,
      });
      isDisabled.value = true
      onSucess();
    }
  } catch (error) {
    throw error;
  }
};
</script>
