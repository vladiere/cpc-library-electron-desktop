import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { LocalStorage } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({ baseURL: 'http://localhost:3000/api/' });
const loginApi = axios.create({ baseURL: 'http://localhost:3000/api/' });

// const api = axios.create({ baseURL: 'https://library-backend-y0o3.onrender.com/api/' });
// const loginApi = axios.create({ baseURL: 'https://library-backend-y0o3.onrender.com/api/' });

// const api = axios.create({
//   baseURL: 'https://cpc-repo-production.up.railway.app/api/',
// });
// const loginApi = axios.create({
//   baseURL: 'https://cpc-repo-production.up.railway.app/api/',
// });

const refreshToken = async () => {
  try {
    const response = await api.post('/refresh/user/tokens', {
      refreshToken: LocalStorage.getItem('refresh'),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

api.interceptors.request.use(
  config => {
    if (!config.headers['Authorization']) {
       config.headers['Authorization'] = `Bearer ${LocalStorage.getItem('token')}`;
    }

    return config;
  }, (error) => Promise.reject(error)
)


api.interceptors.response.use(
  response => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response.status === 401 && !prevRequest?.sent) {
      // console.log('Unauthorized error. Attempting to refresh token.');
      prevRequest.sent = true;
      const token = await refreshToken();
      // console.log('Refresh token response:', token);

      if (token.accessToken) {
        // console.log('Token refreshed successfully. Retrying the previous request.');
        prevRequest.headers['Authorization'] = `Bearer ${token.accessToken}`;

        LocalStorage.set('token', token.accessToken);
        return api(prevRequest);
      } else {
        // console.error('Failed to refresh token. Redirect to login or handle accordingly.');
        // Handle the case where token refresh fails (e.g., redirect to login)
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);



export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  app.config.globalProperties.$loginApi = loginApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, loginApi };
