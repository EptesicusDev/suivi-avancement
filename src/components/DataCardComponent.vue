<script setup>
import { useWorkshopStore } from '@/stores/workshops';
import EvolutionIndicatorComponent from './EvolutionIndicatorComponent.vue'
import { computed } from 'vue';

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

const inb = computed(() => {
    return store.currentWorkshop != null ? "INB " + store.currentWorkshop.inb : ""
})
</script>

<template>
    <div class="bg-white m-2 p-4 shadow-md rounded-xl border border-zinc-300 w-73">
        <span v-if="inb != ''" class=" absolute right-6 ml-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">{{ inb }}</span>
        <div class="smooth-redim flex w-full">
            <h3 class="grow">{{ props.title }}</h3>
        </div>
        <h2>{{ props.value }}</h2>
        <div class="flex items-center">
            <p class="grow text-xs">Avancement</p>
            <div class="flex">
                <span class="text-xs text-blue-600">{{ props.evolution }}</span>
                <EvolutionIndicatorComponent :has-changed="props.evolution.includes('+')" />
            </div>
        </div>
    </div>
</template>