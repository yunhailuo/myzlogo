export class Turtle {
    constructor() {
        this.canvasCtx = null;
        this.resetTurtle();
    }

    resetTurtle() {
        this.home();
        this.pendown();
        this.penpaint();
        this.showturtle();
        this.color = "#ff0000";
        this.width = 3;
    }

    get radian() {
        // Adjust for Logo headings which are measured in degrees clockwise
        // from the positive Y axis.
        return (this.degree + 180) * (Math.PI / 180);
    }

    // https://github.com/bjpop/js-turtle/blob/master/turtle.js
    #turtleShape = [
        [0, 16], [-2, 14], [-1, 10], [-4, 7], [-7, 9],
        [-9, 8], [-6, 5], [-7, 1], [-5, -3], [-8, -6],
        [-6, -8], [-4, -5], [0, -7], [4, -5], [6, -8],
        [8, -6], [5, -3], [7, 1], [6, 5], [9, 8],
        [7, 9], [4, 7], [1, 10], [2, 14]
    ];

    // Canvas draw functions
    drawTurtle() {
        if (!this.visible) {
            return;
        }
        if (!this.canvasCtx) {
            console.warn("Canvas undefined!");
            return;
        }
        // https://stackoverflow.com/a/26267957
        this.canvasCtx.save();
        // Translate turtle origin to center of canvas
        this.canvasCtx.translate(
            this.canvasCtx.canvas.width / 2,
            this.canvasCtx.canvas.height / 2
        );
        this.canvasCtx.translate(this.x, this.y);
        this.canvasCtx.rotate(-this.radian);
        this.canvasCtx.translate(-this.x, -this.y);
        this.canvasCtx.beginPath();
        if (this.#turtleShape.length > 0)
            this.canvasCtx.moveTo(this.x + this.#turtleShape[0][0], this.y + this.#turtleShape[0][1]);
        for (const [cx, cy] of this.#turtleShape.slice(1)) {
            this.canvasCtx.lineTo(this.x + cx, this.y + cy);
        }
        this.canvasCtx.closePath();
        this.canvasCtx.fillStyle = "green";
        this.canvasCtx.fill();
        this.canvasCtx.restore();
    }

    drawSingleLineTo(x1, y1) {
        this.canvasCtx.save();
        // Translate turtle origin to center of canvas
        this.canvasCtx.translate(
            this.canvasCtx.canvas.width / 2,
            this.canvasCtx.canvas.height / 2
        );
        this.canvasCtx.beginPath();
        this.canvasCtx.strokeStyle = this.color;
        this.canvasCtx.lineWidth = this.width;
        if (this.penMode == "ERASE") {
            this.canvasCtx.globalCompositeOperation = "destination-out";
        } else if (this.penMode == "PAINT") {
            this.canvasCtx.globalCompositeOperation = "source-over";
        }
        this.canvasCtx.moveTo(this.x, this.y);
        this.canvasCtx.lineTo(x1, y1);
        this.canvasCtx.stroke();
        this.canvasCtx.closePath();
        this.canvasCtx.restore();
    }

    /* TURTLE MOTION */

    forward(distance) {
        let x1 = this.x + Math.sin(this.radian) * distance;
        let y1 = this.y + Math.cos(this.radian) * distance;
        if (this.penPos == "DOWN") {
            this.drawSingleLineTo(x1, y1);
        }
        this.x = x1;
        this.y = y1;
    }
    fd = this.forward;

    back(distance) { this.forward(-distance); }
    bk = this.back;

    left(degree) { this.degree += Number(degree); }
    lt = this.left;

    right(degree) { this.degree -= Number(degree); }
    rt = this.right;

    setpos(pos) { this.setxy(...pos); }

    setxy(x, y) {
        this.setx(x);
        this.sety(y);
    }

    setx(x) { this.x = x; }

    sety(y) { this.y = y; }

    setheading(degree) { this.degree = Number(degree); }
    seth = this.setheading;

    home() {
        this.setpos([0, 0]);
        this.setheading(0);
    }

    /* TURTLE AND WINDOW CONTROL */

    showturtle() { this.visible = true; }
    st = this.showturtle;

    hideturtle() { this.visible = false; }
    ht = this.hideturtle;

    clean() {
        this.canvasCtx.clearRect(
            0,
            0,
            this.canvasCtx.canvas.width,
            this.canvasCtx.canvas.height,
        );
    }

    clearscreen() {
        this.home();
        this.clean();
    }

    /* PEN AND BACKGROUND CONTROL */

    pendown() { this.penPos = "DOWN"; }
    pd = this.pendown;

    penup() { this.penPos = "UP"; }
    pu = this.penup;

    penpaint() { this.penMode = "PAINT"; }
    ppt = this.penpaint;

    penerase() { this.penMode = "ERASE"; }
    pe = this.penerase;
}
