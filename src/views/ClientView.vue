<script setup lang="ts">
import RoomImagesCarousel from './components/RoomImagesCarousel.vue'

import { ref } from 'vue'
import HotelFloorMap from './components/HotelFloorMap.vue'

// You can later fetch this from real data / props
const roomName = ref('Room 101')
const services = ref([
  { icon: '🍽️', label: 'Restaurant & Bar' },
  { icon: '✨', label: 'Spa & Bar' },
  { icon: '🛎️', label: 'In Room Dining' },
  { icon: '🚗', label: 'Transportation' },
  { icon: '⏰', label: 'Wake-up Call' },
  { icon: '🔔', label: 'Guest Service' },
  { icon: '✂️', label: 'In-Room Salon' }, // was missing in your list but visible in screenshot
])
</script>

<template>
  <div class="bg-gray-100 font-sans">
    <RoomImagesCarousel />

    <!-- Main content -->
    <div class="bg-gray-100 px-5 p-5 mt-10">
      <h2 class="text-xl font-semibold py-5 text-gray-800">In-Hotel Services</h2>

      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="service in services"
          :key="service.label"
          class="flex flex-col items-center text-center gap-2 py-3 px-2 rounded-2xl bg-white hover:bg-indigo-600/15 active:bg-indigo-600/35 transition-colors"
        >
          <div class="text-3xl">{{ service.icon }}</div>
          <span class="text-sm text-gray-700 font-medium leading-tight">{{ service.label }}</span>
        </div>
      </div>

      <!-- Contact Support section -->
      <div class="mt-10">
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

  <HotelFloorMap />
</template>
