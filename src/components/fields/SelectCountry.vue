<template>
  <div class="relative">
    <label class="block text-sm font-medium mb-1">País *</label>

    <!-- Campo visible -->
    <button
      @click="open = !open"
      class="w-full flex justify-between items-center border rounded px-4 py-2 bg-white shadow-sm"
    >
      <div class="flex items-center gap-2 truncate">
        <img v-if="selectedFlag" :src="selectedFlag" class="w-5 h-4 object-cover rounded border" />
        <span class="truncate text-left">{{ selectedName || 'Seleccionar país' }}</span>
      </div>
      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="open"
      class="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-60 overflow-auto"
    >
      <ul>
        <li
          v-for="pais in countries"
          :key="pais.code"
          @click="selectCountry(pais)"
          class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <img :src="pais.flag" class="w-5 h-4 object-cover rounded border" />
          <span class="truncate">{{ pais.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const countries = ref([])
const selectedName = ref('')
const selectedFlag = ref('')

watch(() => props.modelValue, newVal => {
  const pais = countries.value.find(p => p.name === newVal)
  if (pais) {
    selectedName.value = pais.name
    selectedFlag.value = pais.flag
  }
})

const selectCountry = (pais) => {
  selectedName.value = pais.name
  selectedFlag.value = pais.flag
  emit('update:modelValue', pais.name)
  open.value = false
}

onMounted(async () => {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,translations,flags')
    const data = await res.json()
    countries.value = data
      .map(p => ({
        name: p.translations?.spa?.common || p.name.common,
        flag: p.flags?.png || '',
        code: p.cca2 || ''
      }))
      .sort((a, b) => a.name.localeCompare(b.name))

    const pais = countries.value.find(p => p.name === props.modelValue)
    if (pais) {
      selectedName.value = pais.name
      selectedFlag.value = pais.flag
    }
  } catch (err) {
    console.error('Error cargando países:', err)
  }
})
</script>
