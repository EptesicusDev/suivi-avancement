<script setup>
import CloseButtonComponent from './CloseButtonComponent.vue'
import BarGraphComponent from './BarGraphComponent.vue'
import SelectComponent from './SelectComponent.vue'
import { useWorkshopStore } from '@/stores/workshops'
import { computed, ref } from 'vue'
import RowComponent from './RowComponent.vue'
import GroupedStackedBarGraphComponent from './GroupedStackedBarGraphComponent.vue'

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

const indicator1Name = computed(() => {
    return store.currentWorkshop.project == "DEM" ? "Caractérisation" : (store.currentWorkshop.totIndicator1 != "" ? store.currentWorkshop.totIndicator1 : "")
})

const indicator2Name = computed(() => {
    return store.currentWorkshop.project == "DEM" ? "Assainissement" : (store.currentWorkshop.totIndicator2 != "" ? store.currentWorkshop.totIndicator2 : "")
})

const indicator3Name = computed(() => {
    return store.currentWorkshop.project == "DEM" ? "Démantèlement" : (store.currentWorkshop.totIndicator3 != "" ? store.currentWorkshop.totIndicator3 : "")
})

const indicator4Name = computed(() => {
    return store.currentWorkshop.project == "DEM" ? "Déclassement radio." : (store.currentWorkshop.totIndicator4 != "" ? store.currentWorkshop.totIndicator4 : "")
})

const indicator5Name = computed(() => {
    return store.currentWorkshop.project == "DEM" ? "" : (store.currentWorkshop.totIndicator5 != "" ? store.currentWorkshop.totIndicator5 : "")
})
</script>

<template>
    <Transition>
        <div v-if="props.isDrawerOpen"
            class="drawer absolute top-0 left-0 h-screen bg-white w-1/4 shadow-md pointer-events-auto border-r border-r-zinc-300 overflow-y-scroll resize-x">
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
                            <RowComponent v-if="indicator1Name != ''" :title="indicator1Name" :indicator-idx="1" />
                            <RowComponent v-if="indicator2Name != ''" :title="indicator2Name" :indicator-idx="2" />
                            <RowComponent v-if="indicator3Name != ''" :title="indicator3Name" :indicator-idx="3" />
                            <RowComponent v-if="indicator4Name != ''" :title="indicator4Name" :indicator-idx="4" />
                            <RowComponent v-if="indicator5Name != ''" :title="indicator5Name" :indicator-idx="5" />
                        </dl>
                    </div>
                </div>
            </div>
            <div class="px-3">
                <BarGraphComponent v-if="store.currentWorkshop.project == 'DEM'" />
                <GroupedStackedBarGraphComponent v-else />
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