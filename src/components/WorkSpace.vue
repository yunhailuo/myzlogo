<script setup>
import { onMounted, ref } from "vue";
import UCBLogoRunner from "../lib/UCBLogoRunner";
import IconButton from "./IconButton.vue";
import IoDownloadIcon from "./IoDownloadIcon.vue";
import IoCodeDownloadIcon from "./IoCodeDownloadIcon.vue";

const workspace = ref(null);
const logoCanvas = ref(null);
const turtleCanvas = ref(null);
const logoCmd = ref("");
const consoleLog = ref("");

const logger = {
    error() {
        console.error(...arguments);
        consoleLog.value += `\n${[...arguments].join(" ")}`;
    },
    log() {
        console.log(...arguments);
        consoleLog.value += `\n${[...arguments].join(" ")}`;
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
    logoRunner.canvases = [
        logoCanvas.value.getContext("2d"),
        turtleCanvas.value.getContext("2d"),
    ];
    logoCmd.value =
        "cs " +
        "bk 45+45\n" +
        "rt 100 - 10\n" +
        "fd 9*\t10\n" +
        "lt 180  /2\n" +
        "fd (sum 30 30 30)\n" +
        "\n" +
        "pu\n" +
        "forward 90\n" +
        "pd\n" +
        "\n" +
        "fd 90 fd 90 bk 30\n" +
        "\n" +
        "pe\n" +
        "bk 60\n" +
        "ppt\n" +
        "\n" +
        "bk 30\n" +
        "\n" +
        "RT 45\n" +
        "repeat 4 [fd 90 rt 90]\n" +
        "\n" +
        "lt 105 fd 90\n" +
        "lt 120 fd product 90 sin 30\n" +
        "lt 90 fd product cos 30 90\n" +
        "seth 180-22.5\n" +
        "arc ((90+22.5)/180)*3.14 (cos 30)*90";
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
