export class Turtle {
    constructor() {
        this.canvasCtx = null
        this.resetTurtle()
    }

    resetTurtle() {
        this.x = 0
        this.y = 0
        this.degree = 180
        this.color = "#ff0000"
        this.width = 3
        this.penDown = true
        this.erase = false
        this.visible = true
        if (this.canvasCtx) {
            this.x = this.canvasCtx.canvas.width / 2
            this.y = this.canvasCtx.canvas.height / 2
            this.showTurtle()
        }
    }

    radian() {
        return this.degree * (Math.PI / 180)
    }

    // https://github.com/bjpop/js-turtle/blob/master/turtle.js
    #turtleShape = [
        [0, 16], [-2, 14], [-1, 10], [-4, 7], [-7, 9],
        [-9, 8], [-6, 5], [-7, 1], [-5, -3], [-8, -6],
        [-6, -8], [-4, -5], [0, -7], [4, -5], [6, -8],
        [8, -6], [5, -3], [7, 1], [6, 5], [9, 8],
        [7, 9], [4, 7], [1, 10], [2, 14]
    ]

    // Canvas draw functions
    showTurtle() {
        if (!this.visible) {
            return
        }
        // https://stackoverflow.com/a/26267957
        this.canvasCtx.save()
        this.canvasCtx.translate(this.x, this.y)
        this.canvasCtx.rotate(-this.radian())
        this.canvasCtx.translate(-this.x, -this.y)
        this.canvasCtx.beginPath()
        if (this.#turtleShape.length > 0)
            this.canvasCtx.moveTo(this.x + this.#turtleShape[0][0], this.y + this.#turtleShape[0][1])
        for (const [cx, cy] of this.#turtleShape.slice(1)) {
            this.canvasCtx.lineTo(this.x + cx, this.y + cy)
        }
        this.canvasCtx.closePath()
        this.canvasCtx.fillStyle = 'green'
        this.canvasCtx.fill()
        this.canvasCtx.restore()
    }

    drawSingleLineTo(
        x1, y1, color = this.color, width = this.width, erase = this.erase
    ) {
        this.canvasCtx.beginPath()
        this.canvasCtx.strokeStyle = color
        this.canvasCtx.lineWidth = width
        if (erase) {
            this.canvasCtx.globalCompositeOperation = "destination-out"
        }
        else {
            this.canvasCtx.globalCompositeOperation = "source-over"
        }
        this.canvasCtx.moveTo(this.x, this.y)
        this.canvasCtx.lineTo(x1, y1)
        this.canvasCtx.stroke()
        this.canvasCtx.closePath()
        this.canvasCtx.globalCompositeOperation = "source-over"
    }

    forward(distance) {
        let x1 = this.x + Math.sin(this.radian()) * distance
        let y1 = this.y + Math.cos(this.radian()) * distance
        if (this.penDown) {
            this.drawSingleLineTo(x1, y1)
        }
        this.x = x1
        this.y = y1
    }

    processOneLineCmd(line) {
        let cmdLine = line.trim()
        if (cmdLine) {
            if (cmdLine == "clear") {
                this.canvasCtx.clearRect(
                    0,
                    0,
                    this.canvasCtx.canvas.width,
                    this.canvasCtx.canvas.height,
                )
            }
            else if (cmdLine.startsWith("forward ") || cmdLine.startsWith("fd ")) {
                this.forward(Number(cmdLine.split(" ")[1]))
            }
            else if (cmdLine.startsWith("back ") || cmdLine.startsWith("bk ")) {
                this.forward(-Number(cmdLine.split(" ")[1]))
            }
            else if (cmdLine.startsWith("right ") || cmdLine.startsWith("rt ")) {
                this.degree -= Number(cmdLine.split(" ")[1])
            }
            else if (cmdLine.startsWith("left ") || cmdLine.startsWith("lt ")) {
                this.degree += Number(cmdLine.split(" ")[1])
            }
            else if (cmdLine == "penup" || cmdLine == "pu") {
                this.penDown = false
                this.erase = false
            }
            else if (cmdLine == "pendown" || cmdLine == "pd") {
                this.penDown = true
                this.erase = false
            }
            else if (cmdLine == "penerase" || cmdLine == "pe") {
                this.penDown = true
                this.erase = true
            }
            else if (cmdLine == "hideturtle" || cmdLine == "ht") {
                this.visible = false
            }
            else if (cmdLine == "showturtle" || cmdLine == "st") {
                this.visible = true
            }
            else {
                console.log(`fail to process command(s): ${cmdLine}`)
            }
        }
    }
}
