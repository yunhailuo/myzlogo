<script setup>
import TitleBar from "./components/TitleBar.vue";
import WorkSpace from "./components/WorkSpace.vue";
</script>

<template>
    <div class="app">
        <TitleBar />
        <WorkSpace />
    </div>
</template>

<style scoped>
.app {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 0px;
    width: 100%;
}
</style>
