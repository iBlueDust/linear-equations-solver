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

export interface Module {
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
	_malloc: (size: number) => number
	_free: (size: number) => void

	HEAP8: Int8Array
	HEAP16: Int16Array
	HEAP32: Int32Array
	HEAPU8: Uint8Array
	HEAPU16: Uint16Array
	HEAPU32: Uint32Array
	HEAPF32: Float32Array
	HEAPF64: Float64Array
}

export const Module: Module = {
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Partial<Module> as any

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
function requireInitialization<FunctionType extends { (...args: any[]): any }>(
	func: FunctionType
): FunctionType {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return ((...args: any[]) => {
		if (!isInitialized)
			throw new Error(
				'Solver has not been initialized yet. Initialize by ' +
				'calling the default export (it is a function).'
			)

		return func(...args)
	}) as FunctionType
}

export const ping = requireInitialization(() =>
	window.Module.ccall('ping', 'number', [], [])
)

// TODO: Use Module._malloc to pass array data to WASM

export const solve = requireInitialization(
	(coefficients: number[][], constants: number[]): number[] => {
		const size = coefficients.length
		if (
			constants.length !== size ||
			coefficients.some((row) => row.length !== size)
		)
			throw new Error(
				"'solve' requires coefficient to be a square matrix" +
				'that has the same length as constants\n'
			)

		const FLOAT64_SIZE = Float64Array.BYTES_PER_ELEMENT

		const coefficientsArray = new Uint8Array(
			new Float64Array(coefficients.flat()).buffer
		)
		const coefficientsPointer = Module._malloc(size * size * FLOAT64_SIZE)
		Module.HEAPU8.set(coefficientsArray, coefficientsPointer)

		const constantsArray = new Uint8Array(
			new Float64Array(constants).buffer
		)
		const constantsPointer = Module._malloc(size * FLOAT64_SIZE)
		Module.HEAPU8.set(constantsArray, constantsPointer)

		const solutionPointer = Module._malloc(size * FLOAT64_SIZE)

		const returnValue: boolean = window.Module.ccall(
			// function name
			'solve',
			// return type
			'bool',
			// argument types (pointers are numbers)
			['number', 'number', 'number', 'number'],
			// arguments
			[coefficientsPointer, constantsPointer, size, solutionPointer]
		)

		if (!returnValue)
			throw new Error(
				'System of equations are inconsistent or cross-dependent'
			)

		const solutionBuffer = Module.HEAPU8.buffer.slice(
			solutionPointer,
			solutionPointer + size * FLOAT64_SIZE
		)
		const solutionArray = new Float64Array(solutionBuffer)
		const solution = Array.from(solutionArray)

		Module._free(coefficientsPointer)
		Module._free(constantsPointer)
		Module._free(solutionPointer)

		return solution
	}
)
