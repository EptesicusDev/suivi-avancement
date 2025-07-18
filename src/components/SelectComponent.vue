<script setup>
import { ref } from 'vue'
import { useWorkshopStore } from '@/stores/workshopStore'
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import PrintButtonComponent from './PrintButtonComponent.vue'

const props = defineProps({
    options: {
        type: Array,
        required: true
    }
})
const emit = defineEmits(["print"])
const isDropdownOpen = ref(false)
const store = useWorkshopStore()
const target = useTemplateRef("target")

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

const select = (option) => {
    store.changeZoneMountedWorkshop(option)
    isDropdownOpen.value = false
}

const formatZone = (zone) => {
    return (zone.length > 1 ? "" : "Zone ") + zone
}

const print = () => {
    emit("print")
}

onClickOutside(target, () => {
    isDropdownOpen.value = false
})
</script>

<template>
    <div class="relative inline-block text-left">
        <div class="flex h-10">
            <PrintButtonComponent @print="print"/>
            <button v-show="props.options.length > 1" type="button" @click="toggleDropdown()"
                class="zone-selector ml-1 cursor-pointer inline-flex w-max justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm border border-zinc-300 ring-inset hover:bg-gray-50"
                id="menu-button" aria-expanded="true" aria-haspopup="true">
                {{ formatZone(store.currentWorkshop.zone) }}
                <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                    data-slot="icon">
                    <path fill-rule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>
        <div v-if="isDropdownOpen" ref="target"
            class="absolute right-0 z-10 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
                <a v-for="option in props.options" @click="select(option)" href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1">{{ formatZone(option) }}</a>
            </div>
        </div>
    </div>
</template>