<script setup>
import { FitAddon } from "@xterm/addon-fit";
import { WebglAddon } from "@xterm/addon-webgl";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { onBeforeUnmount, onMounted, ref } from "vue";
import UCBLogoRunner from "../lib/UCBLogoRunner";
import IconButton from "./icons/IconButton.vue";
import IoCodeDownloadIcon from "./icons/IoCodeDownloadIcon.vue";
import IoDocumentText from "./icons/IoDocumentText.vue";
import IoDownloadIcon from "./icons/IoDownloadIcon.vue";

const workspace = ref(null);
const logoCanvas = ref(null);
const turtleCanvas = ref(null);
const codeHistory = ref("");
const xtermContainer = ref(null);
const xtermResizeObserver = ref(null);
const term = new Terminal({
    cursorBlink: true,
    fontFamily: '"Cascadia Code", Menlo, monospace',
    fontSize: "18",
});

term.cmdCache = "";
term.prompt = () => {
    term.write("\r\n? ");
};
term.init = () => {
    term.writeln(
        [
            "┌────────────────────────────────────┐",
            "| Welcome to the \x1B[32mM\x1B[33mY\x1B[34mZ\x1B[35mL\x1B[0m Logo terminal! |",
            "└────────────────────────────────────┘",
        ].join("\r\n")
    );
    term.prompt();
};
term.onData((e) => {
    switch (e) {
        case "\u0003": // Ctrl+C
            term.write("^C");
            term.prompt();
            break;
        case "\r": // Enter
            if (term.cmdCache.trim() != "") {
                if (
                    codeHistory.value &&
                    codeHistory.value.charAt(codeHistory.value.length - 1) !=
                        "\n"
                ) {
                    codeHistory.value += "\n";
                }
                codeHistory.value += `${term.cmdCache}\n`;
                logoRunner.runresult(term.cmdCache);
            }
            term.cmdCache = "";
            term.prompt();
            break;
        case "\u007F": // Backspace (DEL)
            // Do not delete the prompt
            if (term._core.buffer.x > 2) {
                term.write("\b \b");
                if (term.cmdCache.length > 0) {
                    term.cmdCache = term.cmdCache.substring(
                        0,
                        term.cmdCache.length - 1
                    );
                }
            }
            break;
        default: // Print all other characters for demo
            if (
                (e >= String.fromCharCode(0x20) &&
                    e <= String.fromCharCode(0x7e)) ||
                e >= "\u00a0"
            ) {
                term.cmdCache += e;
                term.write(e);
            }
    }
});

const logger = {
    error() {
        console.error(...arguments);
        term.write(
            `\r\n\x1B[31m${[...arguments]
                .map((arg) => String(arg).replaceAll("\n", "\r\n"))
                .join("\r\n")}\x1B[0m`
        );
    },
    log() {
        console.log(...arguments);
        term.write(
            `\r\n${[...arguments]
                .map((arg) => String(arg).replaceAll("\n", "\r\n"))
                .join("\r\n")}`
        );
    },
};

const logoRunner = new UCBLogoRunner(null, null, logger);

function rerunHistory() {
    let commands = codeHistory.value
        .replace(/\n$/, "")
        .split("\n")
        .filter((cmd) => cmd != "");
    codeHistory.value = "";
    term.reset();
    term.init();
    commands.forEach((line) => {
        term.paste(`${line}`);
        term.paste("\r"); // Trigger onData event
    });
}

function downloadGraph() {
    const downloadLink = document.createElement("a");
    downloadLink.download = "logo_turtle.png";
    downloadLink.href = logoCanvas.value.toDataURL();
    downloadLink.click();
}

function downloadCode() {
    const codeBlob = new Blob([codeHistory.value], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.download = "logo_code.txt";
    downloadLink.href = URL.createObjectURL(codeBlob);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
}

function uploadCode() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.addEventListener("change", () => {
        let uploadedFile = fileInput.files[0];
        if (uploadedFile.type != "text/plain") {
            logger.error(
                `Cannot load ${uploadedFile.type} file "${uploadedFile.name}";`,
                "expecting text/plain file"
            );
        } else {
            uploadedFile.text().then(
                (content) => (codeHistory.value = content),
                (res) => {
                    logger.error(`Fail to load "${uploadedFile.name}": ${res}`);
                }
            );
        }
    });
    fileInput.click();
}

const logoSampleCode = [
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

function loadSampleCode() {
    codeHistory.value = logoSampleCode;
}

onMounted(() => {
    term.loadAddon(new WebglAddon());
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(xtermContainer.value);
    fitAddon.fit();
    term.init();

    var xtermContainerWidth =
        xtermContainer.value.getBoundingClientRect().width;
    xtermResizeObserver.value = new ResizeObserver((entries) => {
        let newWidth = entries[0].contentRect.width;
        if (xtermContainerWidth != newWidth) {
            xtermContainerWidth = newWidth;
            fitAddon.fit();
        }
    });
    xtermResizeObserver.value.observe(xtermContainer.value);

    logoRunner.canvases = [
        logoCanvas.value.getContext("2d"),
        turtleCanvas.value.getContext("2d"),
    ];
});

onBeforeUnmount(() => {
    xtermResizeObserver.value.unobserve(workspace.value);
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
                tooltip="Download LOGO code"
            />
            <IconButton
                @clicked="uploadCode"
                :icon="IoCodeDownloadIcon"
                tooltip="Upload LOGO code"
                buttonRotation="180deg"
            />
            <IconButton
                @clicked="loadSampleCode"
                :icon="IoDocumentText"
                tooltip="Load samle code"
            />
            <a ref="downloadElement" hidden />
        </div>
        <div ref="workspace" class="workspace">
            <canvas ref="logoCanvas" class="canvas" height="900" width="1200" />
            <canvas
                ref="turtleCanvas"
                class="canvas turtlecover"
                height="900"
                width="1200"
            />
            <fieldset class="code-history">
                <legend contenteditable="false">Code history</legend>
                <textarea
                    v-model="codeHistory"
                    spellcheck="false"
                    @keyup.enter="rerunHistory"
                />
            </fieldset>
            <div class="xterm-container">
                <div ref="xtermContainer" class="xterm-container__inner"></div>
            </div>
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
    z-index: -1;
}

.code-history {
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
    padding: 0 5px;
    font-size: 1.5em;
    resize: none;
    & > legend {
        color: #61aeee;
    }
    & > textarea {
        height: calc(100% - 15px);
        width: 100%;
        resize: none;
        background-color: transparent;
        border: 0px solid transparent;
        outline: 0px solid transparent;
        font-size: 1.5em;
    }
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
    padding: 10px 1px 0 20px;
    background-color: black;
    text-align: start;
}

.xterm-container__inner {
    box-sizing: content-box;
    height: 100%;
    width: 100%;
}
</style>
