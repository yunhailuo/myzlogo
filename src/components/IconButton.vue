<script setup>
import { ref } from "vue";

const props = defineProps({
    icon: [String, Object],
    tooltip: { type: String, required: false },
});

const showTooltip = ref(false);

defineEmits(["clicked"]);
</script>

<template>
    <div class="iconbutton">
        <button
            class="iconbutton__button"
            @click="$emit('clicked')"
            @mouseover="showTooltip = true"
            @mouseleave="showTooltip = false"
        >
            <span class="iconbutton__overlay"></span>
            <component :is="icon" />
        </button>
        <span v-if="tooltip && showTooltip" class="iconbutton__tooltip">{{
            tooltip
        }}</span>
    </div>
</template>

<style scoped>
.iconbutton {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
    padding: 5px;
    aspect-ratio: 1 / 1;
    position: sticky;
}

.iconbutton__button {
    background: none;
    border: none;
    outline: none;
    padding: 0;
}

.iconbutton__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
}

:hover > .iconbutton__overlay {
    opacity: 0.2;
}

.iconbutton__tooltip {
    position: absolute;
    top: 2.5px;
    left: calc(100% + 4px);
    border-radius: 4px;
    padding: 5px 16px;
    line-height: 1.6;
    display: inline-block;
    background-color: rgb(63 63 63);
    white-space: nowrap;
}
</style>
