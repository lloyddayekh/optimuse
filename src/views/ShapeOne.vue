<script setup lang="ts">
import ThreeDObjectGenerator from '@/components/ThreeDObjectGenerator.vue'

const geometry = [
  [0, 0],
  [0, 10],
  [15, 10],
  [7, 15],
  [7, 8],
  [7, 0]
]
</script>

<template>
  <div>
    <ThreeDObjectGenerator :geometry="geometry" :editable-height="10" />
  </div>
</template>
