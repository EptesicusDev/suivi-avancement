<script setup>
import { useWorkshopStore } from '@/stores/workshopStore'
import EvolutionIndicatorComponent from './EvolutionIndicatorComponent.vue'
import IndicatorDefinitionComponent from './IndicatorDefinitionComponent.vue'
import { computed } from 'vue'

const store = useWorkshopStore()
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    evolution: {
        type: String,
        required: true
    },
})
const agregation = computed(() => {
    return store.currentWorkshop != null ? (store.getAgregationMode() ? store.currentWorkshop.sector : "INB " + store.currentWorkshop.inb) : ""
})

const currentWorkshop = computed({
    get() { return store.currentWorkshop != null ? store.currentWorkshop : { color: "" } },
})
</script>

<template>
    <div class="data-card bg-white p-4 shadow-md rounded-xl border border-zinc-300 w-80">
        <span v-if="currentWorkshop.color == 'red'" class="absolute right-6 ml-2 inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-600/10 ring-inset">{{ agregation }}</span>
        <span v-if="currentWorkshop.color == 'green'" class="absolute right-6 ml-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">{{ agregation }}</span>
        <span v-if="currentWorkshop.color == 'blue'" class="absolute right-6 ml-2 inline-flex items-center rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-700/10 ring-inset">{{ agregation }}</span>
        <span v-if="currentWorkshop.color == 'orange'" class="absolute right-6 ml-2 inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-600/20 ring-inset">{{ agregation }}</span>
        <span v-if="currentWorkshop.color == 'orange'" class="absolute right-6 ml-2 inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-600/20 ring-inset">{{ agregation }}</span>
        <div class="flex w-full">
            <h3>{{ props.title }}</h3>
            <IndicatorDefinitionComponent :title="props.title" />
        </div>
        <h2 @click="truc" class="pointer-events-auto">{{ props.value }}</h2>
        <div class="flex items-center">
            <p class="grow text-xs">Avancement</p>
            <div class="flex">
                <span class="text-xs text-blue-600">{{ props.evolution }}</span>
                <EvolutionIndicatorComponent :has-changed="props.evolution.includes('+')" />
            </div>
        </div>
    </div>
</template>