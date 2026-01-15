import { defineStore } from 'pinia'

type BoundsLiteral = [[number, number], [number, number]]

interface Room {
  id: string
  name: string
  status: 'free' | 'occupied' | 'reserved' | 'maintenance'
  coords: [number, number][] // Polygon координати
  details?: string
}
interface Floor {
  id: number
  name: string
  image: string // URL на floorplan изображението
  bounds: BoundsLiteral
  rooms: Room[]
}

export const useHotelStore = defineStore('hotel', {
  state: () => ({
    floors: [
      {
        id: 1,
        name: 'Floor 1',
        image: '/floorplan-level-1.jpg', // Замени с реални изображения
        bounds: [
          [0, 0],
          [551, 511],
        ],
        rooms: [
          {
            id: '101',
            name: 'Room 101 - Standard',
            status: 'free',
            coords: [
              [50, 50],
              [50, 500],
              [500, 500],
              [500, 50],
            ],
            details: 'Capacity: 2 persons • Bed: double',
          },
          {
            id: '102',
            name: 'Room 102 - Deluxe',
            status: 'occupied',
            coords: [
              [220, 100],
              [220, 200],
              [320, 200],
              [320, 100],
            ],
            details: 'Occupied until 15:00 • Guest: Ivanov',
          },
          {
            id: '103',
            name: 'Room 103 - Apartment',
            status: 'reserved',
            coords: [
              [340, 100],
              [340, 250],
              [500, 250],
              [500, 100],
            ],
            details: 'Reserved for January 18–20',
          },
          {
            id: '104',
            name: 'Room 104 - In Maintenance',
            status: 'maintenance',
            coords: [
              [100, 220],
              [100, 320],
              [250, 320],
              [250, 220],
            ],
            details: 'Cleaning until 14:00',
          },
        ],
      },
      {
        id: 2,
        name: 'Етаж 2',
        image: '/floorplan-level-2.jpg',
        bounds: [
          [0, 0],
          [538, 506],
        ],
        rooms: [
          {
            id: '201',
            name: 'Room 201 - Superior',
            status: 'free',
            coords: [
              [50, 50],
              [50, 150],
              [150, 150],
              [150, 50],
            ],
            details: 'Capacity: 4 persons • Balcony: Yes',
          },
          {
            id: '202',
            name: 'Room 202 - Family',
            status: 'occupied',
            coords: [
              [170, 50],
              [170, 150],
              [270, 150],
              [270, 50],
            ],
            details: 'Occupied by family',
          },
        ],
      },
    ] as Floor[],
    currentFloorId: 1, // По подразбиране етаж 1
    selectedStatuses: ['free', 'occupied', 'reserved', 'maintenance'] as Room['status'][], // Всички по подразбиране
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
