<!-- src/components/CampoDetalle.vue -->
<template>
  <div class="q-pa-sm bg-grey-1 rounded-borders">
    <div class="text-caption text-grey-6">{{ label }}</div>
    <div class="text-body2">{{ valor || '—' }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  valor: String,
})
</script>
