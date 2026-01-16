import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VerificationForm from '@/components/VerificationForm.vue'
import ClientView from '@/views/ClientView.vue'
import PersonnelView from '@/views/PersonnelView.vue'
import CheckInOut from '@/components/CheckInOut.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/verification-form',
      name: 'VerificationForm',
      component: VerificationForm,
    },
    {
      path: '/hotel-clients',
      name: 'HotelClients',
      component: ClientView,
      props: true,
    },
    {
      path: '/office-personnel',
      name: 'OfficePersonnel',
      component: PersonnelView,
    },
    {
      path: '/check-in-out',
      name: 'CheckInOut',
      component: CheckInOut,
    },
  ],
})

export default router
