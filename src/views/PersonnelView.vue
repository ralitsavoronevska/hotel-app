<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const nameDecoded = computed(() => {
  return decodeURIComponent((route.query.name as string) || '')
})
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-rose-950 to-purple-950 text-white flex items-center justify-center p-6"
  >
    <div class="max-w-4xl text-center">
      <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-8">
        Office Personnel Dashboard
      </h1>

      <p>Welcome back to the Office Personnel Dashboard, {{ nameDecoded }}</p>

      <p class="text-xl md:text-2xl opacity-90 mb-12">
        Manage schedules, desks, meetings, access rights, and team availability.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          class="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-rose-500/50 transition-all"
        >
          <h3 class="text-2xl font-bold mb-4">Active Staff</h3>
          <p class="text-4xl font-black">142</p>
          <p class="text-sm opacity-70">Currently on-site</p>
        </div>

        <div
          class="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-rose-500/50 transition-all"
        >
          <h3 class="text-2xl font-bold mb-4">Free Desks</h3>
          <p class="text-4xl font-black">38</p>
          <p class="text-sm opacity-70">Available today</p>
        </div>

        <div
          class="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-rose-500/50 transition-all"
        >
          <h3 class="text-2xl font-bold mb-4">Upcoming Meetings</h3>
          <p class="text-4xl font-black">7</p>
          <p class="text-sm opacity-70">Next 24 hours</p>
        </div>
      </div>

      <button
        class="mt-12 px-10 py-5 bg-rose-600 hover:bg-rose-700 rounded-xl text-xl font-semibold transition shadow-lg"
      >
        Open Full Dashboard →
      </button>
    </div>
  </div>
</template>
