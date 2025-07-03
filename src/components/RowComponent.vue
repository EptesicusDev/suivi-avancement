<script setup>
import EvolutionIndicatorComponent from './EvolutionIndicatorComponent.vue'
import { useWorkshopStore } from '@/stores/workshops'
import { computed } from 'vue'
import IndicatorDefinitionComponent from './IndicatorDefinitionComponent.vue'

const store = useWorkshopStore()
const props = defineProps({
    "title": {
        type: String,
        required: true
    },
    "indicatorIdx": {
        type: Number,
        required: true
    },
})

const percentageIndiactor = computed(() => {
    var indicator = eval("store.currentWorkshop.indicator" + props.indicatorIdx)
    var indicatorOld = eval("store.currentOldWorkshop.indicator" + props.indicatorIdx)
    var totIndicator = eval("store.currentWorkshop.totIndicator" + props.indicatorIdx)
    var totIndicatorOld = eval("store.currentOldWorkshop.totIndicator" + props.indicatorIdx)
    if(store.currentWorkshop.project == "DEM") {
        var evolution = Math.round(indicator * 100 / totIndicator - indicatorOld * 100 / totIndicatorOld)
        return Math.round(indicator * 100 / totIndicator) + "%" + (evolution > 0 ? " (" + (evolution > 0 ? "+" : "") + evolution + "%)" : "")
    }
    else {
        var evolution = indicator - indicatorOld
        return evolution > 0 ? evolution + "%" : ""
    }
})

const evolution = computed(() => {
    return eval("store.currentWorkshop.indicator" + props.indicatorIdx) > eval("store.currentOldWorkshop.indicator" + props.indicatorIdx)
})

const baseValue = computed(() => {
    return eval("store.currentWorkshop.indicator" + props.indicatorIdx)
})

const totalValue = computed(() => {
    return eval("store.currentWorkshop.totIndicator" + props.indicatorIdx)
})
</script>

<template>
    <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
        <dt class="flex items-center text-sm/6 sm:col-span-2 font-semibold">
            {{ props.title }}
            <IndicatorDefinitionComponent :title="props.title"/>
            </dt>
        <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
            <h6 class="grow">{{ baseValue + (store.currentWorkshop.project == "DEM" ? "/" + totalValue : "%") }}</h6>
            <div class="flex justify-end">
                <span class="text-xs text-blue-600">{{ percentageIndiactor }}</span>
                <EvolutionIndicatorComponent :has-changed="evolution" />
            </div>
        </dd>
    </div>
</template>