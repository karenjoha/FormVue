<template>
  <div class="relative w-full mb-8">
    <div class="flex justify-between mb-2">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="text-sm text-center flex-1"
        :class="{ 'text-primary font-bold': index === currentStep }"
      >
        {{ step }}
      </div>
    </div>
    <div class="relative h-2 bg-gray-200 rounded-full">
      <div
        class="absolute h-full bg-primary rounded-full transition-all duration-300"
        :style="{ width: ((currentStep + 1) / steps.length * 100) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: Array,
  currentStep: Number
})
</script>
