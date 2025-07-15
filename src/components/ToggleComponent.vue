<script setup>
import { ref, watch } from "vue"

const props = defineProps(["labelBefore", "labelAfter"])
const emit = defineEmits(["valueChange"])
const value = ref(false)

const toggle = () => {
    emit("valueChange")
}
</script>

<template>
    <label for="toggle" class="text-sm cursor-pointer flex items-center">
        <p :class="value ? '' : 'text-zinc-800!'">{{ props.labelBefore }}</p>
        <input @click="toggle" type="checkbox" v-model="value" id="toggle" class="appearance-none">
        <div class="h-4 w-auto relative flex items-center mx-2 px-1">
            <span class="block w-6 h-2 rounded-full border border-zinc-400"></span>
            <span :class="value ? 'right-0' : 'left-0'" class="absolute top-0 block bg-white h-4 w-4 rounded-full border border-zinc-400"></span>
        </div>
        <p :class="value ? 'text-zinc-800!' : ''">{{ props.labelAfter }}</p>
    </label>
</template>