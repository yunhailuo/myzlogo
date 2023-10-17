<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { Turtle } from "../lib/turtle";
import parse from "../lib/parser/parse";

const workspace = ref(null);
const resizeObserver = ref(null);

const logoCanvas = ref(null);
const canvasWidth = ref(1200);
const canvasHeight = computed(() => 3 * canvasWidth.value / 4);
const canvasCtx = ref(null);

const logoCmd = ref("");
const cmdWidth = ref(600);

const turtle = new Turtle();

function processAllCmds() {
    turtle.clean();
    turtle.resetTurtle();
    parse(logoCmd.value, turtle);
    turtle.drawTurtle();
}

onMounted(() => {
    resizeObserver.value = new ResizeObserver(() => {
        canvasWidth.value = Math.min(workspace.value.offsetWidth, 1200);
        if (canvasWidth.value + cmdWidth.value > workspace.value.offsetWidth) {
            cmdWidth.value = canvasWidth.value;
        }
        else {
            cmdWidth.value = 600;
        }
        turtle.resetTurtle();
        turtle.drawTurtle();
    });
    resizeObserver.value.observe(workspace.value);
    canvasCtx.value = logoCanvas.value.getContext("2d");
    turtle.canvasCtx = canvasCtx.value;
    turtle.resetTurtle();
    turtle.drawTurtle();
    logoCmd.value = "bk 45+45\nrt 100 - 10\nfd 9*\t10\nlt 180  /2\nfd 90\n\npu\nfd 90\npd\n\nfd 90 fd 90 bk 30\n\npe\nbk 60\nppt\n\nbk 30";
});

onBeforeUnmount(() => {
    resizeObserver.value.unobserve(workspace.value);
});
</script>

<template>
  <div
    ref="workspace"
    class="workspace"
  >
    <canvas
      ref="logoCanvas"
      class="canvas"
      :height="canvasHeight"
      :width="canvasWidth"
    />
    <textarea
      v-model="logoCmd"
      class="commands"
      :style="{ 'width': cmdWidth + 'px' }"
      spellcheck="false"
      @keyup.enter="processAllCmds"
    />
  </div>
</template>

<style scoped>
.workspace {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: normal;
    align-items: normal;
    align-content: normal;
    width: 100%;
    overflow-y: auto;
}

.canvas {
    display: block;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    background: white;
}

.commands {
    display: block;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    min-height: 300px;
    box-sizing: border-box;
    font-size: 2em;
    resize: none;
    padding: 5px;
}
</style>