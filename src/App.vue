<script setup>
import CmdDocs from "./components/CmdDocs.vue";
import WorkSpace from "./components/WorkSpace.vue";
</script>

<template>
  <div class="container">
    <CmdDocs />
    <WorkSpace />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: normal;
  align-items: normal;
  align-content: normal;
  width: 100%;
}
</style>
