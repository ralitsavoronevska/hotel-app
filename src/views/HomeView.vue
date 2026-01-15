<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const isHovered = ref(false)

const goToVerificationForm = () => router.push('/verification-form')
</script>

<template>
  <div
    class="relative w-full min-h-screen flex items-center justify-center flex-col overflow-hidden bg-gray-950 text-white font-sans"
  >
    <!-- Background linear -->

    <!-- Background linear for depth -->
    <div class="inset-0 bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 opacity-80" />

    <!-- Diagonal split using clip-path -->
    <div class="flex flex-1 flex-col items-center justify-center absolute inset-0">
      <!-- Left side (bottom-left triangle) -->
      <div
        class="w-full h-full flex flex-1 flex-col items-center justify-center text-center bg-linear-to-br from-indigo-900 to-purple-900"
        :class="{ 'scale-[1.02] brightness-110': isHovered }"
        @click="goToVerificationForm"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <div class="max-w-md px-8">
          <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-10">Hotel Clients</h1>
          <p class="text-xl md:text-2xl opacity-90">Enter the hotel management system</p>
        </div>
      </div>

      <!-- Right side (top-right triangle) – clipped -->
      <div
        class="w-full h-full flex flex-1 flex-col items-center justify-center text-center bg-linear-to-br from-purple-900 to-pink-900"
        :class="{ 'scale-[1.02] brightness-110': isHovered }"
        @click="goToVerificationForm"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <div class="max-w-md px-8">
          <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-10">Office Personnel</h1>
          <p class="text-xl md:text-2xl opacity-90">Manage office operations efficiently</p>
        </div>
      </div>
    </div>

    <!-- Pulsating centered logo -->
    <div class="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-100">
      <div class="relative w-24 h-24 md:w-48 md:h-48">
        <!-- Pulsating outer glow -->
        <div
          class="absolute inset-0 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 animate-pulse-glow"
        />

        <!-- Secondary softer pulse layer -->
        <div
          class="absolute inset-0 rounded-full bg-linear-to-r from-indigo-400/30 via-purple-400/30 to-pink-400/30 animate-pulse-glow-slow"
        />

        <!-- Main circle -->
        <div class="absolute inset-2 bg-gray-300 rounded-full flex items-center justify-center">
          <span
            class="text-6xl md:text-[10rem] font-black bg-linear-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >A</span
          >
        </div>

        <!-- Inner subtle highlight -->
        <div class="absolute inset-4 rounded-full bg-white/5" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Pulsating glow animation */
@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.75;
    transform: scale(1.12);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 6s ease-in-out infinite;
}

/* Slower secondary pulse for depth */
@keyframes pulse-glow-slow {
  0%,
  100% {
    opacity: 0.25;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.18);
  }
}

.animate-pulse-glow-slow {
  animation: pulse-glow-slow 10s ease-in-out infinite;
}
</style>
