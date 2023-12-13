<script setup lang="ts">
import { MainPaths } from '@/enums/general.routes'
</script>

<template>
  <div class="navbar">
    <RouterLink
      :to="{ name: MainPaths.HOME.name }"
      class="navbar-item"
      active-class="navbar-active"
    >
      Home
    </RouterLink>
    <RouterLink
      :to="{ name: MainPaths.SHAPEONE.name }"
      class="navbar-item"
      active-class="navbar-active"
    >
      Shape One
    </RouterLink>
    <RouterLink
      :to="{ name: MainPaths.SHAPETWO.name }"
      class="navbar-item"
      active-class="navbar-active"
    >
      Shape Two
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  position: absolute;
  background-color: white;
  width: 100%;
  left: 0;
  top: 0;
  padding: 16px;
  gap: 16px;
  &-item {
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
  &-active {
    font-weight: bold;
  }
}
</style>
