<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

import { useRoomData } from '@/composables/useRoomData'
const { images } = useRoomData()

const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true, // Matches demo: seamless looping
})

const selectedIndex = ref(0)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

// Handlers
const scrollPrev = () => emblaApi.value?.scrollPrev()
const scrollNext = () => emblaApi.value?.scrollNext()
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index)

// Toggle states
const onSelect = () => {
  if (!emblaApi.value) return
  selectedIndex.value = emblaApi.value.selectedScrollSnap()
  canScrollPrev.value = emblaApi.value.canScrollPrev()
  canScrollNext.value = emblaApi.value.canScrollNext()
}

// Setup event listeners (matches demo logic)
onMounted(() => {
  if (!emblaApi.value) return
  emblaApi.value.on('init', onSelect)
  emblaApi.value.on('select', onSelect)
  emblaApi.value.on('reInit', onSelect)
  onSelect() // Initial call
})

// Cleanup
onUnmounted(() => {
  if (emblaApi.value) {
    emblaApi.value.off('init', onSelect)
    emblaApi.value.off('select', onSelect)
    emblaApi.value.off('reInit', onSelect)
  }
})
</script>

<template>
  <div class="embla relative w-full mx-auto overflow-hidden rounded-xl mb-10">
    <!-- Viewport -->
    <div ref="emblaRef" class="embla__viewport">
      <!-- Container -->
      <div class="embla__container flex">
        <!-- Slides -->
        <div v-for="img in images" :key="img.id" class="embla__slide shrink-0 w-full min-w-full">
          <img
            :src="img.image"
            alt="Carousel slide"
            class="w-full h-full lg:h-125 object-cover lg:object-bottom"
          />
        </div>
      </div>
    </div>

    <!-- Arrows (optional – remove if not needed) -->
    <button
      class="embla__button embla__button--prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 text-black rounded-full p-2 shadow-md disabled:opacity-50 transition-opacity"
      :disabled="!canScrollPrev"
      @click="scrollPrev"
      aria-label="Previous slide"
    >
      ←
    </button>
    <button
      class="embla__button embla__button--next absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 text-black rounded-full p-2 shadow-md disabled:opacity-50 transition-opacity"
      :disabled="!canScrollNext"
      @click="scrollNext"
      aria-label="Next slide"
    >
      →
    </button>
  </div>

  <!-- Dots -->
  <div class="embla__dots p-5 left-0 right-0 flex justify-center gap-2">
    <button
      v-for="(img, idx) in images"
      :key="img.id"
      class="embla__dot w-3 h-3 rounded-full transition-all duration-300"
      :class="
        idx === selectedIndex
          ? 'bg-indigo-600! scale-125 shadow-md'
          : 'bg-white/30 hover:bg-white/80'
      "
      @click="scrollTo(idx)"
      aria-label="{`Go to slide ${idx + 1}`}"
    ></button>
  </div>
</template>

<style scoped>
/* Ensure everything stretches full width */
.embla-wrapper,
.embla-main {
  width: 100%;
}

.embla__container {
  width: 100%;
}

/* Optional: smooth height transition if using auto-height plugin later */
.embla-main .embla__viewport {
  transition: height 0.25s ease;
}
</style>
