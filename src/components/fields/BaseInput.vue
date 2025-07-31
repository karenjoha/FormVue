<template>
  <div class="flex flex-col">
    <label class="font-semibold mb-1 text-gray-700">{{ label }}</label>
    <div class="relative">
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="localValue"
        @blur="markTouched"
        :class="[
          'input-text',
          showError && 'border-red-500 ring-2 ring-red-300',
          showSuccess && 'border-green-300 ring-2 ring-green-200',
          !showError && !showSuccess && 'border-gray-300'
        ]"
      />
      <ValidationIcon :valid="isValid === true && touched" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ValidationIcon from '../ValidationIcon.vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  isValid: {
    type: [Boolean, null],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const localValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const touched = ref(false)

function markTouched() {
  touched.value = true
  emit('blur')
}

const showError = computed(() => touched.value && props.isValid === false)
const showSuccess = computed(() => touched.value && props.isValid === true)
</script>

<style scoped>
.input-text {
  @apply rounded-xl px-4 py-2 w-full pr-10 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400 border focus:outline-none focus:ring-0;
}

</style>
