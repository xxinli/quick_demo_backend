module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "ignorePatterns": [
    "node_modules",
    "dist",
    "coverage"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "accessor-pairs": ["error"],
    "array-bracket-newline": ["error", "consistent"],
    "arrow-body-style": ["error", "as-needed"],
    "curly": ["error", "all"],
    "eqeqeq": ["error", "smart"],
    "function-call-argument-newline": ["off"],
    "function-paren-newline": ["error", "consistent"],
    "max-classes-per-file": ["error", 1],
    "no-cond-assign": ["error", "except-parens"],
    "no-console": ["error"],
    "no-eval": ["error"],
    "no-magic-numbers": ["off"],
    "no-multi-assign": ["error"],
    "no-multi-spaces": ["error"],
    "no-multiple-empty-lines": ["error"],
    "no-new-func": ["error"],
    "no-new-object": ["error"],
    "no-return-await": ["error"],
    "no-setter-return": ["error"],
    "no-tabs": ["error"],
    "no-throw-literal": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unneeded-ternary": ["error"],
    "no-unused-expressions": ["error"],
    "no-useless-catch": ["error"],
    "no-useless-return": ["error"],
    "no-var": ["error"],
    "one-var-declaration-per-line": ["error"],
    "prefer-const": ["error"],
    "prefer-destructuring": ["error", { "array": false, "object": true }],
    "prefer-regex-literals": ["error"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "sort-imports": ["error", {
      "ignoreCase": true,
      "ignoreDeclarationSort": true,
      "memberSyntaxSortOrder": ['all', 'single', 'multiple', 'none']
    }],
    "@typescript-eslint/ban-ts-comment": ["error"],
    "@typescript-eslint/naming-convention": ["error", {
      "selector": "variable",
      "format": ["camelCase", "PascalCase", "UPPER_CASE"]
    }],
    "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "always" }],
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "@typescript-eslint/no-empty-function": ["error"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-non-null-assertion": ["error"],
    "@typescript-eslint/no-unnecessary-condition": ["error"],
    "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true, "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/prefer-nullish-coalescing": ["error", { "forceSuggestionFixer": true }],
    "@typescript-eslint/prefer-optional-chain": ["error"],
    "@typescript-eslint/prefer-readonly": ["error"]
  }
};
