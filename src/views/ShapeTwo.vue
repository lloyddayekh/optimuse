<script setup lang="ts">
import ThreeDObjectGenerator from '@/components/ThreeDObjectGenerator.vue'

const geometry = [
  [0, 0],
  [7, 12],
  [0, 14]
]
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <ThreeDObjectGenerator :geometry="geometry" :editable-height="8" />
  </main>
</template>
