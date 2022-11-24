module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    "vue/setup-compiler-macros": true
  },
  parser: "vue-eslint-parser",
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
    API: "readonly"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  plugins: ["@typescript-eslint", "prettier", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.vue"],
      rules: {
        "no-undef": "off"
      }
    }
  ],
  rules: {
    "no-empty": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "off", //允许使用非空断言
    "vue/component-definition-name-casing": "off",
    "vue/multi-word-component-names": "off", //vue组件名称是否遵循大小小命令名
    // vue
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    // import
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],

        pathGroups: [
          {
            pattern: "vue",
            group: "external",
            position: "before"
          },
          {
            pattern: "@vue/**",
            group: "external",
            position: "before"
          },
          {
            pattern: "ant-design-vue",
            group: "internal"
          }
        ],
        pathGroupsExcludedImportTypes: ["type"]
      }
    ]
  }
};
