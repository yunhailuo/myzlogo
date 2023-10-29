module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:json/recommended"
    ],
    ignorePatterns: ["**/*Lexer.js", "**/*Listener.js", "**/*Parser.js"],
    parserOptions: {
        ecmaVersion: "latest"
    },
    rules: {
        // override/add rules settings here, such as:
        quotes: ["error", "double", { "avoidEscape": true }],
        semi: ["error", "always"],
        "sort-imports": "error",
        "vue/no-unused-vars": "error"
    }
};
