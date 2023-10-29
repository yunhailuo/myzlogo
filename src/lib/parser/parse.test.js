import { expect, test } from "vitest";
import parse from "./parse";

test.concurrent.each([
    /*
        ANTLR4 parser rule
        ==================
    */

    /*
        instruction parser rule
        -----------------------
    */
    // procedureCallExtraInputInstruction
    ['(show "a "bc "def)', ['logo["show"]("a", "bc", "def");']],
    // procedureCallInstruction
    ["show 1", ['logo["show"](1);']],

    /*
        expression parser rule
        ----------------------
    */
    // unaryMinusExpression
    ["show -1+2", ['logo["show"]((-(1)) + (2));']],
    // procedureCallExtraInput
    ["show (SUM 1 2 3) + 4", ['logo["show"]((logo["sum"](1, 2, 3)) + (4));']],
    ["show SUM 1 2 + 3", ['logo["show"](logo["sum"](1, (2) + (3)));']],
    // procedureCallExpression
    [
        "show sum difference 1 2 3",
        ['logo["show"](logo["sum"](logo["difference"](1, 2), 3));'],
    ],
    // parensExpression
    ["show (1+2)*3", ['logo["show"]((((1) + (2))) * (3));']],
    // arrayExpression
    // listExpression
    ["show [a b[c]  d]", ['logo["show"](["a", "b", ["c"], "d"]);']],
    // wordExpression
    ["show [  word	]", ['logo["show"](["word"]);']],
    // quotedWordExpression
    ['show "word', ['logo["show"]("word");']],
    // numberExpression
    ["show 1", ['logo["show"](1);']],
    // variableExpression
    // nameExpression
    // multiplyExpression
    ["show 1* 2", ['logo["show"]((1) * (2));']],
    // divideExpression
    ["show 1/2", ['logo["show"]((1) / (2));']],
    // additionExpression
    ["show 1+2", ['logo["show"]((1) + (2));']],
    // subtractionExpression
    ["show 1-2", ['logo["show"]((1) - (2));']],
    // lessThanExpression
    ["show 1<2", ['logo["show"]((1) < (2));']],
    // greaterThanExpression
    ["show 1>2", ['logo["show"]((1) > (2));']],
    // lessThanEqualsExpression
    ["show 1<=2", ['logo["show"]((1) <= (2));']],
    // greaterThanEqualsExpression
    ["show 1>=2", ['logo["show"]((1) >= (2));']],
    // equalsExpression
    ["show 1=2", ['logo["show"]((1) == (2));']],
    // notEqualsExpressionExpression
    ["show 1<>2", ['logo["show"]((1) != (2));']],

    /*
        Special primitive procedure
        ===========================
    */
    // REPEAT num instructionlist
    ["repeat 4 [forward 90 right 90]", ['for (let i = 0; i < 4; i++) { logo["forward"](90);\nlogo["right"](90); }']]
])("parse(%s) -> %s", (logo, js) => {
    expect(parse(logo)).toStrictEqual(js);
});
