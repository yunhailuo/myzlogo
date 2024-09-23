<script setup>
import { FitAddon } from "@xterm/addon-fit";
import { WebglAddon } from "@xterm/addon-webgl";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { onBeforeUnmount, onMounted, ref } from "vue";
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
const encoder = new TextEncoder();
const term = new Terminal({
    cursorBlink: true,
    convertEol: true,
    fontFamily: '"Cascadia Code", Menlo, monospace',
    fontSize: "18",
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

function connectStreams(instance, term, logoGraphics = {}) {
    const stdin = instance.stdin?.getWriter();
    const cmdHistory = [];
    let historyIdx = 0;
    function getCurrentCmd() {
        let currentY =
            term.buffer.active.viewportY + term.buffer.active.cursorY;
        let currentLine = term.buffer.active.getLine(currentY);
        let currentLineStr = "";
        while (currentLine.isWrapped) {
            currentLineStr =
                currentLine.translateToString().trim() + currentLineStr;
            currentY--;
            currentLine = term.buffer.active.getLine(currentY);
        }
        currentLineStr =
            currentLine.translateToString().trim() + currentLineStr;
        return currentLineStr.slice(2);
    }
    term.onData((data) => {
        if (data === "\r") {
            cmdHistory.push(getCurrentCmd());
            historyIdx = cmdHistory.length;
            codeHistory.value = cmdHistory.join("\n");
        } else if (data === "\u001b[A") {
            // Up arrow key
            if (historyIdx > 0) {
                historyIdx--;
                term.input("\x7F".repeat(getCurrentCmd().length));
                term.input(cmdHistory[historyIdx]);
            }
            return;
        } else if (data === "\u001b[B") {
            // Down arrow key
            if (historyIdx < cmdHistory.length - 1) {
                historyIdx++;
                term.input("\x7F".repeat(getCurrentCmd().length));
                term.input(cmdHistory[historyIdx]);
            }
            return;
        } else if (data === "\u001b[C" || data === "\u001b[D") {
            return
        }
        [...data].forEach((c) => {
            stdin?.write(encoder.encode(c));
        });
    });
    instance.stdout.pipeTo(
        new WritableStream({ write: (chunk) => term.write(chunk) })
    );
    var stderrLineBuf = "";
    function processStderrLine() {
        if (stderrLineBuf == "<<LOGOGRAPHICS\n") {
            console.debug("Start drawing");
            logoGraphics.beginPath();
            instance.drawing = true;
        } else if (stderrLineBuf == "LOGOGRAPHICS\n") {
            logoGraphics.stroke();
            console.debug("Done drawing");
            instance.drawing = false;
        } else if (instance.drawing) {
            let [cmd, ...args] = stderrLineBuf.trim().split(", ");
            console.debug(cmd, args);
            if (typeof logoGraphics[cmd] === "function") {
                logoGraphics[cmd](...args);
            }
        } else {
            term.write(stderrLineBuf.trim());
        }
        stderrLineBuf = "";
    }
    instance.stderr.pipeTo(
        new WritableStream({
            write: (chunk) => {
                let s = new TextDecoder().decode(chunk);
                while (s.includes("\n")) {
                    stderrLineBuf += s.substring(0, s.indexOf("\n") + 1);
                    processStderrLine();
                    s = s.substring(s.indexOf("\n") + 1);
                }
                stderrLineBuf += s;
            },
        })
    );
}

function floodFill(canvasCtx, startX, startY) {
    let canvasWidth = canvasCtx.canvas.width;
    let canvasHeight = canvasCtx.canvas.height;
    let colorData = canvasCtx.getImageData(0, 0, canvasWidth, canvasHeight);
    let startPos = (startY * canvasWidth + startX) * 4;
    let startColor = colorData.data.slice(startPos, startPos + 4);
    let fillColor = [
        parseInt(canvasCtx.strokeStyle.slice(1, 3), 16),
        parseInt(canvasCtx.strokeStyle.slice(3, 5), 16),
        parseInt(canvasCtx.strokeStyle.slice(5, 7), 16),
        canvasCtx.globalAlpha * 255,
    ];
    var pixelStack = [[startX, startY]];
    var x, y, pixelPos, reachLeft, reachRight;
    while (pixelStack.length) {
        [x, y] = pixelStack.pop();
        // This is position in `colorData` array
        pixelPos = (y * canvasWidth + x) * 4;

        // Go up as long as the color matches and are inside the canvas
        while (
            y >= 0 &&
            colorData.data
                .slice(pixelPos, pixelPos + 4)
                .every((val, idx) => val === startColor[idx])
        ) {
            y -= 1;
            pixelPos -= canvasWidth * 4;
        }
        pixelPos += canvasWidth * 4;
        y += 1;
        reachLeft = false;
        reachRight = false;

        // Go down as long as the color matches and in inside the canvas
        while (
            y <= canvasHeight - 1 &&
            colorData.data
                .slice(pixelPos, pixelPos + 4)
                .every((val, idx) => val === startColor[idx])
        ) {
            y += 1;

            colorData.data[pixelPos] = fillColor[0];
            colorData.data[pixelPos + 1] = fillColor[1];
            colorData.data[pixelPos + 2] = fillColor[2];
            colorData.data[pixelPos + 3] = fillColor[3];

            if (x > 0) {
                if (
                    colorData.data
                        .slice(pixelPos - 4, pixelPos)
                        .every((val, idx) => val === startColor[idx])
                ) {
                    if (!reachLeft) {
                        // Add pixel to stack
                        pixelStack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else if (reachLeft) {
                    reachLeft = false;
                }
            }

            if (x < canvasWidth) {
                if (
                    colorData.data
                        .slice(pixelPos + 4, pixelPos + 8)
                        .every((val, idx) => val === startColor[idx])
                ) {
                    if (!reachRight) {
                        // Add pixel to stack
                        pixelStack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else if (reachRight) {
                    reachRight = false;
                }
            }

            pixelPos += canvasWidth * 4;
        }
    }

    canvasCtx.putImageData(colorData, 0, 0);
}

onMounted(async () => {
    term.loadAddon(new WebglAddon());
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(xtermContainer.value);
    fitAddon.fit();
    term.writeln("Starting...");

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

    const logoCanvasCtx = logoCanvas.value.getContext("2d");
    const turtleCanvasCtx = turtleCanvas.value.getContext("2d");
    const logoGraphics = {
        lineTo: function (a, b) {
            logoCanvasCtx.lineTo(
                (logoCanvasCtx.canvas.width / 200) * a +
                    logoCanvasCtx.canvas.width / 2,
                (logoCanvasCtx.canvas.height / 200) * b +
                    logoCanvasCtx.canvas.height / 2
            );
        },
        moveTo: function (a, b) {
            logoCanvasCtx.moveTo(
                (logoCanvasCtx.canvas.width / 200) * a +
                    logoCanvasCtx.canvas.width / 2,
                (logoCanvasCtx.canvas.height / 200) * b +
                    logoCanvasCtx.canvas.height / 2
            );
        },
        set: function (prop, val) {
            logoCanvasCtx[prop] = val;
        },
        beginPath: function () {
            logoCanvasCtx.beginPath();
        },
        stroke: function () {
            logoCanvasCtx.stroke();
        },
        clear: function () {
            logoCanvasCtx.save();
            logoCanvasCtx.resetTransform();
            logoCanvasCtx.clearRect(
                0,
                0,
                logoCanvasCtx.canvas.width,
                logoCanvasCtx.canvas.height
            );
            logoCanvasCtx.restore();
        },
        floodFill: function (a, b) {
            floodFill(
                logoCanvasCtx,
                (logoCanvasCtx.canvas.width / 200) * a +
                    logoCanvasCtx.canvas.width / 2,
                (logoCanvasCtx.canvas.height / 200) * b +
                    logoCanvasCtx.canvas.height / 2
            );
        },
        turtlePath2D: new Path2D(
            "M0 16L-2 14L-1 10L-4 7L-7 9" +
                "L-9 8L-6 5L-7 1L-5 -3L-8 -6" +
                "L-6 -8L-4 -5L0 -7L4 -5L6 -8" +
                "L8 -6L5 -3L7 1L6 5L9 8" +
                "L7 9L4 7L1 10L2 14 Z"
        ),
        drawTurtle: function (x, y, heading) {
            // erase turtle first
            turtleCanvasCtx.save();
            turtleCanvasCtx.resetTransform();
            turtleCanvasCtx.clearRect(
                0,
                0,
                turtleCanvasCtx.canvas.width,
                turtleCanvasCtx.canvas.height
            );
            turtleCanvasCtx.restore();

            // https://stackoverflow.com/a/26267957
            turtleCanvasCtx.save();
            turtleCanvasCtx.translate(
                (logoCanvasCtx.canvas.width / 200) * x +
                    logoCanvasCtx.canvas.width / 2,
                (logoCanvasCtx.canvas.height / 200) * y +
                    logoCanvasCtx.canvas.height / 2
            );
            turtleCanvasCtx.rotate(
                (parseFloat(heading) + 180) * (Math.PI / 180)
            );
            turtleCanvasCtx.fillStyle = "green";
            turtleCanvasCtx.fill(this.turtlePath2D);
            turtleCanvasCtx.restore();
        },
    };

    // Note: We dynamically import the Wasmer SDK to make sure the bundler puts
    // it in its own chunk. This works around an issue where just importing
    // xterm.js runs top-level code which accesses the DOM, and if it's in the
    // same chunk as @wasmer/sdk, each Web Worker will try to run this code and
    // crash.
    // See https://github.com/wasmerio/wasmer-js/issues/373
    const { init, initializeLogger, Wasmer } = await import(
        "../lib/WasmerSDKBundled.js"
    );

    const binary = await fetch("src/lib/ucblogo.v3.webc")
        .then((response) => response.arrayBuffer())
        .then((bytes) => new Uint8Array(bytes));
    await init();
    // TODO: use URL query string for setting log level.
    const logFilter = "warn";
    initializeLogger(logFilter);

    const pkg = await Wasmer.fromFile(binary);
    const instance = await pkg.entrypoint?.run();
    term.reset();
    instance.drawing = false;
    connectStreams(instance, term, logoGraphics);
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
            <canvas
                ref="logoCanvas"
                class="canvas"
                height="1000"
                width="1000"
            />
            <canvas
                ref="turtleCanvas"
                class="canvas turtlecover"
                height="1000"
                width="1000"
            />
            <div class="xterm-container">
                <div ref="xtermContainer" class="xterm-container__inner"></div>
            </div>
            <fieldset class="code-history">
                <legend contenteditable="false">Code history</legend>
                <textarea
                    v-model="codeHistory"
                    spellcheck="false"
                    @keyup.enter="rerunHistory"
                    readonly
                />
            </fieldset>
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
    width: 3em;
    max-width: 3em;
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
    max-width: min(100%, 1000px);
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
    height: 100%;
    width: 600px;
    max-width: min(100%, 1000px);
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
    max-width: min(100%, 1000px);
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
