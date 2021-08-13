module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "./.eslintrc.js"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks", "deprecation"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": "warn",

    curly: ["error", "all"],
    "complexity": "error",
    "max-classes-per-file": "error",
    "max-lines": ["error", 300],
    "dot-notation": "warn",
    "no-template-curly-in-string": "error",
    "space-before-function-paren": "warn",
    "object-shorthand": "warn",

    "@typescript-eslint/explicit-member-accessibility": "error",
    "import/order": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": ["error"],

    "no-restricted-syntax": "error",
    "operator-assignment": "warn",
    "class-methods-use-this": "warn",
    "lines-between-class-members": "warn",
    "prefer-template": "warn",
    "@typescript-eslint/no-empty-function": "warn",
  },
};
