import UCBLogoLexer from "./UCBLogoLexer.js";
import UCBLogoListener from "./UCBLogoListener.js";
import UCBLogoParser from "./UCBLogoParser.js";
import antlr4 from "antlr4";

class ProcedureResolver extends UCBLogoListener {
    constructor() {
        super();
        this.instructions = [];
    }

    specialPrimProcToJs = {
        /* CONTROL STRUCTURES */
        repeat(ctx) {
            let num, instructionList;
            [{ js: num }, { rawLogo: instructionList }] = ctx.expression();
            const logoJs = parse(instructionList);
            return `for (let i = 0; i < ${num}; i++) { ${logoJs.join("\n")} }`;
        },
    };
    defaultPrimProcToJs = {
        get(obj, functionName) {
            return functionName in obj
                ? obj[functionName]
                : (ctx) => {
                      let argsJs = ctx.expression().map((e) => e.js);
                      /* Semicolon will be added and return as it's clear here
                         whether a semicolon could be added or not. It's up to
                         the parser context to decide if semicolon should be
                         removed. */
                      return `logo["${functionName}"](${argsJs.join(", ")});`;
                  };
        },
    };
    primProcToJs = new Proxy(
        this.specialPrimProcToJs,
        this.defaultPrimProcToJs
    );

    exitProcedureCallExtraInputInstruction(ctx) {
        this.instructions.push(ctx.procedure_call_extra_input().js);
    }

    exitProcedureCallInstruction(ctx) {
        this.instructions.push(ctx.procedure_call().js);
    }

    exitProcedure_call_extra_input(ctx) {
        // UCBLogo: Names of procedures, variables, and property lists are case-insensitive.
        ctx.js = this.primProcToJs[ctx.NAME().getText().toLowerCase()](ctx);
    }

    exitProcedure_call(ctx) {
        // UCBLogo: Names of procedures, variables, and property lists are case-insensitive.
        ctx.js = this.primProcToJs[ctx.NAME().getText().toLowerCase()](
            ctx.expressions()
        );
    }

    exitUnaryMinusExpression(ctx) {
        ctx.js = `-(${ctx.expression(0).js})`;
    }

    exitProcedureCallExtraInput(ctx) {
        /* Since this is part of an expression, trailing semicolon should be
           removed if exists. */
        ctx.js = ctx.procedure_call_extra_input().js.replace(/;$/, "");
    }

    exitProcedureCallExpression(ctx) {
        /* Since this is part of an expression, trailing semicolon should be
           removed if exists. */
           ctx.js = ctx.procedure_call().js.replace(/;$/, "");
    }

    exitParensExpression(ctx) {
        ctx.js = `(${ctx.expression(0).js})`;
    }

    exitListExpression(ctx) {
        ctx.js = ctx.children[0].js;
        /* Note, however, that the Logo primitives that interpret such a list
         as a Logo instruction or expression (RUN, IF, etc.) reparse the list
         as if it had not been typed inside brackets. */
        ctx.rawLogo = ctx.start
            .getInputStream()
            .getText(ctx.start.start, ctx.stop.stop)
            .slice(1, -1);
    }
    exitList_(ctx) {
        ctx.js = `[${ctx.children
            .slice(1, -1)
            .map((child) => (child.list_ ? child.js : `"${child.getText()}"`))
            .join(", ")}]`;
    }

    exitWordExpression(ctx) {
        ctx.js = `"${ctx.WORD().getText()}"`;
    }

    exitQuotedWordExpression(ctx) {
        ctx.js = `"${ctx.QUOTED_WORD().getText().slice(1)}"`;
    }

    exitNumberExpression(ctx) {
        ctx.js = ctx.NUMBER().getText();
    }

    exitMultiplyExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) * (${bJs})`;
    }

    exitDivideExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) / (${bJs})`;
    }

    exitAdditionExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) + (${bJs})`;
    }

    exitSubtractionExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) - (${bJs})`;
    }

    exitLessThanExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) < (${bJs})`;
    }

    exitGreaterThanExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) > (${bJs})`;
    }

    exitLessThanEqualsExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) <= (${bJs})`;
    }

    exitGreaterThanEqualsExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) >= (${bJs})`;
    }

    exitEqualsExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) == (${bJs})`;
    }

    exitNotEqualsExpressionExpression(ctx) {
        const [aJs, bJs] = Object.values(ctx.expression()).map((e) => e.js);
        ctx.js = `(${aJs}) != (${bJs})`;
    }
}

export default function parse(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new UCBLogoLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new UCBLogoParser(tokens);
    const tree = parser.ucblogo();

    const procedureResolver = new ProcedureResolver();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(procedureResolver, tree);
    return procedureResolver.instructions;
}
