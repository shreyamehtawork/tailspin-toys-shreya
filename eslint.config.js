import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";

export default [
  // Global ignores
  {
    ignores: ["dist/", "node_modules/", ".astro/", "db/migrations/"],
  },

  // Base JavaScript/TypeScript recommended rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Global settings for all files
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Allow unused variables prefixed with _ (common convention for intentional skips)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Keep TypeScript formatting consistent across source and test files.
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
    },
  },

  // Astro files
  ...eslintPluginAstro.configs.recommended,

  // TypeScript-specific overrides
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
];
