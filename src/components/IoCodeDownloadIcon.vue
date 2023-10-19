<script setup>
const props = defineProps({
    stroke: { type: String, default: "currentColor" },
    strokeWidth: { type: String, default: "42px" },
});
</script>

<template>
    <button class="iconbutton" @click="$emit('clicked')">
        <!-- Adopted from https://github.com/ionic-team/ionicons/blob/main/src/svg/code-download.svg -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 512 512"
        >
            <polyline
                points="160 368 32 256 160 144"
                class="iconbutton__line"
            />
            <polyline
                points="352 368 480 256 352 144"
                class="iconbutton__line"
            />
            <polyline
                points="192 288.1 256 352 320 288.1"
                class="iconbutton__line"
            />
            <line
                x1="256"
                y1="160"
                x2="256"
                y2="336.03"
                class="iconbutton__line"
            />
        </svg>
    </button>
</template>

<style scoped>
.iconbutton {
    background: none;
    border: none;
    outline: none;
    padding: 0;
}

.iconbutton:active {
    padding: 0;
    border: none;
    background: none;
}

.iconbutton__line {
    fill: "none";
    stroke: v-bind(stroke);
    stroke-linecap: "round";
    stroke-linejoin: "round";
    stroke-width: v-bind(strokeWidth);
}
</style>
