<template>
  <div class="w-[80%] h-[50rem] overflow-auto mx-auto p-6 bg-white shadow-md rounded">
    <!-- Linea de tiempo -->
    <StepProgress :steps="['1', '2', '3']" :currentStep="currentStep" />

    <!-- Forms -->
    <div v-if="currentStep === 0">
      <StepOne v-model="form" :errors="errors"/>
    </div>
    <div v-else-if="currentStep === 1">
      <StepTwo v-model="form" :errors="errors"/>
    </div>
    <div v-else>
      <StepThree v-model="form" :errors="errors"/>
    </div>

    <!-- Navegacion -->
    <div class="mt-6 flex justify-between">
      <button
        v-if="currentStep > 0"
        @click="prevStep"
        class="px-4 py-2 bg-gray-300 rounded"
      >
        Atrás
      </button>
      <button
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        class="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded"
      >
        Siguiente
      </button>
      <button
        v-if="currentStep === steps.length - 1"
        @click="submit"
        class="px-4 py-2 bg-green-500 text-white rounded"
      >
        Enviar
      </button>
    </div>

    <!-- Modal -->
    <!-- Modal -->
<transition name="fade">
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center animate-pop">
      <!-- Ícono -->
      <div class="flex justify-center mb-4">
        <div class="bg-primary/10 text-primary p-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <!-- Título -->
      <h2 class="text-xl font-semibold text-gray-800 mb-2">¡Registro enviado!</h2>
      <p class="text-gray-600 mb-6">Tu formulario fue enviado exitosamente.</p>

      <!-- Botón -->
      <button
        @click="showModal = false"
        class="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full transition"
      >
        Cerrar
      </button>
    </div>
  </div>
</transition>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import StepOne from '../components/StepOne.vue'
import StepTwo from '../components/StepTwo.vue'
import StepThree from '../components/StepThree.vue'
import StepProgress from '../components/StepProgress.vue'
const currentStep = ref(0)
const steps = ['Datos personales', 'Credenciales', 'Dirección']

const form = reactive({
  // Paso 1
  pais: '',
  genero: '',
  primerNombre: '',
  segundoNombre: '',
  fechaNacimiento: '',
  tipoDocumento: '',
  numeroDocumento: '',
  fotoFrente: null,
  fotoReverso: null,
  // Paso 2
  email: '',
  password: '',
  confirmarPassword: '',
  telefono: '',
  celular: '',
  // Paso 3
  direccion: '',
  codigoPostal: ''
})

const errors = reactive({})

const showModal = ref(false)

function nextStep() {
  if (validateStep()) {
    currentStep.value++
  }
}

function prevStep() {
  currentStep.value--
}

function submit() {
  if (validateStep()) {
    console.log({ ...form })
    showModal.value = true
  }
}

function validateStep() {
  for (const key in errors) {
    delete errors[key]
  }

  if (currentStep.value === 0) {
    if (!form.pais) errors.pais = 'El país es obligatorio.'
    if (!form.genero) errors.genero = 'El género es obligatorio.'
    if (!form.primerNombre) errors.primerNombre = 'El primer nombre es obligatorio.'
    if (!form.fechaNacimiento) errors.fechaNacimiento = 'La fecha es obligatoria.'
    if (!form.tipoDocumento) errors.tipoDocumento = 'El tipo de documento es obligatorio.'
    if (!form.numeroDocumento || form.numeroDocumento.length < 6)
      errors.numeroDocumento = 'Debe tener al menos 6 caracteres.'
    if (!form.fotoFrente) errors.fotoFrente = 'La foto frontal es obligatoria.'
    if (!form.fotoReverso) errors.fotoReverso = 'La foto trasera es obligatoria.'
  }

  if (currentStep.value === 1) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email || !emailRegex.test(form.email))
      errors.email = 'Debe ser un correo válido.'
    if (!form.password || form.password.length < 6)
      errors.password = 'Debe tener al menos 6 caracteres.'
    if (!form.confirmarPassword)
      errors.confirmarPassword = 'Debes confirmar la contraseña.'
    else if (form.confirmarPassword !== form.password)
      errors.confirmarPassword = 'Las contraseñas no coinciden.'
    if (!form.telefono) errors.telefono = 'El teléfono es obligatorio.'
    if (!form.celular) errors.celular = 'El celular es obligatorio.'
  }

  if (currentStep.value === 2) {
    if (!form.direccion || form.direccion.length < 5)
      errors.direccion = 'La dirección debe tener al menos 5 caracteres.'
    if (!form.codigoPostal || form.codigoPostal.length < 4)
      errors.codigoPostal = 'El código postal debe tener al menos 4 dígitos.'
  }
  return Object.keys(errors).length === 0
}

</script>
<style scoped>
/* Animación del modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes pop {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-pop {
  animation: pop 0.3s ease-out;
}
</style>