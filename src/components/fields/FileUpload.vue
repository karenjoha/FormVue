<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="font-medium text-sm text-gray-700">
      {{ label }}
    </label>

    <!-- Área visual de carga -->
    <label
      :for="id"
      :class="[
        'border-2 border-dashed rounded-xl cursor-pointer px-4 py-6 text-center text-sm transition',
        showError
          ? 'border-red-500 bg-red-50 text-red-600'
          : showSuccess
          ? 'border-green-400 bg-green-50 text-green-700'
          : 'border-gray-300 text-gray-500 hover:bg-gray-50'
      ]"
    >
      <div v-if="fileName" class="font-medium text-gray-800 truncate">
        📄 {{ fileName }}
      </div>
      <div v-else>
        📎 Haz clic para seleccionar un archivo JPG
      </div>
    </label>

    <!-- Input oculto -->
    <input
      :id="id"
      type="file"
      accept=".jpg,.jpeg"
      class="hidden"
      @change="handleChange"
    />

    <!-- Mensaje de error si aplica -->
    <p v-if="showError" class="text-sm text-red-500 mt-1">
      Debes seleccionar un archivo JPG.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: File,
  label: String,
  id: String,
})

const emit = defineEmits(['update:modelValue'])

const fileName = ref('')
const touched = ref(false)

function handleChange(event) {
  const file = event.target.files[0]
  touched.value = true

  if (file) {
    fileName.value = file.name
    emit('update:modelValue', file)
  } else {
    fileName.value = ''
    emit('update:modelValue', null)
  }
}

const showError = computed(() => touched.value && !props.modelValue)
const showSuccess = computed(() => touched.value && !!props.modelValue)
</script>
