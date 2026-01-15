<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const isHovered = ref(false)

const goToHotel = () => router.push('/hotel-clients')
const goToOffice = () => router.push('/office-personnel')
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gray-950 text-white font-sans">
    <!-- Background linear -->
    <div
      class="absolute inset-0 bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 opacity-80"
      :class="{ 'scale-[1.02] brightness-110': isHovered }"
      @click="goToHotel"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    />

    <!-- Left side -->
    <div class="max-w-md text-left">
      <h1 class="absolute top-5 left-5 text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
        <span>Hotel</span><br />Clients
      </h1>
      <!-- <p class="absolute top-30 left-5 text-2xl md:text-4xl opacity-90">Hotel Clients</p> -->
    </div>

    <!-- Diagonal split -->
    <div class="absolute inset-0 flex">
      <!-- Right side – clipped diagonally -->
      <div
        class="w-full h-full bg-linear-to-br from-pink-900 to-rose-900 flex items-center justify-center clip-diagonal"
        :class="{ 'scale-[1.02] brightness-110': isHovered }"
        @click="goToOffice"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <div class="max-w-md px-8 text-left">
          <h1
            class="absolute bottom-45 right-5 text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            <span>Office</span><br />Personnel
          </h1>
          <!-- <p class="absolute bottom-35 right-10 text-left text-2xl md:text-4xl opacity-90">
            Office Personnel
          </p> -->
        </div>
      </div>
    </div>

    <!-- Pulsating centered logo -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
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
        <div
          class="absolute inset-2 bg-gray-900 rounded-full border-4 border-white/20 shadow-2xl flex items-center justify-center overflow-hidden"
        >
          <span
            class="text-3xl md:text-[12rem] font-black tracking-tighter leading-none bg-linear-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            A
          </span>
        </div>

        <!-- Inner subtle highlight -->
        <div class="absolute inset-4 rounded-full bg-white/5" />
      </div>
    </div>

    <!-- Tagline -->
    <div class="w-full absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-10">
      <p class="text-xl md:text-2xl font-light opacity-80 tracking-wide">Welcome to the Future</p>
    </div>
  </div>
</template>

<style scoped>
/* Diagonal clip – top-right to bottom-left */
.clip-diagonal {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 100% 0);
}

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
