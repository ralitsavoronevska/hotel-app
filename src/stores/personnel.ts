import { defineStore } from 'pinia'

interface Personnel {
  id: string
  first_name: string
  middle_names: string
  last_name: string
  role: string
}

export const usePersonnelStore = defineStore('personnel', {
  state: () => ({
    users: [
      {
        id: '1',
        first_name: 'Radina',
        middle_names: 'Ivanova',
        last_name: 'Voronevska',
        role: 'Administrator',
      },
    ] as Personnel[],
  }),
  getters: {
    getUserByNames: (state) => (first_name: string, middle_names: string, last_name: string) =>
      state.users.find(
        (user) =>
          user.first_name === first_name &&
          user.middle_names === middle_names &&
          user.last_name === last_name,
      ),
  },
  actions: {
    addUser(user: Personnel) {
      this.users.push(user)
    },
    removeUser(id: string) {
      this.users = this.users.filter((user) => user.id !== id)
    },
  },
})
