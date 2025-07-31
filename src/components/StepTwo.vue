<template>
  <div class="space-y-4">
    <!-- Email -->
    <BaseInput
      v-model="form.email"
      label="Correo electrónico *"
      type="email"
      :isValid="validEmail"
    />
    <p v-if="form.email && !validEmail" class="text-red-600 text-sm">Debe ser un correo válido</p>

    <!-- Contraseña -->
    <BaseInput
      v-model="form.password"
      label="Contraseña *"
      type="password"
      :isValid="form.password.length >= 6"
    />
    <p v-if="form.password && form.password.length < 6" class="text-red-600 text-sm">Mínimo 6 caracteres</p>

    <!-- Confirmar contraseña -->
    <BaseInput
        v-model="form.confirmarPassword"
        label="Confirmar Contraseña *"
        type="password"
        :isValid="form.confirmarPassword === form.password && form.confirmarPassword.length >= 6"
    />
    <p
      v-if="form.confirmPassword && form.confirmPassword !== form.password"
      class="text-red-600 text-sm"
    >
      Las contraseñas no coinciden
    </p>

    <!-- Teléfono fijo -->
    <BaseInput
        v-model="form.telefono"
        label="Teléfono fijo"
        type="text"
        :isValid="form.telefono === '' || isValidPhone(form.telefono)"
    />
    <p
      v-if="form.phone && !isValidPhone(form.phone)"
      class="text-red-600 text-sm"
    >
      Número inválido
    </p>

    <!-- Teléfono celular -->
    <BaseInput
        v-model="form.celular"
        label="Teléfono celular *"
        type="text"
        :isValid="isValidMobile(form.celular)"
    />
    <p
      v-if="form.mobile && !isValidMobile(form.mobile)"
      class="text-red-600 text-sm"
    >
      Número inválido
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseInput from './fields/BaseInput.vue'

const props = defineProps({
  modelValue: Object,
})
const emit = defineEmits(['update:modelValue'])

const form = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const validEmail = computed(() => {
  const email = form.value.email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
})

function isValidPhone(value) {
  return /^\d{6,10}$/.test(value)
}

function isValidMobile(value) {
  return /^\d{10}$/.test(value)
}
</script>
