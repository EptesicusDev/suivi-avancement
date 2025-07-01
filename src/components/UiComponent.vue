<script setup>
import InformationDrawerComponent from "./InformationDrawerComponent.vue"
import BottomFloatingComponent from "./BottomFloatingComponent.vue"
import TopFloatingComponent from "./TopFloatingComponent.vue"
import DataCardComponent from "./DataCardComponent.vue"
import { useWorkshopStore } from "@/stores/workshops"
import { computed } from "vue"
import RightFloatingComponent from "./RightFloatingComponent.vue"

const store = useWorkshopStore()
const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(["closeDrawer", "resetCoords"])

const closeDrawer = () => {
    emit("closeDrawer")
}

const resetCoords = () => {
    emit("resetCoords")
}

const displayAValue = computed(() => {
    return store.getCompletionA().current + '/' + store.getTotalA().current
})

const displayCValue = computed(() => {
    return store.getCompletionC().current + '/' + store.getTotalC().current
})

const displayDValue = computed(() => {
    return store.getCompletionD().current + '/' + store.getTotalD().current
})

const displayDrValue = computed(() => {
    return store.getCompletionDr().current + '/' + store.getTotalDr().current
})

const displayAEvolution = computed(() => {
    var currentState = store.getCompletionA().current * 100 / store.getTotalA().current
    var oldState = store.getCompletionA().old * 100 / store.getTotalA().old
    var evolution = parseFloat((currentState - oldState).toFixed(1))
    return currentState.toFixed(1) + "%" + (evolution > 0 ? " (+" + evolution + "%)" : "")
})

const displayCEvolution = computed(() => {
    var currentState = store.getCompletionC().current * 100 / store.getTotalC().current
    var oldState = store.getCompletionC().old * 100 / store.getTotalC().old
    var evolution = parseFloat((currentState - oldState).toFixed(1))
    return currentState.toFixed(1) + "%" + (evolution > 0 ? " (+" + evolution + "%)" : "")
})

const displayDEvolution = computed(() => {
    var currentState = store.getCompletionD().current * 100 / store.getTotalD().current
    var oldState = store.getCompletionD().old * 100 / store.getTotalD().old
    var evolution = parseFloat((currentState - oldState).toFixed(1))
    return currentState.toFixed(1) + "%" + (evolution > 0 ? " (+" + evolution + "%)" : "")
})

const displayDrEvolution = computed(() => {
    var currentState = store.getCompletionDr().current * 100 / store.getTotalDr().current
    var oldState = store.getCompletionDr().old * 100 / store.getTotalDr().old
    var evolution = parseFloat((currentState - oldState).toFixed(1))
    return currentState.toFixed(1) + "%" + (evolution > 0 ? " (+" + evolution + "%)" : "")
})
</script>

<template>
    <div id="ui" class="pointer-events-none">
        <InformationDrawerComponent :is-drawer-open="props.isDrawerOpen" @close-drawer="closeDrawer" />
        <TopFloatingComponent :is-drawer-open="props.isDrawerOpen">
            <h1 class="w-screen text-center mt-4">Suivi d'avancement DEM et RCD UP2-400</h1>
        </TopFloatingComponent>
        <RightFloatingComponent :is-drawer-open="props.isDrawerOpen">
            <DataCardComponent :title="'Caractérisation'" :value="displayCValue" :evolution="displayCEvolution" />
            <DataCardComponent :title="'Assainissement'" :value="displayAValue" :evolution="displayAEvolution" />
            <DataCardComponent :title="'Démantèlement'" :value="displayDValue" :evolution="displayDEvolution" />
            <DataCardComponent :title="'Déclassement radiologique'" :value="displayDrValue"
                :evolution="displayDrEvolution" />
        </RightFloatingComponent>
        <div id="switch-perspective" class="absolute bottom-0 right-0 mb-21 mr-2 bg-white pointer-events-auto cursor-pointer p-2 shadow-md rounded-xl border border-zinc-300 text-sm font-semibold">
            2D
        </div>
        <div @click="resetCoords" id="reset-coords" class="absolute bottom-0 right-0 mb-10 mr-2 bg-white pointer-events-auto cursor-pointer p-2 shadow-md rounded-xl border border-zinc-300 text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        </div>
        <BottomFloatingComponent :is-drawer-open="props.isDrawerOpen">
            <div class="w-screen grid place-content-center">
                <img class="w-40 mb-4" src="/src/assets/logo.jpeg" alt="">
            </div>
        </BottomFloatingComponent>
    </div>
</template>