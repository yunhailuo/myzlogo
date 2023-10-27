<script setup>
import { onMounted, ref } from "vue";
import { Turtle } from "../lib/turtle";
import { LogoPrimitiveProcedures } from "../lib/parser/logo-primitive-procedures";
import parse from "../lib/parser/parse";
import IconButton from "./IconButton.vue";
import IoDownloadIcon from "./IoDownloadIcon.vue";
import IoCodeDownloadIcon from "./IoCodeDownloadIcon.vue";

const workspace = ref(null);
const logoCanvas = ref(null);
const logoCmd = ref("");
const consoleLog = ref("");

const buildinConsoleError = console.error;
function wrappedConsoleError() {
    buildinConsoleError(...arguments);
    consoleLog.value += `\n${[...arguments].join(" ")}`;
}
console.error = wrappedConsoleError;

const buildinConsoleLog = console.log;
function wrappedConsoleLog() {
    buildinConsoleLog(...arguments);
    consoleLog.value += `\n${[...arguments].join(" ")}`;
}
console.log = wrappedConsoleLog;

const turtle = new Turtle();
const logoPrimProc = new LogoPrimitiveProcedures(turtle);

function processAllCmds() {
    turtle.clean();
    turtle.resetTurtle();
    const logoJs = parse(logoCmd.value);
    console.log(logoJs.join("\n"));
    Function("logo", `"use strict";${logoJs.join("\n")}`)(logoPrimProc);
    turtle.drawTurtle();
}

function downloadGraph() {
    const downloadLink = document.createElement("a");
    downloadLink.download = "logo_turtle.png";
    downloadLink.href = logoCanvas.value.toDataURL();
    downloadLink.click();
}

function downloadCode() {
    const codeBlob = new Blob([logoCmd.value], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.download = "logo_code.txt";
    downloadLink.href = URL.createObjectURL(codeBlob);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
}

onMounted(() => {
    turtle.canvasCtx = logoCanvas.value.getContext("2d");
    turtle.resetTurtle();
    turtle.drawTurtle();
    logoCmd.value = `bk 45+45
        rt 100 - 10
        fd 9*\t10
        lt 180  /2
        fd (sum 30 30 30)

        pu
        fd 90
        pd

        fd 90 fd 90 bk 30

        pe
        bk 60
        ppt

        bk 30

        RT 45
        repeat 4 [fd 90 rt 90]

        lt 105 fd 90
        lt 120 fd product 90 sin 30
        lt 90 fd product cos 30 90`;
});
</script>

<template>
    <div class="appmain">
        <div class="sidebar">
            <IconButton
                @clicked="downloadGraph"
                :icon="IoDownloadIcon"
                tooltip="Download graph"
            />
            <IconButton
                @clicked="downloadCode"
                :icon="IoCodeDownloadIcon"
                tooltip="Download LOGO code
            "
            />
        </div>
        <div ref="workspace" class="workspace">
            <canvas ref="logoCanvas" class="canvas" height="900" width="1200" />
            <textarea
                v-model="logoCmd"
                class="commands"
                spellcheck="false"
                @keyup.enter="processAllCmds"
            />
            <textarea
                v-model="consoleLog"
                class="consolelog"
                spellcheck="false"
                readonly
            />
        </div>
    </div>
</template>

<style scoped>
.appmain {
    display: grid;
    grid-auto-columns: auto;
    grid-template-areas: "sidebar workspace";
    grid-template-rows: 1fr;
    gap: 0px;
    width: 100%;
}

.sidebar {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    min-width: 3em;
    transition: all 0.5s ease;
    position: sticky;
}

.workspace {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    justify-content: normal;
    align-items: normal;
    align-content: normal;
    width: 100%;
    overflow-y: auto;
}

.canvas {
    display: block;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    background: white;
    max-width: min(100%, 1200px);
}

.commands {
    display: block;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    min-height: 300px;
    width: 600px;
    max-width: min(100%, 1200px);
    box-sizing: border-box;
    padding: 5px;
    font-size: 2em;
    resize: none;
}

.consolelog {
    display: block;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    box-sizing: border-box;
    min-height: 300px;
    width: 600px;
    max-width: min(100%, 1200px);
    resize: none;
    padding: 10px;
    text-align: left;
    font-size: 1.5em;
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
        serif;
    color: #1a95e0;
}
</style>
