import UCBLogoLexer from "./UCBLogoLexer.js";
import UCBLogoListener from "./UCBLogoListener.js";
import UCBLogoParser from "./UCBLogoParser.js";
import antlr4 from "antlr4";

class ProcedureResolver extends UCBLogoListener {
    constructor(turtle) {
        super();
        this.turtle = turtle || {};
    }

    exitUnaryMinusExpression(ctx) {
        ctx.value = -ctx.expression(0).value;
    }

    exitProcedure_call(ctx) {
        const args = Object.values(ctx.expressions().expression()).map((e) => e.value);
        const functionName = ctx.NAME().getText();
        if (typeof this.turtle[functionName] === "function") {
            this.turtle[functionName](args);
        } else {
            console.log(`Procedure "${functionName}" not yet implemented with`, args);
        }
    }

    exitParensExpression(ctx) {
        ctx.value = ctx.expression(0).value;
    }

    exitListExpression(ctx) {
        ctx.value = ctx.children[0].value
    }
    exitList_(ctx) {
        // repeat 4 [fd 90 [fd 90 rt 90] rt 90]
        ctx.value = ctx.children.slice(1, -1).map(
            (child) => child.list_ ? child.value : child.getText()
        )
    }

    exitWordExpression(ctx) {
        ctx.value = ctx.WORD().getText().slice(1);
    }

    exitQuotedWordExpression(ctx) {
        ctx.value = ctx.QUOTED_WORD().getText().slice(1);
    }

    exitNumberExpression(ctx) {
        ctx.value = parseFloat(ctx.NUMBER().getText());
    }

    exitMultiplyExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a * b;
    }

    exitDivideExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a / b;
    }

    exitAdditionExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a + b;
    }

    exitSubtractionExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a - b;
    }

    exitLessThanExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a < b;
    }

    exitGreaterThanExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a > b;
    }

    exitLessThanEqualsExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a <= b;
    }

    exitGreaterThanEqualsExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a >= b;
    }

    exitEqualsExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a == b;
    }

    exitNotEqualsExpressionExpression(ctx) {
        const [a, b] = Object.values(ctx.expression()).map((e) => e.value);
        ctx.value = a != b;
    }
}

export default function parse(input, turtle) {
    const chars = new antlr4.InputStream(input);
    const lexer = new UCBLogoLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new UCBLogoParser(tokens);
    const tree = parser.ucblogo();

    const procedureResolver = new ProcedureResolver(turtle);
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(procedureResolver, tree);
}
