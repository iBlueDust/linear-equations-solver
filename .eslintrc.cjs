module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['svelte3', '@typescript-eslint'],
	rules: {
		semi: [2, 'never'],
		'max-len': [1, { code: 80, comments: 80, ignoreUrls: true }],
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: 'if', next: 'block-like' },
			{ blankLine: 'always', prev: 'while', next: 'block-like' },
			{ blankLine: 'always', prev: 'for', next: 'block-like' }
		]
	},
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
}
