<template>
  <div class="grid gap-4">
    <!-- Dirección -->
        <BaseInput
        label="Dirección"
        type="text"
        placeholder="Calle 123 #45-67"
        v-model="form.direccion"
        :error="errors?.direccion"
        :isValid="form.direccion.length >= 5"
    />

    <!-- Código Postal -->
    <BaseInput
        label="Código Postal"
        type="text"
        placeholder="110111"
        v-model="form.codigoPostal"
        :error="errors?.codigoPostal"
        :isValid="form.codigoPostal.length >= 4"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseInput from './fields/BaseInput.vue'

const props = defineProps({
  modelValue: Object,
  errors: Object
})

const emit = defineEmits(['update:modelValue'])

const form = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>
