<script lang="ts">
	import Matrix from '@/components/Matrix.svelte'
	import SizeAdjustButtons from '@/components/SizeAdjustButtons.svelte'
	import SolutionPanel from '@/components/SolutionPanel.svelte'
	import Window from '@/components/Window.svelte'

	import initSolver, { solve } from './solver'

	let equationCount = 3
	let errorMessage = ''

	const MIN_EQUATION_COUNT = 2
	const MAX_EQUATION_COUNT = 15

	let coefficients: (number | undefined)[][]
	let constants: (number | undefined)[]
	let solution: (number | undefined)[]

	$: coefficients = Array(equationCount)
		.fill(0)
		.map(() => Array(equationCount).fill(undefined))

	$: constants = Array(equationCount).fill(undefined)

	$: solution = Array(equationCount).fill(undefined)

	const calculate = async () => {
		errorMessage = ''

		await initSolver()

		for (let i = 0; i < coefficients.length; i++) {
			for (let j = 0; j < coefficients[i].length; j++) {
				if (coefficients[i][j] === undefined) coefficients[i][j] = 0
			}
		}

		for (let i = 0; i < constants.length; i++) {
			if (constants[i] === undefined) constants[i] = 0
		}

		try {
			solution = solve(coefficients as number[][], constants as number[])
		} catch (error) {
			if (error instanceof Error) errorMessage = error.message
		}
	}
</script>

<main>
	<div class="wrapper">
		<header>
			<h1>System of Linear Equations Solver</h1>
		</header>
		<Window>
			<span slot="title">Linear Equation Solver.exe</span>

			<span slot="control-button-group">
				<span class="control-button">
					<span class="material-symbols-outlined">close</span>
				</span>
			</span>

			<div class="window-body">
				<p>Insert equations here</p>
				<br />
				<form
					on:submit|preventDefault={calculate}
					on:reset={() => {
						errorMessage = ''
					}}
				>
					<SizeAdjustButtons
						bind:value={equationCount}
						min={MIN_EQUATION_COUNT}
						max={MAX_EQUATION_COUNT}
					/>
					<Matrix size={equationCount} bind:coefficients bind:constants />
					<SolutionPanel {solution} />
					<div class="submit">
						<small class="error-message">{errorMessage}</small>
						<input type="reset" value="Clear" />
						<input type="submit" value="Calculate" />
					</div>
				</form>
			</div>
		</Window>
		<a
			class="github-link"
			href="https://github.com/iBlueDust/linear-equations-solver"
		>
			<img class="github-icon" src="./github-icon.svg" alt="See GitHub Repo" />
		</a>
	</div>
</main>

<style lang="scss">
	@import '@/constants.scss';

	// TODO: Responsive design

	:global(body) {
		min-width: fit-content;
		background-color: rgb(233, 215, 52);
	}

	main {
		display: grid;
		padding: $large-padding;
		min-width: fit-content;
		min-height: 100vh;

		justify-content: center;
		align-items: center;

		.wrapper {
			width: fit-content;
			min-width: 600px;
		}

		header {
			margin-bottom: $large-padding;
			color: black;
			text-shadow: 2px 2px 0px white;
			font-family: 'Unbounded', sans-serif;
		}

		.control-button {
			background-color: red;
			color: white;
		}

		.window-body {
			padding: 16px;

			form {
				display: grid;
				align-items: center;
				gap: 16px;
				grid-auto-rows: auto;
				grid-template-columns: auto 1fr auto;
				grid-template-areas:
					'size matrix solution'
					'submit submit submit';

				.submit {
					width: 100%;
					text-align: right;
					grid-area: submit;

					display: flex;
					flex-flow: row nowrap;

					:not(:last-child) {
						margin-right: 16px;
					}

					.error-message {
						flex-grow: 1;
						flex-shrink: 1;
						align-self: center;

						color: red;
						display: inline-block;
						padding-bottom: $small-shadow-size;
					}

					button,
					input[type='submit'],
					input[type='reset'] {
						padding: 8px 16px;
						align-self: flex-end;
					}
				}
			}
		}
	}

	a.github-link {
		display: grid;
		justify-content: center;
		align-items: center;

		margin-top: $padding;
		width: 32px;
		height: 32px;

		border: 0 solid rgba(0, 0, 0, 0);
		border-radius: $small-border-radius;

		transition: border $transition;

		&:focus,
		&:hover {
			border: 1px solid rgba(0, 0, 0, 1);

			.github-icon {
				opacity: 100%;
			}
		}
	}

	.github-icon {
		display: block;
		object-fit: contain;
		width: 24px;
		height: 24px;
		margin: auto;
		opacity: 75%;

		transition: opacity $transition;
	}
</style>
