import { defineStore } from 'pinia'

interface Client {
  id: string
  first_name: string
  middle_names: string
  last_name: string
  room_number: number
  role: string
}

export const useClientsStore = defineStore('clients', {
  state: () => ({
    users: [
      {
        id: '1',
        first_name: 'Ralitsa',
        middle_names: 'Ivanova',
        last_name: 'Voronevska',
        room_number: 101,
        role: 'Client',
      },
    ] as Client[],
  }),
  getters: {
    getUserByNames:
      (state) =>
      (
        first_name: string,
        middle_names: string,
        last_name: string,
        room_number: number | undefined,
      ) =>
        state.users.find(
          (user) =>
            user.first_name === first_name &&
            user.middle_names === middle_names &&
            user.last_name === last_name &&
            user.room_number === room_number,
        ),
  },
  actions: {
    addUser(user: Client) {
      this.users.push(user)
    },
    removeUser(id: string) {
      this.users = this.users.filter((user) => user.id !== id)
    },
  },
})
