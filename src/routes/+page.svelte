<script lang="ts">
	import Matrix from '@/components/Matrix.svelte'
	import SizeAdjustButtons from '@/components/SizeAdjustButtons.svelte'
	import SolutionPanel from '@/components/SolutionPanel.svelte'
	import Window from '@/components/Window.svelte'

	import initSolver, { ping } from './solver'

	let equationCount = 3
	let errorMessage = ''

	const MIN_EQUATION_COUNT = 2
	const MAX_EQUATION_COUNT = 15

	let coefficients: (number | undefined)[][]
	let constants: (number | undefined)[]

	$: coefficients = Array(equationCount)
		.fill(0)
		.map(() => Array(equationCount).fill(undefined))

	$: constants = Array(equationCount).fill(undefined)

	const calculate = async () => {
		if (window.Module == null) await initSolver().then(ping)
		else ping()
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
				<form on:submit|preventDefault={calculate}>
					<SizeAdjustButtons
						bind:value={equationCount}
						min={MIN_EQUATION_COUNT}
						max={MAX_EQUATION_COUNT}
					/>
					<Matrix size={equationCount} bind:coefficients bind:constants />
					<SolutionPanel solution={Array(equationCount).fill(null)} />
					<div class="submit">
						<span class="error-message">{errorMessage}</span>
						<input type="reset" value="Clear" />
						<input type="submit" value="Calculate" />
					</div>
				</form>
			</div>
		</Window>
	</div>
</main>

<style lang="scss">
	@import '@/constants.scss';

	:global(body) {
		min-width: fit-content;
		background-color: rgb(233, 215, 52);
	}

	main {
		display: grid;
		padding: 8px;
		min-width: fit-content;
		min-height: 100vh;

		justify-content: center;
		align-items: center;

		.wrapper {
			max-width: 600px;
			min-width: fit-content;
		}

		header {
			margin: 16px 0;
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
				justify-content: center;
				align-items: flex-end;
				gap: 16px;
				grid-auto-rows: auto;
				grid-template-columns: auto 1fr auto;
				grid-template-areas:
					'size matrix solution'
					'submit submit submit';

				.error-message {
					color: red;
				}

				.submit {
					width: 100%;
					text-align: right;
					grid-area: submit;

					button,
					input[type='submit'],
					input[type='reset'] {
						padding: 8px 16px;
					}
				}
			}
		}
	}
</style>
