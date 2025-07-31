<template>
  <div class="absolute right-2 top-1/2 -translate-y-1/2">
    <div
      v-if="valid"
      class="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div
      v-else
      class="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({ valid: Boolean })
</script>
