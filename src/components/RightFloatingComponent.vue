<script setup>
const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <Transition>
        <div class="absolute top-0 right-0 flex flex-col gap-2 p-2">
            <slot></slot>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: right 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    right: -20vw;
}
</style>