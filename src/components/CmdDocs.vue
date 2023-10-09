<script setup>
import { ref } from 'vue'

const isOpened = ref(false)
</script>

<template>
    <div class="sidebar" :class="isOpened ? 'open' : ''">
        <div @click="isOpened = !isOpened">&lt; &gt;</div>
    </div>
</template>

<style scoped>
.sidebar {
    display: block;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    min-height: min-content;
    min-width: 3em;
    z-index: 99;
    transition: all 0.5s ease;
    position: sticky;
}

.sidebar.open {
    height: 100%;
    min-width: 12em;
}
</style>