<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { STAFF_SERVICES } from '@/constants/hotelServices'

const services = ref(STAFF_SERVICES)

const route = useRoute()
const router = useRouter()

const nameDecoded = computed(() => {
  return decodeURIComponent((route.query.name as string) || '')
})

const capitalize = (s: string) => {
  return s
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const name = computed(() => capitalize(nameDecoded.value))

// Click handler for any service – but special for Check-in/Check-out
const handleServiceClick = (service: { title: string }) => {
  if (service.title === 'Check-in / Check-out Operations') {
    router.push({
      path: '/check-in-out',
      query: { name: route.query.name }, // pass guest name forward
    })
  } else {
    // Optional: handle other services later (modal, alert, etc.)
    alert(`Opening ${service.title}... (to be implemented)`)
  }
}
</script>

<template>
  <div class="page-wrapper p-5! bg-gray-100 font-sans">
    <!-- Main content -->
    <div class="bg-gray-100 mt-10">
      <div class="p-5 rounded-2xl bg-white">
        <h1 class="text-xl font-bold text-gray-900 mb-5">
          Welcome back to our Awesome Hotel Management System,
          <span class="gradient-text">{{ name }}!</span> How are you today?
        </h1>
      </div>

      <h2 class="text-xl font-semibold py-5 text-gray-800">In-Hotel Services</h2>

      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="service in services"
          :key="service.title"
          class="flex flex-col items-center text-center gap-2 py-3 px-2 rounded-2xl bg-white hover:bg-indigo-600/15 active:bg-indigo-600/35 transition-colors"
          @click="handleServiceClick(service)"
        >
          <div class="text-3xl">{{ service.icon }}</div>
          <span class="text-sm text-gray-700 font-medium leading-tight">{{ service.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
