<script setup>
import { FitAddon } from "@xterm/addon-fit";
import { WebglAddon } from "@xterm/addon-webgl";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { onMounted, ref } from "vue";
import UCBLogoRunner from "../lib/UCBLogoRunner";
import IconButton from "./IconButton.vue";
import IoCodeDownloadIcon from "./IoCodeDownloadIcon.vue";
import IoDownloadIcon from "./IoDownloadIcon.vue";

const workspace = ref(null);
const logoCanvas = ref(null);
const turtleCanvas = ref(null);
const logoCmd = ref("");
const xtermContainer = ref(null);
const term = new Terminal({
    fontFamily: '"Cascadia Code", Menlo, monospace',
    cursorBlink: true,
});

const logger = {
    error() {
        console.error(...arguments);
        term.writeln(`\x1B[31m${[...arguments].join(" ")}\x1B[0m\r`);
    },
    log() {
        console.log(...arguments);
        term.writeln(`${[...arguments].join(" ")}\r`);
    },
};

const logoRunner = new UCBLogoRunner(null, null, logger);

function processAllCmds() {
    logoRunner.runresult(logoCmd.value);
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
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(xtermContainer.value);
    fitAddon.fit();
    term.loadAddon(new WebglAddon());
    term.write(
        "Welcome to \x1B[32mM\x1B[33mY\x1B[34mZ\x1B[35mL\x1B[0m Logo!\r\n\r\n"
    );
    logoRunner.canvases = [
        logoCanvas.value.getContext("2d"),
        turtleCanvas.value.getContext("2d"),
    ];
    logoCmd.value = [
        "cs pd ppt",
        "bk 45+45",
        "rt 100 - 10",
        "fd 9*\t10",
        "lt 180  /2",
        "fd (sum 30 30 30)",
        "",
        "pu",
        "forward 90",
        "pd",
        "",
        "fd 90 fd 90 bk 30",
        "",
        "pe",
        "bk 60",
        "ppt",
        "",
        "bk 30",
        "",
        "RT 45",
        "repeat 4 [fd 90 rt 90]",
        "",
        "lt 105 fd 90",
        "lt 120 fd product 90 sin 30",
        "lt 90 fd product cos 30 90",
        "seth 180-22.5",
        "arc (90+22.5)/180*3.14 (cos 30) * 90",
    ].join("\n");
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
            <canvas
                ref="turtleCanvas"
                class="canvas turtlecover"
                height="900"
                width="1200"
            />
            <textarea
                v-model="logoCmd"
                class="commands"
                spellcheck="false"
                @keyup.enter="processAllCmds"
            />
            <div ref="xtermContainer" class="xterm-container"></div>
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
    position: relative;
}

.turtlecover,
.canvas.turtlecover {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 1;
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
    z-index: 0;
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

.xterm-container {
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
    padding: 10px 20px;
    background-color: black;
    text-align: start;
}
</style>
