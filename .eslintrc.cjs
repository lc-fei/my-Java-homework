/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaVersion: 'latest'
  // },
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser' },
  rules: {
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
      }
    ]
  }
}
