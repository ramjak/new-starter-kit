module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
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
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "jsx-boolean-value": "off",
    "prettier/prettier": "off",

    curly: "warn",
    "max-classes-per-file": "off",
    "max-lines": "off",
    "no-console": "off",
    "no-duplicate-case": "error",
    "no-redeclare": "error",
    "no-empty": "off",
    "no-empty-function": "off",
    "no-unused-expressions": ["error", {"allowTaggedTemplates": true, "allowShortCircuit": true}],
    "dot-notation": "off",
    "no-template-curly-in-string": "warn",
    "prefer-const": "warn",
    "space-before-function-paren": "off",
    "quote-props": "off",
    "object-shorthand": "off",
    "triple-equals": "off",

    "react/jsx-curly-spacing": "off",
    "react/jsx-equals-spacing": "off",
    "react/jsx-no-bind": ["warn", { ignoreRefs: true }],
    "react/self-closing-comp": "off",
    "react/jsx-space-before-closing": "off",
    "react/jsx-boolean-value": "off",

    "@typescript-eslint/array-type": "off",
    "arrow-body-style": "off",
    "@typescript-eslint/await-thenable": "error",
    "no-sequences": "error",
    "capitalized-comments": "off",
    "spaced-comment": "off",
    "deprecation/deprecation": "error",
    "no-new-func": "error",
    "@typescript-eslint/consistent-type-definitions": "warn",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/prefer-for-of": "off",
    "import/order": "off",
    "@typescript-eslint/prefer-readonly": "off",
    "@typescript-eslint/naming-convention": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],

    "@typescript-eslint/explicit-module-boundary": "off",
    "no-prototype-builtins": "off",
    "no-restricted-syntax": "off",
    "operator-assignment": "off",
    "class-methods-use-this": "off",
    "lines-between-class-members": "off",
    "prefer-template": "off",
    "react/destructuring-assignment": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["route"],
      }
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "consistent-return": "off",
    "react/jsx-props-no-spreading": "off",
    "no-plusplus": "warn",
    "@typescript-eslint/no-empty-function": "off",
  },
};
