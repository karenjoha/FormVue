<template>
  <div class="flex flex-col">
    <label class="font-semibold mb-1">{{ label }}</label>
    <div class="relative">
      <input
        :type="type"
        :placeholder="placeholder"
        class="input-text"
        v-model="localValue"
        @blur="$emit('blur')"
      />

      <ValidationIcon :valid="isValid" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ValidationIcon from '../ValidationIcon.vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  isValid: Boolean,
  
})

const emit = defineEmits(['update:modelValue', 'blur'])

const localValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>

<style scoped>
.input-text {
  @apply border border-gray-300 rounded px-3 py-2 w-full pr-10;
}
</style>
