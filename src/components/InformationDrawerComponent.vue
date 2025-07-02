<script setup>
import EvolutionIndicatorComponent from './EvolutionIndicatorComponent.vue'
import CloseButtonComponent from './CloseButtonComponent.vue'
import BarGraphComponent from './BarGraphComponent.vue'
import SelectComponent from './SelectComponent.vue'
import { useWorkshopStore } from '@/stores/workshops'
import { computed, ref } from 'vue'
import IndicatorDefinitionComponent from './IndicatorDefinitionComponent.vue'

const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    }
})
const store = useWorkshopStore()
const printDate = ref("blank")
const showThumbnail = ref("")
const emit = defineEmits(["closeDrawer"])

const onCloseButtonClicked = () => {
    store.dismountWorkshop()
    emit("closeDrawer")
}

const updatePrintDate = () => {
    var date = new Date()
    printDate.value = date.toLocaleDateString("fr")
    if(store.currentWorkshop.image == "no")
        showThumbnail.value = "no-image"
    else
        showThumbnail.value = ""
    setTimeout(function() {
        print()
    }, 50)
}

const percentageC = computed(() => {
    var evolution = Math.round(store.currentWorkshop.indicator1 * 100 / store.currentWorkshop.totIndicator1 - store.currentOldWorkshop.indicator1 * 100 / store.currentOldWorkshop.totIndicator1)
    return Math.round(store.currentWorkshop.indicator1 * 100 / store.currentWorkshop.totIndicator1) + "%" + (evolution > 0 ? " (" + (evolution > 0 ? "+" : "") + evolution + "%)" : "")
})

const percentageA = computed(() => {
    var evolution = Math.round(store.currentWorkshop.indicator2 * 100 / store.currentWorkshop.totIndicator2 - store.currentOldWorkshop.indicator2 * 100 / store.currentOldWorkshop.totIndicator2)
    return Math.round(store.currentWorkshop.indicator2 * 100 / store.currentWorkshop.totIndicator2) + "%" + (evolution > 0 ? " (" + (evolution > 0 ? "+" : "") + evolution + "%)" : "")
})

const percentageD = computed(() => {
    var evolution = Math.round(store.currentWorkshop.indicator3 * 100 / store.currentWorkshop.totIndicator3 - store.currentOldWorkshop.indicator3 * 100 / store.currentOldWorkshop.totIndicator3)
    return Math.round(store.currentWorkshop.indicator3 * 100 / store.currentWorkshop.totIndicator3) + "%" + (evolution > 0 ? " (" + (evolution > 0 ? "+" : "") + evolution + "%)" : "")
})

const percentageDr = computed(() => {
    var evolution = Math.round(store.currentWorkshop.indicator4 * 100 / store.currentWorkshop.totIndicator4 - store.currentOldWorkshop.indicator4 * 100 / store.currentOldWorkshop.totIndicator4)
    return Math.round(store.currentWorkshop.indicator4 * 100 / store.currentWorkshop.totIndicator4) + "%" + (evolution > 0 ? " (" + (evolution > 0 ? "+" : "") + evolution + "%)" : "")
})
</script>

