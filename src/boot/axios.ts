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

// const api = axios.create({ baseURL: 'http://localhost:3000/api/' });
// const loginApi = axios.create({ baseURL: 'http://localhost:3000/api/' });

const api = axios.create({ baseURL: 'https://library-backend-cmg9.onrender.com/api/' });
const loginApi = axios.create({ baseURL: 'https://library-backend-cmg9.onrender.com/api/' });

const refreshToken = async () => {
  try {
    const response = await api.post('/refresh/user/tokens', {
      refreshToken: LocalStorage.getItem('refresh'),
    });

    return response.data;
  } catch (error) {
    console.error('Failed to refresh token.', error);
    throw error; // Ensure to propagate the error so that it can be handled in the interceptor
  }
};

let isRefreshing = false;

api.interceptors.request.use(
  (config) => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${LocalStorage.getItem('token')}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response.status === 401 && !prevRequest?.sent) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const token = await refreshToken();

          if (token.accessToken) {
            prevRequest.headers['Authorization'] = `Bearer ${token.accessToken}`;

            LocalStorage.remove('token');
            LocalStorage.set('token', token.accessToken);
            prevRequest.sent = true; // Mark the request as sent to prevent further loops
            isRefreshing = false; // Reset isRefreshing flag

            return api(prevRequest);
          } else {
            console.error('Failed to refresh token. Redirect to login or handle accordingly.');
            isRefreshing = false; // Reset isRefreshing flag
            return Promise.reject(error);
          }
        } catch (refreshError) {
          console.error('Error in refreshToken', refreshError);
          isRefreshing = false; // Reset isRefreshing flag
          return Promise.reject(error);
        }
      } else {
        // If isRefreshing is true, wait for the token refresh to complete
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay if needed
        return api(prevRequest);
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
