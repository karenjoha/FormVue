<template>
  <div class="space-y-4">
    <!-- País -->
    <SelectCountry v-model="form.pais" />


    <!-- Género -->
    <BaseInput
    v-model="form.genero"
    label="Género *"
    placeholder="Ej. Femenino"
    :isValid="form.genero !== ''"
    @blur="validateField('genero')"
    />


    <!-- Primer Nombre -->
    <BaseInput
        v-model="form.primerNombre"
        label="Primer Nombre *"
        :isValid="form.primerNombre.length > 0"
    />
    
    <!-- Segundo Nombre -->
    <BaseInput
        v-model="form.segundoNombre"
        label="Segundo Nombre *"
        :isValid="form.segundoNombre.length > 0"
    />

    <!-- Fecha de nacimiento -->
    <div class="flex flex-col">
    <label class="font-semibold">Fecha de nacimiento *</label>
    <div class="relative">
        <input
  v-model="form.fechaNacimiento"
  @change="validateEdad"
  type="date"
  :class="[
    'w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none transition',
    edadValida === true
      ? 'border-green-500 focus:ring-2 focus:ring-green-300'
      : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300'
  ]"
/>

        <ValidationIcon :valid="edadValida" />
    </div>
    </div>


        <!-- Tipo documento -->
    <div class="flex flex-col">
    <label class="font-semibold">Tipo de documento *</label>
    <div class="relative">
        <select
        v-model="form.tipoDocumento"
  @change="validateField('tipoDocumento')"
  :class="[
    'w-full px-4 py-2 border rounded-xl shadow-sm bg-white focus:outline-none transition',
    form.tipoDocumento
      ? 'border-green-500 focus:ring-2 focus:ring-green-300'
      : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300'
  ]"
        >
        <option value="">Seleccione una opción</option>
        <option value="CC">Cédula de ciudadanía</option>
        <option value="Pasaporte">Pasaporte</option>
        <option value="CE">Cédula de extranjería</option>
        </select>
        <ValidationIcon :valid="form.tipoDocumento !== ''" />
    </div>
    </div>


    <!-- Número documento -->
    <div class="flex flex-col">
    <label class="font-semibold">Número de documento *</label>
    <div class="relative">
        <input
  v-model="form.numeroDocumento"
  @input="validateNumeroDocumento"
  type="text"
  :class="[
    'w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none transition',
    form.numeroDocumento.length >= 5 && /^\d+$/.test(form.numeroDocumento)
      ? 'border-green-500 focus:ring-2 focus:ring-green-300'
      : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300'
  ]"
/>

        <ValidationIcon :valid="form.numeroDocumento.length >= 5 && /^\d+$/.test(form.numeroDocumento)" />
    </div>
    </div>

 
    <div class="flex p-2 gap-8">
        <!-- Foto Frente -->
        <FileUpload
            v-model="form.fotoFrente"
            label="Foto documento – Frente (JPG) *"
            id="fotoFrente"
        />
    
        <!-- Foto Reverso -->
        <FileUpload
            v-model="form.fotoReverso"
            label="Foto documento – Reverso (JPG) *"
            id="fotoReverso"
        />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ValidationIcon from './ValidationIcon.vue'
import BaseInput from './fields/BaseInput.vue'
import SelectCountry from './fields/SelectCountry.vue'
import FileUpload from './fields/FileUpload.vue'
const props = defineProps({
  modelValue: Object,
  errors: Object
})
const emit = defineEmits(['update:modelValue'])

const form = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

const paises = ref([])

onMounted(async () => {
  try {
const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,translations,flags')
    const data = await res.json()
    paises.value = data
      .map(p => ({
        name: p.translations?.spa?.common || p.name.common,
        flag: p.flags?.png || '',
        code: p.cca2 || ''
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (err) {
    console.error('Error cargando países:', err)
  }
})

const edadValida = computed(() => {
  if (!form.value.fechaNacimiento) return false
  const hoy = new Date()
  const fechaNacimiento = new Date(form.value.fechaNacimiento)
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
  const mes = hoy.getMonth() - fechaNacimiento.getMonth()
  return edad > 18 || (edad === 18 && mes >= 0)
})

function validateField(field) {
  return !!form.value[field]
}

function validateNumeroDocumento() {
  const val = form.value.numeroDocumento
  return /^\d{5,}$/.test(val)
}

function validateEdad() {
  return edadValida.value
}

function onFileChange(field, event) {
  const file = event.target.files[0]
  if (file && file.type.includes('image')) {
    form.value[field] = file
  }
}
</script>

<style scoped>
.input-text {
  @apply border border-gray-300 rounded px-3 py-2 w-full pr-10;
}
.input-select {
  @apply border border-gray-300 rounded px-3 py-2 w-full pr-10;
}
.input-file {
  @apply mt-1;
}
</style>
