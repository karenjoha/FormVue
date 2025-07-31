<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="font-medium text-sm text-gray-700">
      {{ label }}
    </label>
    
    <label
      :for="id"
      class="border-2 border-dashed rounded-xl cursor-pointer px-4 py-6 text-center text-sm text-gray-500 hover:bg-gray-50 transition"
    >
      <div v-if="fileName" class="font-medium text-gray-800 truncate">
        📄 {{ fileName }}
      </div>
      <div v-else>
        📎 Haz clic para seleccionar un archivo JPG
      </div>
    </label>

    <input
      :id="id"
      type="file"
      accept=".jpg,.jpeg"
      class="hidden"
      @change="handleChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: File,
  label: String,
  id: String,
})

const emit = defineEmits(['update:modelValue'])

const fileName = ref('')

function handleChange(event) {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name
    emit('update:modelValue', file)
  }
}
</script>
