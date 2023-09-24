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
                    form.firstname.split('')[0].toUpperCase()
                  }}</span>
                </q-avatar>
              </q-item-section>

              <div class="col-2 text-h6 q-mt-xl text-capitalize">
                {{ form.firstname }} {{ form.middlename }} {{ form.lastname }}
              </div>
              <div class="col-2 text-grey-8 q-pt-md">@{{ form.privilege }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none flex flex-center">
              <div class="text-subtitle1 text-grey-8 text-center">
                {{ form.description || 'To be editted' }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div
          class="col column bg-white q-pa-md shadow-2"
          style="border-radius: 5px; gap: 15px"
        >
          <span class="text-h4">Edit Profile</span>
          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">Position</span>
              <q-input
                filled
                v-model="form.privilege"
                label="Position"
                disable
              />
            </div>
            <div class="col column">
              <span class="text-grey-7">Username</span>
              <q-input filled v-model="form.username" label="Username" />
            </div>
            <div class="col column">
              <span class="text-grey-7">Email Address</span>
              <q-input
                filled
                v-model="form.email_address"
                label="Email Address"
              />
            </div>
          </div>
          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">Firstname</span>
              <q-input filled v-model="form.firstname" label="Firstname" />
            </div>
            <div class="col column">
              <span class="text-grey-7">Middlename</span>
              <q-input filled v-model="form.middlename" label="Middlename" />
            </div>
            <div class="col column">
              <span class="text-grey-7">Lastname</span>
              <q-input filled v-model="form.lastname" label="Lastname" />
            </div>
          </div>

          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">Street Address</span>
              <q-input
                filled
                v-model="form.street_address"
                square
                label="Street Address"
              />
            </div>

            <div class="col column">
              <span class="text-grey-7">Address Type</span>
              <q-input
                filled
                v-model="form.address_type"
                square
                label="Address Type"
              />
            </div>
          </div>

          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">State/Province/Region</span>
              <q-input
                filled
                v-model="form.state_province_region"
                label="State/Province/Region"
              />
            </div>
            <div class="col column">
              <span class="text-grey-7">City</span>
              <q-input filled v-model="form.city" label="City" />
            </div>
          </div>

          <div class="row" style="gap: 15px">
            <div class="col column">
              <span class="text-grey-7">Postal Code</span>
              <q-input
                filled
                v-model="form.postal_code"
                label="Postal Code"
                type="number"
              />
            </div>
            <div class="col column">
              <span class="text-grey-7">Phone/Cellphone Number</span>
              <q-input
                filled
                v-model="form.phone_number"
                label="Phone/Cellphone Number"
              />
            </div>
          </div>
          <div class="column">
            <span class="text-grey-7">About Me</span>
            <q-input
              filled
              v-model="form.description"
              autogrow
              label="About Me"
            />
          </div>
          <div class="column">
            <span class="text-grey-7">My Hobbies</span>
            <q-input
              filled
              v-model="form.hobbies"
              autogrow
              label="My Hobbies"
            />
          </div>
          <div class="row self-center">
            <q-btn rounded label="update profile" color="primary" />
          </div>
        </div>
      </div>
      <div class="column q-mt-lg bg-white shadow-2" style="border-radius: 5px">
        <span class="self-center text-h4 q-my-md">Library Staff</span>
        <q-list bordered separator>
          <q-item-label header>Staff</q-item-label>

          <StaffComponent
            v-for="contact in contacts"
            :key="contact.email"
            v-bind="contact"
          />
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import StaffComponent, {
  StaffProps,
} from 'src/components/UserProfile/StaffComponent.vue';
import { useLibrarianDataStore } from 'src/stores/user';

defineComponent({
  name: 'UserProfile',
});

const librarianStore = useLibrarianDataStore();

const form = ref({
  librarian_id: librarianStore.librarian_id,
  firstname: librarianStore.firstname,
  middlename: librarianStore.middlename,
  lastname: librarianStore.lastname,
  email_address: librarianStore.email_address,
  phone_number: librarianStore.phone_number,
  hobbies: librarianStore.hobbies,
  description: librarianStore.description,
  street_address: librarianStore.street_address,
  city: librarianStore.city,
  state_province_region: librarianStore.state_province_region,
  postal_code: librarianStore.postal_code,
  address_type: librarianStore.address_type,
  username: librarianStore.username,
  privilege: librarianStore.privilege,
});

const contacts: StaffProps[] = [
  {
    name: 'Ruddy Jedrzej',
    email: 'rjedrzej0@discuz.net',
    letter: 'R',
  },
  {
    name: 'Mallorie Alessandrini',
    email: 'malessandrini1@marketwatch.com',
    letter: 'M',
  },
  {
    name: 'Elisabetta Wicklen',
    email: 'ewicklen2@microsoft.com',
    letter: 'E',
  },
  {
    name: 'Seka Fawdrey',
    email: 'sfawdrey3@wired.com',
    letter: 'S',
  },
];
</script>
