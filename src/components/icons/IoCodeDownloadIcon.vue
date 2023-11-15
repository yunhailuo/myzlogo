<script setup>
const props = defineProps({
    size: { type: String, default: "2em" },
});
</script>

<template>
    <!-- Adopted from https://github.com/ionic-team/ionicons/blob/main/src/svg/code-download.svg -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size"
        :height="size"
        viewBox="0 0 512 512"
    >
        <polyline points="160 368 32 256 160 144" class="icon__line" />
        <polyline points="352 368 480 256 352 144" class="icon__line" />
        <polyline points="192 288.1 256 352 320 288.1" class="icon__line" />
        <line x1="256" y1="160" x2="256" y2="336.03" class="icon__line" />
    </svg>
</template>

<style scoped>
.icon__line {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 42px;
}
</style>