<template>
    <Transition>
        <div v-if="props.isDrawerOpen"
            class="drawer absolute top-0 left-0 h-screen bg-white w-1/4 shadow-md pointer-events-auto border-r border-r-zinc-300 overflow-y-scroll">
            <img :src="'/src/assets/images/' + store.currentWorkshop.image + '.jpg'" class="w-full drawer-thumbnail" :class="showThumbnail"
                :alt="store.currentWorkshop.image">
            <div class="px-8 pt-4 w-full">
                <CloseButtonComponent @action="onCloseButtonClicked" />
                <div class="flex">
                    <h1 class="heading grow">{{ store.currentWorkshop.workshop }}</h1>
                    <SelectComponent :options="store.zoneOptions" @print="updatePrintDate" />
                </div>
                <div class="my-6">
                    <h1>INB {{ store.currentWorkshop.inb }}, {{ store.currentWorkshop.project }}</h1>
                    <p class="text-sm mb-4">Fin de DEM en {{ store.currentWorkshop.end }}</p>
                </div>
                <div class="my-6">
                    <h1>Évolution sur la période</h1>
                    <p class="text-xs mb-4">Mise à jour le {{ store.currentWorkshop.updateDate }}</p>
                    <span class="text-sm text-zinc-700">{{ store.currentWorkshop.updateContent }}</span>
                </div>
                <div class="my-6">
                    <h1>Avancement</h1>
                    <div class="border-t border-gray-100">
                        <dl class="divide-y divide-gray-100">
                            <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt class="flex items-center text-sm/6 sm:col-span-2 font-semibold">
                                    Caractérisation
                                    <IndicatorDefinitionComponent :title="'Caractérisation'"/>
                                </dt>
                                <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                    <h6 class="grow">{{ store.currentWorkshop.indicator1 }}/{{ store.currentWorkshop.totIndicator1 }}</h6>
                                    <div class="flex justify-end">
                                        <span class="text-xs text-blue-600">{{ percentageC }}</span>
                                        <EvolutionIndicatorComponent
                                            :has-changed="store.currentWorkshop.indicator1 > store.currentOldWorkshop.indicator1"
                                            :is-better="store.currentWorkshop.indicator1 > store.currentOldWorkshop.indicator1" />
                                    </div>
                                </dd>
                            </div>
                            <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt class="flex items-center text-sm/6 sm:col-span-2 font-semibold">
                                    Assainissement
                                    <IndicatorDefinitionComponent :title="'Assainissement'"/>
                                </dt>
                                <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                    <h6 class="grow">{{ store.currentWorkshop.indicator2 }}/{{ store.currentWorkshop.totIndicator2 }}</h6>
                                    <div class="flex justify-end">
                                        <span class="text-xs text-blue-600">{{ percentageA }}</span>
                                        <EvolutionIndicatorComponent
                                            :has-changed="store.currentWorkshop.indicator2 > store.currentOldWorkshop.indicator2"
                                            :is-better="store.currentWorkshop.indicator2 > store.currentOldWorkshop.indicator2" />
                                    </div>
                                </dd>
                            </div>
                            <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt class="flex items-center text-sm/6 sm:col-span-2 font-semibold">
                                    Démantèlement
                                    <IndicatorDefinitionComponent :title="'Démantèlement'"/>
                                </dt>
                                <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                    <h6 class="grow">{{ store.currentWorkshop.indicator3 }}/{{ store.currentWorkshop.totIndicator3 }}</h6>
                                    <div class="flex">
                                        <span class="text-xs text-blue-600">{{ percentageD }}</span>
                                        <EvolutionIndicatorComponent
                                            :has-changed="store.currentWorkshop.indicator3 > store.currentOldWorkshop.indicator3"
                                            :is-better="store.currentWorkshop.indicator3 > store.currentOldWorkshop.indicator3" />
                                    </div>
                                </dd>
                            </div>
                            <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt class="flex items-center text-sm/6 sm:col-span-2 font-semibold">
                                    Déclassement radio.
                                    <IndicatorDefinitionComponent :title="'Déclassement radio'"/>
                                    </dt>
                                <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                    <h6 class="grow">{{ store.currentWorkshop.indicator4 }}/{{ store.currentWorkshop.totIndicator4 }}</h6>
                                    <div class="flex justify-end">
                                        <span class="text-xs text-blue-600">{{ percentageDr }}</span>
                                        <EvolutionIndicatorComponent
                                            :has-changed="store.currentWorkshop.indicator4 > store.currentOldWorkshop.indicator4"
                                            :is-better="store.currentWorkshop.indicator4 > store.currentOldWorkshop.indicator4" />
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="px-3">
                <BarGraphComponent v-if="store.currentWorkshop.project == 'DEM'" />
            </div>
            <div class="hidden print absolute bottom-1 w-full text-center bot">
                <p>{{ printDate }}</p>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: left 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    left: -25vw;
}
</style>