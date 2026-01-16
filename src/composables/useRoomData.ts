import { ref } from 'vue'

import { ROOM_IMAGES, type RoomImage } from '@/constants/roomData'

export function useRoomData() {
  const images = ref<RoomImage[]>(ROOM_IMAGES)
  return {
    images,
  }
}
