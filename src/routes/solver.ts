/**
 * READ EMSCRIPTEN DOCS:
 * https://emscripten.org/docs/api_reference/module.html
 */

declare type UnknownFunction = (...args: unknown[]) => unknown

// https://emscripten.org/docs/api_reference/preamble.js.html#ccall
export type EmscriptenTypeString = 'number' | 'string' | 'array' | 'boolean'
export type EmscriptenType = number | string | Int8Array | Uint8Array

export type EmscriptenCcallFunction = (
	identifier: string,
	returnType: EmscriptenTypeString | null,
	argTypes: EmscriptenTypeString[],
	args: EmscriptenType[]
) => EmscriptenType | null
export type EmscriptenCwrapFunction = (
	identifier: string,
	returnType: EmscriptenTypeString | null,
	argTypes: EmscriptenTypeString[]
) => (...args: EmscriptenType[]) => EmscriptenType | null

export const Module = {
	preRun: [],
	postRun: [],
	print: (...args: unknown[]) => console.log('[WASM]:', ...args),
	printErr: (...args: unknown[]) => console.error('[WASM]:', ...args),
	setStatus: function (...args: unknown[]) {
		this.print?.('setStatus,', ...args)
	},
	totalDependencies: 0,
	monitorRunDependencies: function (...args: unknown[]) {
		this.print?.('setStatus,', ...args)
	}
} as Partial<{
	preRun: UnknownFunction[]
	postRun: UnknownFunction[]
	print: UnknownFunction
	printErr: UnknownFunction
	canvas: HTMLCanvasElement
	setStatus: UnknownFunction
	totalDependencies: number
	monitorRunDependencies: UnknownFunction
	ccall: EmscriptenCcallFunction
	cwrap: EmscriptenCwrapFunction
	onRuntimeInitialized: () => void
}>

export let isInitialized = false
export default () =>
	new Promise<void>((resolve) => {
		if (isInitialized) {
			resolve()
			return
		}

		if (window.Module == null) window.Module = Module

		if (document.getElementById('wasm-solver-bootstrap-script')) return

		const script = document.createElement('script')
		script.id = 'wasm-solver-bootstrap-script'
		script.defer = true
		script.src = './solver.generated.js'
		script.onload = () => {
			Module.onRuntimeInitialized = resolve
			isInitialized = true
		}
		document.body.append(script)
	})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function requireInitialization<FunctionType extends (...args: any[]) => any>(
	func: FunctionType
) {
	return (...args: unknown[]) => {
		if (isInitialized)
			throw new Error(
				'Solver has not been initialized yet. Initialize by ' +
					'calling the default export (it is a function).'
			)

		func(...args)
	}
}

export const ping = requireInitialization(() =>
	window.Module.ccall('ping', null, [], [])
)

// TODO: Use Module._malloc to pass array data to WASM

// export const solve = requireInitialization(
// 	(coefficients: number[][], constants: number[]): number[] => {
// 		const size = coefficients.length
// 		if (
// 			constants.length !== size ||
// 			coefficients.some((row) => row.length !== size)
// 		)
// 			throw new Error(
// 				"'solve' requires coefficient to be a square matrix" +
// 					'that has the same length as constants\n'
// 			)

// 		window.Module.ccall(
// 			'solve',
// 			'number', // return type
// 			['number', 'number', 'number', 'number'], // argument types
// 			[coefficientsArray, constantsArray, size, solutionArray]
// 		)
//
// 		return Array.from(solutionArray)
// 	}
// )
