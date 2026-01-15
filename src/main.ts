import '@/assets/css/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/HomeView.vue'),
    },
    {
      path: '/hotel-clients',
      name: 'HotelClients',
      component: () => import('./views/ClientView.vue'), // create this file
    },
    {
      path: '/office-personnel',
      name: 'OfficePersonnel',
      component: () => import('./views/PersonnelView.vue'), // create this file
    },
  ],
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
