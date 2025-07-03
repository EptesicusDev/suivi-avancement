<script setup>
import InformationDrawerComponent from "./InformationDrawerComponent.vue"
import BottomFloatingComponent from "./BottomFloatingComponent.vue"
import TopFloatingComponent from "./TopFloatingComponent.vue"
import DataCardComponent from "./DataCardComponent.vue"
import { useWorkshopStore } from "@/stores/workshops"
import { computed, ref, useTemplateRef } from "vue"
import RightFloatingComponent from "./RightFloatingComponent.vue"
import ButtonComponent from "./ButtonComponent.vue"

const store = useWorkshopStore()
const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(["closeDrawer", "resetCoords"])
const isEditing = ref(false)

const toggleEditing = () => {
    isEditing.value = !isEditing.value
}

const closeDrawer = () => {
    emit("closeDrawer")
}

const resetCoords = () => {
    emit("resetCoords")
}


const displayCValue = computed(() => {
    return store.getCompletionIndicator(1).current + '/' + store.getTotalIndicator(1).current
})

const displayAValue = computed(() => {
    return store.getCompletionIndicator(2).current + '/' + store.getTotalIndicator(2).current
})

const displayDValue = computed(() => {
    return store.getCompletionIndicator(3).current + '/' + store.getTotalIndicator(3).current
})

const displayDrValue = computed(() => {
    return store.getCompletionIndicator(4).current + '/' + store.getTotalIndicator(4).current
})

const displayCEvolution = computed(() => {
    var currentState = store.getCompletionIndicator(1).current * 100 / store.getTotalIndicator(1).current
    var oldState = store.getCompletionIndicator(1).old * 100 / store.getTotalIndicator(1).old
    var evolution = parseFloat((currentState - oldState).toFixed(1))
    return currentState.toFixed(1) + "%" + (evolution > 0 ? " (+" + evolution + "%)" : "")
})

const displayAEvolution = computed(() => {
    var currentState = store.getCompletionIndicator(2).current * 100 / store.getTotalIndicator(2).current
    var oldState = store.getCompletionIndicator(2).old * 100 / store.getTotalIndicator(2).old
    var evolution = parseFloat((currentState - oldState).toFixed(1))
    return currentState.toFixed(1) + "%" + (evolution > 0 ? " (+" + evolution + "%)" : "")
})

const displayDEvolution = computed(() => {
    var currentState = store.getCompletionIndicator(3).current * 100 / store.getTotalIndicator(3).current
    var oldState = store.getCompletionIndicator(3).old * 100 / store.getTotalIndicator(3).old
    var evolution = parseFloat((currentState - oldState).toFixed(1))
    return currentState.toFixed(1) + "%" + (evolution > 0 ? " (+" + evolution + "%)" : "")
})

const displayDrEvolution = computed(() => {
    var currentState = store.getCompletionIndicator(4).current * 100 / store.getTotalIndicator(4).current
    var oldState = store.getCompletionIndicator(4).old * 100 / store.getTotalIndicator(4).old
    var evolution = parseFloat((currentState - oldState).toFixed(1))
    return currentState.toFixed(1) + "%" + (evolution > 0 ? " (+" + evolution + "%)" : "")
})

const copyMapResults = () => {
    var result = ""
    for(var child of document.getElementById("map-edit-result").children) {
        result += child.innerText + "\n"
    }
    console.log(result)
    navigator.clipboard.writeText(result)
}

const clearMapResults = () => {
    document.getElementById("map-edit-result").innerHTML = ""
}
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
        <div id="switch-perspective" class="absolute bottom-0 right-0 mb-31.75 mr-2 bg-white pointer-events-auto cursor-pointer p-2 shadow-md rounded-xl border border-zinc-300 text-sm font-semibold">
            2D
        </div>
        <div @click="resetCoords" id="reset-coords"  class="absolute bottom-0 right-0 mb-20.75 mr-2 bg-white pointer-events-auto cursor-pointer p-2 shadow-md rounded-xl border border-zinc-300 text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        </div>
        <div v-if="isEditing" class="cursor-default text-zinc-700 absolute bottom-0 right-0 mb-10 mr-13 bg-white pointer-events-auto p-2 shadow-md rounded-xl rounded-br-none border border-zinc-300 text-sm font-semibold">
            <h3 class="text-black">Obtenez les coordonnées en cliquant sur la carte</h3>
            <p class="text-xs mb-1">[longitude, latitude]</p>
            <div id="map-edit-result">
                <p>oe</p>
                <p>oe</p>
            </div>
            <div class="flex space-x-1 mt-2">
                <ButtonComponent @click="copyMapResults">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                    </svg>
                </ButtonComponent>
                <ButtonComponent @click="clearMapResults">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </ButtonComponent>
            </div>
        </div>
        <div @click="toggleEditing" id="map-edit" class="absolute bottom-0 right-0 mb-10 mr-2 bg-white pointer-events-auto cursor-pointer p-2 border border-zinc-300 text-sm font-semibold" :class=" isEditing ? 'text-blue-700 rounded-r-xl border-l-0 pl-4 shadow-[1px_4px_6px_-3px] shadow-[#00000053]' : 'rounded-xl shadow-md'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
        </div>
        <BottomFloatingComponent :is-drawer-open="props.isDrawerOpen">
            <div class="w-screen grid place-content-center">
                <img class="w-40 mb-4" src="/src/assets/logo.jpeg" alt="">
            </div>
        </BottomFloatingComponent>
    </div>
</template>