<script setup lang="ts">
import { ref, computed } from 'vue'
import RoomImagesCarousel from '@/components/RoomImagesCarousel.vue'
import { GUEST_SERVICES } from '@/constants/hotelServices'

const services = ref(GUEST_SERVICES)

import { useRoute } from 'vue-router'

const route = useRoute()

const nameDecoded = computed(() => {
  return decodeURIComponent((route.query.name as string) || '')
})
const room_number = computed(() => route.query.room_number as number | undefined)

const capitalize = (s: string) => {
  return s
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const name = computed(() => capitalize(nameDecoded.value))
</script>

<template>
  <div class="page-wrapper p-5! bg-gray-100 font-sans">
    <RoomImagesCarousel />

    <!-- Main content -->
    <div class="bg-gray-100 py-5">
      <div class="p-5 rounded-2xl bg-white">
        <h1 class="text-3xl font-bold text-gray-900 gradient-text mb-5">Room {{ room_number }}</h1>
        <p class="text-xl text-gray-700 pt-5">
          Welcome to our Awesome Hotel, <span class="gradient-text">{{ name }}</span
          >!<br />
          Explore our exclusive in-hotel services designed to make your stay unforgettable.
        </p>
      </div>
      <h2 class="text-xl font-semibold pt-10 pb-5 text-gray-800">In-Hotel Services</h2>

      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="service in services"
          :key="service.title"
          class="flex flex-col items-center text-center gap-2 py-3 px-2 rounded-2xl bg-white hover:bg-indigo-600/15 active:bg-indigo-600/35 transition-colors"
        >
          <div class="text-3xl">{{ service.icon }}</div>
          <span class="text-sm text-gray-700 font-medium leading-tight">{{ service.title }}</span>
        </div>
      </div>

      <!-- Contact Support section -->
      <div class="pt-10 pb-5">
        <h2 class="text-xl font-semibold py-5 text-gray-800">Contact Support</h2>
        <div
          class="bg-white rounded-2xl p-5 flex items-center justify-between cursor-pointer active:bg-indigo-600/35 transition-colors"
        >
          <div>
            <p class="font-medium text-gray-800">Our 24/7 customer support is always available</p>
          </div>
          <div
            class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl shadow-md"
          >
            💬
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
