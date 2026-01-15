<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { STAFF_SERVICES } from '@/constants/hotelServices'

const services = ref(STAFF_SERVICES)

const route = useRoute()

const nameDecoded = computed(() => {
  return decodeURIComponent((route.query.name as string) || '')
})
</script>

<template>
  <div class="page-wrapper p-5! bg-gray-100 font-sans">
    <!-- Main content -->
    <div class="bg-gray-100 mt-10">
      <h1 class="text-3xl font-bold text-gray-900 mb-5">
        Welcome to our Awesome Hotel, {{ nameDecoded }}! How are you today?
      </h1>
      <h2 class="text-xl font-semibold py-5 text-gray-800">In-Hotel Services</h2>

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
    </div>
  </div>
</template>
