import { defineStore } from 'pinia'

type BoundsLiteral = [[number, number], [number, number]]

interface Room {
  id: string
  name: string
  status: 'free' | 'occupied' | 'reserved' | 'maintenance'
  coords: [number, number][]
  details?: string
}

interface Floor {
  id: number
  name: string
  image: string
  bounds: BoundsLiteral
  rooms: Room[]
}

export const useHotelRoomsStore = defineStore('hotelRooms', {
  state: () => ({
    floors: [
      {
        id: 1,
        name: 'Floor 1',
        image: 'public/floorplan-level-1.jpg',
        bounds: [
          [0, 0],
          [550, 510],
        ],
        rooms: [
          {
            id: '101',
            name: 'Room 101 - Standard',
            status: 'free',
            coords: [
              [73, 0], // bottom-left
              [210, 0], // bottom-right
              [210, 220], // top-right
              [73, 220], // top-left
            ],
            details: 'Capacity: 2 persons • Bed: double',
          },
          {
            id: '102',
            name: 'Room 102 - Deluxe',
            status: 'occupied',
            coords: [
              [73, 295], // bottom-left
              [73, 510], // bottom-right
              [210, 510], // top-right
              [210, 295], // top-left
            ],
            details: 'Occupied until 15:00 • Guest: Ivanov',
          },
          {
            id: '103',
            name: 'Room 103 - Apartment',
            status: 'reserved',
            coords: [
              [72, 0], // bottom-left
              [0, 0], // bottom-right
              [0, 256], // top-right
              [72, 256], // top-left
            ],
            details: 'Reserved for January 18–20',
          },
          {
            id: '104',
            name: 'Room 104 - In Maintenance',
            status: 'maintenance',
            coords: [
              [0, 260], // bottom-left
              [0, 510], // bottom-right
              [72, 510], // top-right
              [72, 260], // top-left
            ],
            details: 'Cleaning until 14:00',
          },
        ],
      },
      {
        id: 2,
        name: 'Floor 2',
        image: 'public/floorplan-level-2.jpg',
        bounds: [
          [0, 0],
          [550, 510],
        ],
        rooms: [
          {
            id: '201',
            name: 'Room 201 - Superior',
            status: 'free',
            coords: [
              [73, 0], // bottom-left
              [210, 0], // bottom-right
              [210, 220], // top-right
              [73, 220], // top-left
            ],
            details: 'Capacity: 4 persons • Balcony: Yes',
          },
          {
            id: '202',
            name: 'Room 202 - Family',
            status: 'occupied',
            coords: [
              [73, 295], // bottom-left
              [73, 510], // bottom-right
              [210, 510], // top-right
              [210, 295], // top-left
            ],
            details: 'Occupied by family',
          },
          {
            id: '203',
            name: 'Room 203 - Suite',
            status: 'free',
            coords: [
              [72, 0], // bottom-left
              [0, 0], // bottom-right
              [0, 256], // top-right
              [72, 256], // top-left
            ],
            details: 'Capacity: 4 persons • Balcony: Yes',
          },
          {
            id: '204',
            name: 'Room 204 - Presidential Suite',
            status: 'reserved',
            coords: [
              [0, 260], // bottom-left
              [0, 510], // bottom-right
              [72, 510], // top-right
              [72, 260], // top-left
            ],
            details: 'Reserved for VIP guest',
          },
        ],
      },
    ] as Floor[],
    currentFloorId: 1,
    selectedStatuses: ['free', 'occupied', 'reserved', 'maintenance'] as Room['status'][],
  }),
  getters: {
    currentFloor: (state) => state.floors.find((floor) => floor.id === state.currentFloorId),
    filteredRooms: (state) => {
      const floor = state.floors.find((f) => f.id === state.currentFloorId)
      return floor ? floor.rooms.filter((room) => state.selectedStatuses.includes(room.status)) : []
    },
  },
  actions: {
    setFloor(id: number) {
      this.currentFloorId = id
    },
    toggleStatus(status: Room['status']) {
      if (this.selectedStatuses.includes(status)) {
        this.selectedStatuses = this.selectedStatuses.filter((s) => s !== status)
      } else {
        this.selectedStatuses.push(status)
      }
    },
  },
})
