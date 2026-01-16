<script setup lang="ts">
import { ref, watch } from 'vue'
import { LMap, LImageOverlay, LPolygon, LPopup, LTooltip } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { useHotelRoomsStore } from '@/constants/hotelRooms'
import 'leaflet/dist/leaflet.css'

const hotelStore = useHotelRoomsStore()

// Map ref for updates
const mapRef = ref<any>(null)

// Colors based on status
const statusColors = {
  free: '#22c55e',
  occupied: '#ef4444',
  reserved: '#3b82f6',
  maintenance: '#eab308',
}

const getColor = (status: string) => statusColors[status as keyof typeof statusColors] || '#6b7280'

// Update map on floor change or filters
watch([() => hotelStore.currentFloorId, () => hotelStore.selectedStatuses], () => {
  if (mapRef.value) {
    mapRef.value.leafletObject.invalidateSize() // Update size and layers
  }
})
</script>

<template>
  <div class="page-wrapper p-0">
    <div class="p-5 rounded-2xl bg-white">
      <h1 class="text-xl font-bold text-gray-900 mb-5 gradient-text">
        Check-in / Check-out Operations
      </h1>
    </div>
  </div>

  <div class="page-wrapper relative h-[600px] md:h-[750px] w-full rounded-2xl overflow-hidden">
    <!-- Floor selection -->
    <select
      id="select-a-floor"
      v-model="hotelStore.currentFloorId"
      class="absolute top-8 left-18 z-100 p-2 bg-white text-black rounded shadow text-sm font-medium border border-gray-300 focus:outline-none"
    >
      <option v-for="floor in hotelStore.floors" :key="floor.id" :value="floor.id">
        {{ floor.name }}
      </option>
    </select>

    <!-- Status filters -->
    <div
      class="absolute top-8 right-8 z-100 flex flex-col gap-2 bg-white p-3 rounded shadow border border-gray-300"
    >
      <label
        v-for="status in ['free', 'occupied', 'reserved', 'maintenance']"
        :key="status"
        class="flex items-center text-sm"
      >
        <input
          type="checkbox"
          :checked="
            hotelStore.selectedStatuses.includes(
              status as 'free' | 'occupied' | 'reserved' | 'maintenance',
            )
          "
          @change="
            hotelStore.toggleStatus(status as 'free' | 'occupied' | 'reserved' | 'maintenance')
          "
          class="mr-2!"
        />
        <div
          class="w-[12px] h-[12px] font-semibold mr-2!"
          :class="{
            'bg-[#22c55e]': status === 'free',
            'bg-[#ef4444]': status === 'occupied',
            'bg-[#3b82f6]': status === 'reserved',
            'bg-[#eab308]': status === 'maintenance',
          }"
        ></div>
        <span
          class="font-semibold"
          :class="{
            'text-[#22c55e]': status === 'free',
            'text-[#ef4444]': status === 'occupied',
            'text-[#3b82f6]': status === 'reserved',
            'text-[#eab308]': status === 'maintenance',
          }"
        >
          {{
            status === 'free'
              ? 'Free'
              : status === 'occupied'
                ? 'Occupied'
                : status === 'reserved'
                  ? 'Reserved'
                  : 'In Maintenance'
          }}
        </span>
      </label>
    </div>

    <!-- The map -->

    <l-map
      ref="mapRef"
      :use-global-leaflet="false"
      :zoom="1"
      :center="
        hotelStore.currentFloor?.bounds
          ? [hotelStore.currentFloor.bounds[1][0] / 2, hotelStore.currentFloor.bounds[1][1] / 2]
          : [0, 0]
      "
      :bounds="hotelStore.currentFloor?.bounds"
      :max-zoom="4"
      :min-zoom="0.5"
      :zoom-control="true"
      :attribution-control="false"
      class="h-full w-full rounded-2xl border-6 border-white"
    >
      <!-- Background – image of the current floor -->
      <l-image-overlay
        v-if="hotelStore.currentFloor"
        :url="hotelStore.currentFloor.image"
        :bounds="hotelStore.currentFloor.bounds"
      />

      <!-- Rooms as polygons (filtered) -->
      <l-polygon
        v-for="room in hotelStore.filteredRooms"
        :key="room.id"
        :lat-lngs="room.coords"
        :color="getColor(room.status)"
        :fill-color="getColor(room.status)"
        :fill-opacity="0.45"
        :weight="2"
        :interactive="true"
      >
        <!-- Tooltip on hover -->
        <l-tooltip :permanent="false" direction="top">
          {{ room.name }}
        </l-tooltip>

        <!-- Popup on click -->
        <l-popup :auto-pan="true">
          <div class="text-sm font-medium">
            <h3 class="font-bold text-base mb-1">{{ room.name }}</h3>
            <p class="mb-1">
              Status:
              <span
                class="font-semibold"
                :class="{
                  'text-[#22c55e]': room.status === 'free',
                  'text-[#ef4444]': room.status === 'occupied',
                  'text-[#3b82f6]': room.status === 'reserved',
                  'text-[#eab308]': room.status === 'maintenance',
                }"
              >
                {{
                  room.status === 'free'
                    ? 'Free'
                    : room.status === 'occupied'
                      ? 'Occupied'
                      : room.status === 'reserved'
                        ? 'Reserved'
                        : 'In Maintenance'
                }}
              </span>
            </p>
            <p v-if="room.details" class="text-gray-700">{{ room.details }}</p>
            <button
              class="mt-2 px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
            >
              Reserve / Details
            </button>
          </div>
        </l-popup>
      </l-polygon>
    </l-map>
  </div>
</template>

<style>
/* Upgrading the popup appearance */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

:deep(.leaflet-popup-tip) {
  background: white;
}
/* Mandatory for Leaflet in Vue/Vite */
:deep(.leaflet-container) {
  height: 100% !important;
  width: 100% !important;
}

.leaflet-container {
  height: 100%;
  width: 100%;
}

/* Fix for visible polygons */
:deep(.leaflet-interactive) {
  pointer-events: auto !important;
  cursor: pointer;
}

/* Better appearance for path (polygons) */
:deep(path.leaflet-interactive) {
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* If polygons are still "flat" – force fill */
:deep(.leaflet-overlay-pane svg g path) {
  fill-opacity: 0.45 !important;
  stroke-opacity: 1 !important;
  stroke-width: 3 !important; /* Increase stroke width for testing */
}
</style>
