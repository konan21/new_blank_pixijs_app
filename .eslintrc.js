module.exports = {
	env: {
		browser: false,
		node: true,
		es6: true
	},
	extends: ["eslint:recommended", "prettier"],
	parserOptions: {
		ecmaVersion: 11
	},
	rules: {
		"curly": ["error", "all"],
		"no-unused-vars": "off",
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{"vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_"}
		],
		"linebreak-style": "off",
		"comma-dangle": "error",
		"complexity": "off",
		"constructor-super": "error",
		"eqeqeq": ["error", "always"],
		"guard-for-in": "off",
		"id-blacklist": [
			"error",
			"any",
			"Number",
			"number",
			"String",
			"string",
			"Boolean",
			"boolean",
			"Undefined",
			"undefined"
		],
		"id-match": "error",
		"import/order": ["error", {alphabetize: {order: "asc", caseInsensitive: true}}],
		"import/newline-after-import": "error",
		"jsdoc/check-alignment": "error",
		"jsdoc/check-indentation": "off",
		"jsdoc/newline-after-description": "off",
		"max-classes-per-file": "off",
		"max-len": [
			"error",
			{
				ignorePattern: "import",
				ignoreTrailingComments: true,
				ignoreComments: true,
				ignoreTemplateLiterals: true,
				ignoreStrings: true,
				code: 120
			}
		],
		"new-parens": "error",
		"no-bitwise": "off",
		"no-caller": "error",
		"no-cond-assign": "off",
		"no-debugger": "error",
		"no-empty": "off",
		"no-eval": "error",
		"no-fallthrough": "off",
		"no-invalid-this": "off",
		"no-new-wrappers": "error",
		"no-throw-literal": "error",
		"no-useless-escape": "off",
		"no-constant-condition": "off",
		"no-case-declarations": "off",
		"no-prototype-builtins": "off",
		"no-trailing-spaces": [
			"error",
			{
				skipBlankLines: true
			}
		],
		"no-undef-init": "error",
		"no-underscore-dangle": "off",
		"no-unsafe-finally": "error",
		"no-unused-labels": "error",
		"no-var": "error",
		"object-shorthand": "off",
		"prefer-arrow-callback": "error",
		"one-var": ["error", "never"],
		"prefer-const": "warn",
		"radix": "off",
		"space-in-parens": ["error", "never"],
		"spaced-comment": [
			"error",
			"always",
			{
				markers: ["/"]
			}
		],
		"use-isnan": "error",
		"valid-typeof": "error"
	},
	overrides: [
		{
			files: ["src/**/*.ts"],
			env: {
				browser: true,
				node: false
			},
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:import/errors",
				"plugin:import/warnings",
				"plugin:import/typescript",
				"prettier"
			],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.json"
			},
			plugins: ["eslint-plugin-jsdoc", "eslint-plugin-import", "@typescript-eslint", "unused-imports"],
			rules: {
				"curly": ["error", "all"],
				"no-console": "error",
				"@typescript-eslint/no-this-alias": "off",
				"@typescript-eslint/adjacent-overload-signatures": "error",
				"@typescript-eslint/array-type": [
					"error",
					{
						default: "generic"
					}
				],
				"@typescript-eslint/ban-types": [
					"error",
					{
						types: {
							Object: {
								message: "Avoid using the `Object` type. Did you mean `object`?"
							},
							Boolean: {
								message: "Avoid using the `Boolean` type. Did you mean `boolean`?"
							},
							Number: {
								message: "Avoid using the `Number` type. Did you mean `number`?"
							},
							String: {
								message: "Avoid using the `String` type. Did you mean `string`?"
							},
							Function: false,
							object: false
						}
					}
				],
				"@typescript-eslint/consistent-type-assertions": "error",
				"@typescript-eslint/consistent-type-definitions": "off",
				"@typescript-eslint/dot-notation": "off",
				"@typescript-eslint/unbound-method": "off",
				"@typescript-eslint/explicit-member-accessibility": [
					"error",
					{
						accessibility: "explicit",
						overrides: {
							constructors: "no-public"
						}
					}
				],
				"@typescript-eslint/no-unnecessary-type-assertion": "warn",
				"@typescript-eslint/member-ordering": [
					"error",
					{
						default: [
							"public-static-field",
							"public-instance-field",
							"private-static-field",
							"private-instance-field",
							"public-constructor",
							"private-constructor",
							"public-instance-method",
							"protected-instance-method",
							"private-instance-method"
						]
					}
				],
				"@typescript-eslint/naming-convention": [
					"error",
					{
						selector: "enumMember",
						format: ["UPPER_CASE"]
					}
				],
				"@typescript-eslint/no-empty-function": "off",
				"@typescript-eslint/no-empty-interface": "off",
				"@typescript-eslint/no-misused-new": "error",
				"@typescript-eslint/no-namespace": "off",
				"@typescript-eslint/no-parameter-properties": "off",
				"@typescript-eslint/ban-ts-comment": "off",
				"@typescript-eslint/ban-tslint-comment": "error",
				"@typescript-eslint/no-shadow": [
					"error",
					{
						hoist: "all"
					}
				],
				"@typescript-eslint/no-unused-expressions": "off",
				"@typescript-eslint/no-use-before-define": [
					"error",
					{
						functions: false
					}
				],
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/no-var-requires": "error",
				"@typescript-eslint/no-floating-promises": "off",
				"@typescript-eslint/prefer-for-of": "off",
				"@typescript-eslint/prefer-function-type": "error",
				"@typescript-eslint/prefer-namespace-keyword": "off",
				"@typescript-eslint/no-inferrable-types": "off",
				"@typescript-eslint/quotes": [
					"error",
					"double",
					{
						avoidEscape: true
					}
				],
				"@typescript-eslint/semi": ["error", "always"],
				"@typescript-eslint/triple-slash-reference": [
					"off",
					{
						path: "always",
						types: "prefer-import",
						lib: "always"
					}
				],
				"@typescript-eslint/restrict-plus-operands": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/type-annotation-spacing": "error",
				"@typescript-eslint/unified-signatures": "error",
				"@typescript-eslint/prefer-regexp-exec": "off",
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/restrict-template-expressions": [
					"error",
					{
						allowNumber: true,
						allowBoolean: true,
						allowAny: true,
						allowNullish: true
					}
				]
			}
		}
	]
};
