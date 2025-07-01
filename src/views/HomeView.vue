<script setup>
import { ref } from "vue"
import UiComponent from '../components/UiComponent.vue'
import MapComponent from "@/components/MapComponent.vue"

const isDrawerOpen = ref(false)
const openDrawer = () => {
  isDrawerOpen.value = true
}
const map = ref()

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const resetCoords = () => {
  map.value.resetCoords()
}
</script>

<template>
  <main>
    <MapComponent ref="map" @open-drawer="openDrawer" @close-drawer="closeDrawer" />
    <UiComponent :is-drawer-open="isDrawerOpen" @close-drawer="closeDrawer" @reset-coords="resetCoords" />
  </main>
</template>
