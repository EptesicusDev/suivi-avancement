<script setup>
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import CloseButtonComponent from './CloseButtonComponent.vue';
import { useTemplateRef } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
})
const isModalOpen = ref(false)
const target = useTemplateRef("target")
const bodies = {
    c: "Cet indicateur relète l'avancement de la caractérisation des salles et cellules nécessitant une consolidation de l'état physique et radiologique des équipement constiutant le coeur du procédé qu'elles abritent, afin d'établir les données de régérence pour les scénarios d'assainissement et de démantèlement.",
    a: "Cet inidicateur reflète l'avancement des activités de rinçage, de chasse matière, de reprise des écarts d'états initiaux et d'assainissement des équipements (cuves, boîtes à gants, fosses, etc.), en amont des opérations de démentèlement.",
    d: "Cet indicateur reflète l'avancement des activité de dépose et de démantèlement des équipement constituant le coeur du procédé.",
    dr: "Cet indicateur relète la progression du déclasssement radiologique des cellules zone rouge et orange afin de permettre un accès sans contrainte (protection respiratoire, ...)."
}

const body = computed(() => {
    switch(props.title) {
        case "Caractérisation":
            return bodies["c"]
        case "Assainissement":
            return bodies["a"]
        case "Démantèlement":
            return bodies["d"]
        default:
            return bodies["dr"]
    }
})

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

onClickOutside(target, () => {
    isModalOpen.value = false
})
</script>

<template>
    <button @click="openModal()" class="ml-1 pointer-events-auto cursor-pointer text-zinc-400 hover:text-zinc-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
    </button>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isModalOpen" class="absolute opacity-100 top-0 left-0 w-screen h-screen bg-zinc-950/40">
            </div>
        </Transition>
        <Transition name="pop">
            <div v-if="isModalOpen" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/4 p-4 pt-2 shadow-md rounded-xl border border-zinc-300 overflow-hidden" ref="target">
                <CloseButtonComponent @action="closeModal()"/>
                <h2 class="">{{ props.title }}</h2>
                <p class="text-xs mb-2">Définition</p>
                <p class="text-zinc-700">{{ body }}</p>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
    transition: all 0.3s ease;
}

.pop-enter-from,
.pop-leave-to {
    scale: 0.1%;
}
</style>