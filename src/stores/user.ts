import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    librarian_id: null,
    login_id: null,
    message: '',
    privilege: '',
    token: '',
    username: '',
  }),
  actions: {
    initUser(userData: any) {
      this.librarian_id = userData.librarian_id;
      this.login_id = userData.login_id;
      this.message = userData.message;
      this.privilege = userData.privilege;
      this.token = userData.token;
      this.username = userData.username;
    },
    clearUser() {
      this.librarian_id = null;
      this.login_id = null;
      this.message = '';
      this.privilege = '';
      this.token = '';
      this.username = '';
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});

export const useLibrarianDataStore = defineStore('userData', {
  state: () => ({
    librarian_id: null,
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
    postal_code: null,
    address_type: '',
    username: '',
    privilege: ''
  }),
  actions: {
    initLibrarian(librarianData: any) {
      this.librarian_id = librarianData.librarian_id,
        this.firstname = librarianData.firstname,
        this.middlename = librarianData.middlename,
        this.lastname = librarianData.lastname,
        this.email_address = librarianData.email_address,
        this.phone_number = librarianData.phone_number,
        this.hobbies = librarianData.hobbies,
        this.description = librarianData.description,
        this.street_address = librarianData.street_address,
        this.city = librarianData.city,
        this.state_province_region = librarianData.state_province_region,
        this.postal_code = librarianData.postal_code,
        this.address_type = librarianData.address_type,
        this.username = librarianData.username,
        this.privilege = librarianData.privilege
    },
    clearLibrarian() {
      this.librarian_id = null,
        this.firstname = '',
        this.middlename = '',
        this.lastname = '',
        this.email_address = '',
        this.phone_number = '',
        this.hobbies = '',
        this.description = '',
        this.street_address = '',
        this.city = '',
        this.state_province_region = '',
        this.postal_code = null,
        this.address_type = '',
        this.username = '',
        this.privilege = ''
    }
  }
})
