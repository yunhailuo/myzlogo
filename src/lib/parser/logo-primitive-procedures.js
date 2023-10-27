export class LogoPrimitiveProcedures {
    constructor(turtle) {
        this.turtle = turtle || {};
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
        console.log(
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
        console.log(things.map((e) => this.#stringify(e)).join(" "));
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

    /* TURTLE MOTION */
    forward(dist) {
        this.turtle.forward(dist);
    }
    fd = this.forward;
    back(dist) {
        this.turtle.back(dist);
    }
    bk = this.back;
    left(degrees) {
        this.turtle.left(degrees);
    }
    lt = this.left;
    right(degrees) {
        this.turtle.right(degrees);
    }
    rt = this.right;
    setpos(pos) {
        this.turtle.setpos(pos);
    }
    setxy(xcor, ycor) {
        this.turtle.setxy(xcor, ycor);
    }
    setx(xcor) {
        this.turtle.setx(xcor);
    }
    sety(ycor) {
        this.turtle.sety(ycor);
    }
    setheading(degrees) {
        this.turtle.setheading(degrees);
    }
    seth = this.setheading;
    home() {
        this.turtle.home();
    }

    /* TURTLE AND WINDOW CONTROL */
    showturtle() {
        this.turtle.showturtle();
    }
    st = this.showturtle;
    hideturtle() {
        this.turtle.hideturtle();
    }
    ht = this.hideturtle;
    clean() {
        this.turtle.clean();
    }
    clearscreen() {
        this.turtle.clearscreen();
    }
    cs = this.clearscreen;

    /* PEN AND BACKGROUND CONTROL */
    pendown() {
        this.turtle.pendown();
    }
    pd = this.pendown;
    penup() {
        this.turtle.penup();
    }
    pu = this.penup;
    penpaint() {
        this.turtle.penpaint();
    }
    ppt = this.penpaint;
    penerase() {
        this.turtle.penerase();
    }
    pe = this.penerase;
}
