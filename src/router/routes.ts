import { RouteRecordRaw } from 'vue-router';
import { Platform } from 'quasar'


const routes: RouteRecordRaw[] = [];

if (Platform.is.electron) {
  routes.push(
    {
      path: '/',
      component: () => import('layouts/Login/LoginLayout.vue'),
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('pages/Login/LoginPage.vue')
        },
      ]
    },
    {
      path: '/dashboard',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'Dashboard', component: () => import('pages/IndexPage.vue') },
      ],
    },
    {
      path: '/users',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'User Profile', component: () => import('pages/Users/UserProfile.vue') },
        { path: '/register', name: 'Register Librarian Staff', component: () => import('pages/Users/RegisterLibrarianStaff.vue') }
      ]
    },
    {
      path: '/tables',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'Table List', component: () => import('pages/TableList/TableListPage.vue') },
      ]
    },
    {
      path: '/resources',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'Resources', component: () => import('pages/Resources/ResourcesPage.vue') },
        { path: 'bulkupload', name: 'Bulk Upload', component: () => import('pages/Resources/BulkUpload.vue') },
        { path: 'edit?query=', name: 'Edit Record', component: () => import('pages/Resources/EditRecord.vue') },
      ]
    },
    {
      path: '/circulations',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'Circulations', component: () => import('pages/Circulations/CirculationsPage.vue') },
      ]
    },
    {
      path: '/catalogue',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'Catalogue', component: () => import('pages/Catalogue/CataloguePage.vue') },
      ]
    },
    {
      path: '/acquisitions',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'Acquisitions', component: () => import('pages/Acquisitions/AcquisitionsPage.vue') },
      ]
    },
    {
      path: '/notifications',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'Notifications', component: () => import('pages/Notifications/NotificationsPage.vue') },
      ]
    },
    {
      path: '/stats',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'Stats', component: () => import('pages/Stats/StatsPage.vue') },
      ]
    },
    {
      path: '/settings',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'Settings', component: () => import('pages/Settings/SettingsPage.vue') },
      ]
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue'),
    },
  )
} else {
  routes.push(
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFoundWeb.vue'),
    },
  )
}

export default routes;
