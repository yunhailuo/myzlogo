<script setup>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { Turtle } from '../lib/turtle'

const workspace = ref(null)
const resizeObserver = ref(null)

const logoCanvas = ref(null)
const canvasWidth = ref(1200)
const canvasHeight = computed(() => 3 * canvasWidth.value / 4)
const canvasCtx = ref(null)

const logoCmd = ref('')
const cmdWidth = ref(600)

const turtle = new Turtle()

function draw(e) {
    if (turtle.penDown) {
        turtle.drawSingleLineTo(e.offsetX, e.offsetY)
    }
    turtle.x = e.offsetX
    turtle.y = e.offsetY
}

function penDown(e) {
    turtle.x = e.offsetX
    turtle.y = e.offsetY
    turtle.penDown = true
    turtle.showTurtle()
}

function penUp(e) {
    turtle.penDown = false
}

function processAllCmds() {
    turtle.resetTurtle()
    turtle.processOneLineCmd("clear")
    logoCmd.value.split("\n").forEach((cmd) => turtle.processOneLineCmd(cmd))
    turtle.showTurtle()
}

onMounted(() => {
    resizeObserver.value = new ResizeObserver(() => {
        canvasWidth.value = Math.min(workspace.value.offsetWidth, 1200)
        if (canvasWidth.value + cmdWidth.value > workspace.value.offsetWidth) {
            cmdWidth.value = canvasWidth.value
        }
        else {
            cmdWidth.value = 600
        }
        turtle.resetTurtle()
    })
    resizeObserver.value.observe(workspace.value)
    canvasCtx.value = logoCanvas.value.getContext('2d')
    turtle.canvasCtx = canvasCtx.value
    turtle.resetTurtle()
    logoCmd.value = "bk 90\nrt 90\nfd 90\nlt 90\nfd 90\npu\nfd 90\npd\nfd 90\nfd 90\nbk 30\npe\nbk 60\npd\nbk 30"
})

onBeforeUnmount(() => {
    resizeObserver.value.unobserve(workspace.value)
})
</script>

<template>
    <div ref="workspace"
         class="workspace">
        <canvas ref="logoCanvas"
                class="canvas"
                :height="canvasHeight"
                :width="canvasWidth">
        </canvas>
        <textarea v-model="logoCmd"
                  class="commands"
                  :style="{ 'width': cmdWidth + 'px' }"
                  spellcheck="false"
                  @keyup.enter="processAllCmds">
        </textarea>
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