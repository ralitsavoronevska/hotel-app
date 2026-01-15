<!-- src/components/NameForm.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useClientsStore } from '@/stores/clients'
import { usePersonnelStore } from '@/stores/personnel'
import { useRouter } from 'vue-router'

const clientsStore = useClientsStore()
const personnelStore = usePersonnelStore()
const router = useRouter()

// Form state
const firstName = ref('')
const middleNames = ref('')
const familyName = ref('')

const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

// ────────────────────────────────────────────────
// Simulated database of known users
// ────────────────────────────────────────────────

interface KnownUser {
  fullNameNormalized: string
  role: 'client' | 'administrator'
  room_number?: number | undefined
  redirectPath: '/hotel-clients' | '/office-personnel'
}

const knownUsers: KnownUser[] = [
  ...clientsStore.users.map((user) => ({
    fullNameNormalized: [user.first_name, user.middle_names, user.last_name]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim(),
    role: 'client' as const,
    room_number: (user as any).room_number as number | undefined,
    redirectPath: '/hotel-clients' as const,
  })),
  ...personnelStore.users.map((user) => ({
    fullNameNormalized: [user.first_name, user.middle_names, user.last_name]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim(),
    role: 'administrator' as const,
    redirectPath: '/office-personnel' as const,
  })),
]

// ────────────────────────────────────────────────
// Computed values
// ────────────────────────────────────────────────

const isFirstNameValid = computed(() => firstName.value.trim().length >= 2)
const isMiddleNamesValid = computed(() => middleNames.value.trim().length >= 2)
const isFamilyNameValid = computed(() => familyName.value.trim().length >= 2)

const fullNameRaw = computed(() =>
  [firstName.value, middleNames.value, familyName.value].filter(Boolean).join(' ').trim(),
)

const fullNameNormalized = computed(() =>
  fullNameRaw.value.toLowerCase().replace(/\s+/g, ' ').trim(),
)

const isFormValid = computed(
  () => firstName.value.trim().length >= 2 && familyName.value.trim().length >= 2,
)

// ────────────────────────────────────────────────
// Submit handler with routing logic
// ────────────────────────────────────────────────

const handleSubmit = () => {
  errorMessage.value = null

  if (!isFormValid.value) {
    errorMessage.value = 'First and family name are required (min 2 characters each).'
    return
  }

  isSubmitting.value = true

  // Small delay to simulate network / feel more natural
  setTimeout(() => {
    const matchedUser = knownUsers.find(
      (user) => user.fullNameNormalized === fullNameNormalized.value,
    )

    if (matchedUser) {
      // Redirect based on role (use redirectPath and pass the name as a query parameter to avoid params type error)

      console.log('Matched user:', matchedUser.room_number)

      router.push({
        path: matchedUser.redirectPath,
        query: {
          name: matchedUser.fullNameNormalized,
          room_number:
            matchedUser.role.toLocaleLowerCase() === 'client' ? matchedUser.room_number : undefined,
        },
      })
    } else {
      errorMessage.value = `No match found for "${fullNameRaw.value}". Are you a new user?`
      isSubmitting.value = false
    }
  }, 800)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
    <div
      class="max-w-lg w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Enter Your Full Name</h2>
        <p class="mt-2 text-sm text-gray-600">
          Please provide your first name, middle name(s) if any, and family name.
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- First Name -->
          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              id="first-name"
              v-model="firstName"
              type="text"
              autocomplete="given-name"
              required
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 transition-colors"
              :class="{ 'border-red-500 ring-red-500': firstName && !isFirstNameValid }"
              placeholder="e.g. Anna"
            />
            <p v-if="firstName && !isFirstNameValid" class="mt-1 text-xs text-red-600">
              Input your full first name, please
            </p>
          </div>

          <!-- Middle Name(s) -->
          <div>
            <label for="middle-names" class="block text-sm font-medium text-gray-700">
              Middle Name(s)
            </label>
            <input
              id="middle-names"
              v-model="middleNames"
              type="text"
              autocomplete="additional-name"
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 transition-colors"
              :class="{ 'border-red-500 ring-red-500': middleNames && !isMiddleNamesValid }"
              placeholder="e.g. Maria Ivanova"
            />
            <p v-if="middleNames && !isMiddleNamesValid" class="mt-1 text-xs text-red-600">
              Input your full middle name(s), please
            </p>
          </div>
        </div>

        <!-- Family Name -->
        <div>
          <label for="family-name" class="block text-sm font-medium text-gray-700">
            Family Name / Surname *
          </label>
          <input
            id="family-name"
            v-model="familyName"
            type="text"
            autocomplete="family-name"
            required
            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 transition-colors"
            :class="{ 'border-red-500 ring-red-500': familyName && !isFamilyNameValid }"
            placeholder="e.g. Petrova"
          />
          <p v-if="familyName && !isFamilyNameValid" class="mt-1 text-xs text-red-600">
            Input your full family name, please
          </p>
        </div>

        <!-- Submit button -->
        <div class="pt-4">
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!isFirstNameValid || !isFamilyNameValid"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Optional: nicer focus ring */
input:focus {
  outline: none;
  /* ring: 2px solid theme('colors.indigo.500'); */
}
</style>
