import parse from "./parser/parse";

export default class UCBLogoRunner {
    constructor(graphCanvas, turtleCanvas, logger) {
        this.logger = logger || console;
        this.canvases = [graphCanvas, turtleCanvas];
    }

    static #dummyCanvas = new Proxy(
        {},
        {
            get(obj, prop) {
                return (...args) => {
                    this.logger.log(
                        `LOGO canvas not ready yet for doing "${prop}" with [${args}]`
                    );
                };
            },
        }
    );
    set canvases(layers) {
        const [graphCanvas, turtleCanvas] = layers;
        this.graphCanvas = graphCanvas || UCBLogoRunner.#dummyCanvas;
        this.turtleCanvas = turtleCanvas || UCBLogoRunner.#dummyCanvas;
        if (graphCanvas && graphCanvas) {
            // Translate origin to center of canvas
            this.graphCanvas.translate(
                this.graphCanvas.canvas.width / 2,
                this.graphCanvas.canvas.height / 2
            );
            this.turtleCanvas.translate(
                this.turtleCanvas.canvas.width / 2,
                this.turtleCanvas.canvas.height / 2
            );
            this.#resetTurtle();
        }
    }

    #turtleX;
    #turtleY;
    #turtleHeadings;
    get #radian() {
        // Adjust for Logo headings which are measured in degrees clockwise
        // from the positive Y axis.
        return (this.#turtleHeadings + 180) * (Math.PI / 180);
    }
    #turtleVisible;
    #penPos;
    #penMode;
    #penColor;
    #penSize;
    set penMode(mode) {
        this.#penMode = mode;
        if (mode == "ERASE") {
            this.graphCanvas.globalCompositeOperation = "destination-out";
        } else if (mode == "PAINT") {
            this.graphCanvas.globalCompositeOperation = "source-over";
        }
    }
    set penColor(color) {
        this.#penColor = color;
        const [r, g, b] = color;
        this.graphCanvas.strokeStyle =
            "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    }
    set penSize(size) {
        this.#penSize = size;
        this.graphCanvas.lineWidth = size;
    }

    static #turtlePath2D = new Path2D(
        "M0 16L-2 14L-1 10L-4 7L-7 9" +
            "L-9 8L-6 5L-7 1L-5 -3L-8 -6" +
            "L-6 -8L-4 -5L0 -7L4 -5L6 -8" +
            "L8 -6L5 -3L7 1L6 5L9 8" +
            "L7 9L4 7L1 10L2 14 Z"
    );

    #resetTurtle() {
        this.home();
        this.pendown();
        this.penpaint();
        this.showturtle();
        this.setpencolor(21, 32, 166);
        this.setpensize(3);
    }

    #drawTurtle() {
        if (!this.#turtleVisible) {
            return;
        }
        // https://stackoverflow.com/a/26267957
        this.turtleCanvas.save();
        this.turtleCanvas.translate(this.#turtleX, this.#turtleY);
        this.turtleCanvas.rotate(-this.#radian);
        this.turtleCanvas.fillStyle = "green";
        this.turtleCanvas.fill(UCBLogoRunner.#turtlePath2D);
        this.turtleCanvas.restore();
    }

    #eraseTurtle() {
        this.turtleCanvas.save();
        this.turtleCanvas.resetTransform();
        this.turtleCanvas.clearRect(
            0,
            0,
            this.turtleCanvas.canvas.width,
            this.turtleCanvas.canvas.height
        );
        this.turtleCanvas.restore();
    }

    /* DATA STRUCTURE PRIMITIVES - CONSTRUCTORS */
    word(...words) {
        words.forEach((w) => {
            if (Array.isArray(w)) {
                throw new Error(`word procedure only accepts word; got ${w}`);
            }
        });
        return words.join("");
    }
    list(...things) {
        return things;
    }
    sentence(...things) {
        let output = [];
        things.forEach((t) => {
            if (Array.isArray(t)) {
                output.push(...t);
            } else {
                output.push(t);
            }
        });
        return output;
    }
    se = this.sentence;
    fput(thing, originalList) {
        return [thing].concat(originalList);
    }
    lput(thing, originalList) {
        return originalList.concat(thing);
    }

    /* COMMUNICATION - TRANSMITTERS */
    #stringify(thing) {
        return Array.isArray(thing)
            ? `[${thing.map((e) => this.#stringify(e)).join(" ")}]`
            : `${thing}`;
    }
    print(...things) {
        this.logger.log(
            things
                .map((e) =>
                    Array.isArray(e)
                        ? this.#stringify(e).slice(1, -1)
                        : this.#stringify(e)
                )
                .join(" ")
        );
    }
    show(...things) {
        this.logger.log(things.map((e) => this.#stringify(e)).join(" "));
    }

    /* ARITHMETIC - NUMERIC OPERATIONS */
    sum(...nums) {
        return nums.reduce((acc, cur) => acc + cur, 0);
    }

    difference(num1, num2) {
        return num1 - num2;
    }

    minus(num) {
        return -num;
    }

    product(...nums) {
        return nums.reduce((acc, cur) => acc * cur, 1);
    }

    quotient(num1, num2) {
        return num1 / num2;
    }

    remainder(num1, num2) {
        return num1 % num2;
    }

    modulo(num1, num2) {
        // Floor division
        return num1 - num2 * Math.floor(num1 / num2);
    }

    int(num) {
        return Math.trunc(num);
    }

    round(num) {
        return Math.round(num);
    }

    sqrt(num) {
        return Math.sqrt(num);
    }

    power(num1, num2) {
        return Math.pow(num1, num2);
    }

    exp(num) {
        return Math.exp(num);
    }

    log10(num) {
        return Math.log10(num);
    }
    ln(num) {
        return Math.log(num);
    }
    sin(degrees) {
        return Math.sin(degrees * (Math.PI / 180));
    }
    radsin(radians) {
        return Math.sin(radians);
    }
    cos(degrees) {
        return Math.cos(degrees * (Math.PI / 180));
    }
    radcos(radians) {
        return Math.cos(radians);
    }
    arctan(num, y) {
        if (typeof y !== "undefined") {
            // ARCTAN x y
            if (num == 0) {
                return 90 * (y < 0 ? -1 : 1);
            } else {
                return Math.atan(y / num) / (Math.PI / 180);
            }
        } else {
            // ARCTAN num
            return Math.atan(num) / (Math.PI / 180);
        }
    }
    radarctan(num, y) {
        if (typeof y !== "undefined") {
            // RADARCTAN x y
            if (num == 0) {
                return (Math.PI / 2) * (y < 0 ? -1 : 1);
            } else {
                return Math.atan(y / num);
            }
        } else {
            // RADARCTAN num
            return Math.atan(num);
        }
    }

    /* GRAPHICS - TURTLE MOTION */

    forward(dist) {
        this.#eraseTurtle();
        let x1 = this.#turtleX + Math.sin(this.#radian) * dist;
        let y1 = this.#turtleY + Math.cos(this.#radian) * dist;
        if (this.#penPos == "DOWN") {
            this.graphCanvas.stroke(
                new Path2D(`M${this.#turtleX} ${this.#turtleY}L${x1} ${y1}`)
            );
        }
        this.#turtleX = x1;
        this.#turtleY = y1;
        this.#drawTurtle();
    }
    fd = this.forward;

    back(dist) {
        this.forward(-dist);
    }
    bk = this.back;

    left(degrees) {
        this.#eraseTurtle();
        this.#turtleHeadings += Number(degrees);
        this.#drawTurtle();
    }
    lt = this.left;

    right(degrees) {
        this.left(-degrees);
    }
    rt = this.right;

    setpos(pos) {
        this.setxy(...pos);
    }

    setxy(x, y) {
        this.setx(x);
        this.sety(y);
    }

    setx(x) {
        this.#eraseTurtle();
        this.#turtleX = x;
        this.#drawTurtle();
    }

    sety(y) {
        this.#eraseTurtle();
        this.#turtleY = y;
        this.#drawTurtle();
    }

    setheading(degrees) {
        this.#eraseTurtle();
        this.#turtleHeadings = -Number(degrees);
        this.#drawTurtle();
    }
    seth = this.setheading;

    home() {
        this.setpos([0, 0]);
        this.setheading(0);
    }

    arc(angle, radius) {
        if (this.#penPos == "DOWN") {
            let x0 = this.#turtleX + Math.sin(this.#radian) * radius;
            let y0 = this.#turtleY + Math.cos(this.#radian) * radius;
            let x1 = this.#turtleX + Math.sin(this.#radian - angle) * radius;
            let y1 = this.#turtleY + Math.cos(this.#radian - angle) * radius;
            this.graphCanvas.stroke(
                new Path2D(
                    `M${x0} ${y0}A${radius} ${radius} 0 ${+(
                        angle >= Math.PI
                    )} 1 ${x1} ${y1}`
                )
            );
        }
    }

    /* GRAPHICS - TURTLE MOTION QUERIES */

    pos() {
        return [this.#turtleX, this.#turtleY];
    }

    heading() {
        return this.#turtleHeadings;
    }

    towards(pos) {
        let [x, y] = pos;
        return (
            270 -
            180 * (x > 0) -
            Math.atan((y - this.#turtleY) / (x - this.#turtleX)) *
                (180 / Math.PI)
        );
    }

    /* GRAPHICS - TURTLE AND WINDOW CONTROL */

    showturtle() {
        this.#eraseTurtle();
        this.#turtleVisible = true;
        this.#drawTurtle();
    }
    st = this.showturtle;

    hideturtle() {
        this.#eraseTurtle();
        this.#turtleVisible = false;
        this.#drawTurtle();
    }
    ht = this.hideturtle;

    clean() {
        this.#eraseTurtle();
        this.graphCanvas.save();
        this.graphCanvas.resetTransform();
        this.graphCanvas.clearRect(
            0,
            0,
            this.graphCanvas.canvas.width,
            this.graphCanvas.canvas.height
        );
        this.graphCanvas.restore();
        this.#drawTurtle();
    }

    clearscreen() {
        this.home();
        this.clean();
    }
    cs = this.clearscreen;

    /* GRAPHICS - TURTLE AND WINDOW QUERIES */

    shownp() {
        return this.#turtleVisible;
    }

    /* GRAPHICS - PEN AND BACKGROUND CONTROL */

    pendown() {
        this.#penPos = "DOWN";
    }
    pd = this.pendown;

    penup() {
        this.#penPos = "UP";
    }
    pu = this.penup;

    penpaint() {
        this.#penPos = "DOWN";
        this.penMode = "PAINT";
    }
    ppt = this.penpaint;

    penerase() {
        this.#penPos = "DOWN";
        this.penMode = "ERASE";
    }
    pe = this.penerase;

    setpencolor(r, g, b) {
        this.penColor = [r, g, b];
    }

    setpensize(size) {
        this.penSize = size;
    }

    /* GRAPHICS - PEN QUERIES */
    pendownp() {
        return this.#penPos == "DOWN";
    }

    penmode() {
        return this.#penMode;
    }

    pencolor() {
        return this.#penColor;
    }
    pc = this.pencolor;

    pensize() {
        return this.#penSize;
    }

    /* CONTROL STRUCTURES */
    run(instructionlist) {
        const results = this.runresult(instructionlist);
        if (results != []) {
            return results;
        }
    }

    runresult(instructionlist) {
        let jsTargetCode;
        try {
            jsTargetCode = parse(instructionlist);
        } catch (error) {
            this.logger.error(error);
            return;
        }
        const results = jsTargetCode.map((js) => {
            console.log(js);
            return Function("logo", `"use strict";${js}`)(this);
        });
        if (results.length == 1 && results[0] !== undefined) {
            return results;
        } else if (results.every((res) => res === undefined)) {
            return [];
        } else {
            throw Error(
                `Runlist [${instructionlist}] has more than one expression.`
            );
        }
    }

    repeat(num, instructionlist) {
        for (let i = 0; i < num; i++) {
            this.runresult(instructionlist);
        }
    }
}
