<script setup lang="ts">
import { ref, watch } from 'vue'
import { LMap, LImageOverlay, LPolygon, LPopup, LTooltip } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { useHotelStore } from '@/stores/hotel' // Път към store-а
import 'leaflet/dist/leaflet.css'

// Важно: Leaflet очаква този клас на body или root
document.body.classList.add('leaflet-container-custom')

const hotelStore = useHotelStore()

// Карта ref за актуализации
const mapRef = ref<any>(null)

// Цветове според статус
const statusColors = {
  free: '#22c55e',
  occupied: '#ef4444',
  reserved: '#3b82f6',
  maintenance: '#eab308',
}

const getColor = (status: string) => statusColors[status as keyof typeof statusColors] || '#6b7280'

// Актуализация на картата при смяна на етаж или филтри
watch([() => hotelStore.currentFloorId, () => hotelStore.selectedStatuses], () => {
  if (mapRef.value) {
    mapRef.value.leafletObject.invalidateSize() // Актуализирай размера и слоевете
  }
})
</script>

<template>
  <div
    class="relative h-[500px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-lg"
  >
    <!-- Избор на етаж -->
    <select
      id="select-a-floor"
      v-model="hotelStore.currentFloorId"
      class="absolute top-4 left-4 z-1000 p-2 bg-white text-black rounded shadow text-sm font-medium border border-gray-300"
    >
      <option v-for="floor in hotelStore.floors" :key="floor.id" :value="floor.id">
        {{ floor.name }}
      </option>
    </select>

    <!-- Филтри за статус -->
    <div
      class="absolute top-4 right-4 z-1000 flex flex-col gap-2 bg-white text-black p-3 rounded shadow border border-gray-300"
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
        <span
          :class="`text-${status === 'free' ? 'green' : status === 'occupied' ? 'red' : status === 'reserved' ? 'blue' : 'yellow'}-700`"
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

    <!-- Картата -->
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
      class="h-full w-full"
    >
      <!-- Фон – изображение на текущия етаж -->
      <l-image-overlay
        v-if="hotelStore.currentFloor"
        :url="hotelStore.currentFloor.image"
        :bounds="hotelStore.currentFloor.bounds"
      />

      <!-- Стаи като полигони (филтрирани) -->
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
        <!-- Tooltip при hover -->
        <l-tooltip :permanent="false" direction="top">
          {{ room.name }}
        </l-tooltip>

        <!-- Popup при клик -->
        <l-popup :auto-pan="true">
          <div class="text-sm font-medium">
            <h3 class="font-bold text-base mb-1">{{ room.name }}</h3>
            <p class="mb-1">
              Статус:
              <span
                :class="`font-semibold text-${room.status === 'free' ? 'green' : room.status === 'occupied' ? 'red' : room.status === 'reserved' ? 'blue' : 'yellow'}-700`"
              >
                {{
                  room.status === 'free'
                    ? 'Свободна'
                    : room.status === 'occupied'
                      ? 'Заета'
                      : room.status === 'reserved'
                        ? 'Резервирана'
                        : 'Поддръжка'
                }}
              </span>
            </p>
            <p v-if="room.details" class="text-gray-700">{{ room.details }}</p>
            <button
              class="mt-2 px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
            >
              Резервирай / Детайли
            </button>
          </div>
        </l-popup>
      </l-polygon>
    </l-map>
  </div>
</template>

<style>
/* Подобряване на popup изгледа */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

:deep(.leaflet-popup-tip) {
  background: white;
}
/* Задължително за Leaflet в Vue/Vite */
:deep(.leaflet-container) {
  height: 100% !important;
  width: 100% !important;
}

.leaflet-container {
  height: 100%;
  width: 100%;
}

/* Поправка за видими полигони */
:deep(.leaflet-interactive) {
  pointer-events: auto !important;
  cursor: pointer;
}

/* По-добър вид на path (полигони) */
:deep(path.leaflet-interactive) {
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Ако полигоните все още са "плоски" – форсирай fill */
:deep(.leaflet-overlay-pane svg g path) {
  fill-opacity: 0.45 !important;
  stroke-opacity: 1 !important;
  stroke-width: 3 !important; /* Увеличи дебелината на контура за тестване */
}
</style>
