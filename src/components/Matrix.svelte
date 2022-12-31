<script lang="ts">
	const commonVariables = ['x', 'y', 'z']

	export let size = 3
	export let coefficients: (number | undefined)[][] | undefined = undefined
	export let constants: (number | undefined)[] | undefined = undefined

	const onCoefficientChange = (i: number, j: number, event: Event) => {
		if (!coefficients || !event.target) return

		const { value } = event.target as HTMLInputElement
		coefficients[i][j] = value === '' ? undefined : Number.parseFloat(value)
	}

	// TODO: Fix this misleading name
	const onConstantChange = (i: number, event: Event) => {
		if (!constants || !event.target) return

		const { value } = event.target as HTMLInputElement
		constants[i] = value === '' ? undefined : Number.parseFloat(value)
	}
</script>

<div class="matrix">
	<table>
		{#each Array(size) as _, i}
			<tr>
				{#each Array(size) as _, j}
					<td class="coefficient">
						<input
							type="decimal"
							name={`coefficient-${i}-${j}`}
							value={coefficients?.[i][j] ?? ''}
							on:change={(...args) => onCoefficientChange(i, j, ...args)}
						/><!--
						-->{#if size <= commonVariables.length}
							{commonVariables[j]}
						{:else}
							x<sub>{j + 1}</sub>
						{/if}

						{#if j < size - 1}
							+
						{/if}
					</td>
				{/each}

				<td class="constant">
					=
					<input
						type="decimal"
						name={`constant-${i}`}
						value={constants?.[i] ?? ''}
						on:change={(...args) => onConstantChange(i, ...args)}
					/>
				</td>
			</tr>
		{/each}
	</table>
</div>

<style lang="scss">
	@import '@/constants.scss';

	.matrix {
		text-align: center;

		display: grid;
		justify-content: center;
		align-items: center;
		grid-template-columns: auto auto;
		grid-template-rows: auto;
		gap: 32px;

		table {
			margin: auto;
		}

		td {
			padding: $padding 0.5ex;
			white-space: nowrap;

			input {
				width: 2.5em;
				text-align: right;
			}
		}

		td.constant {
			padding-left: 1ex;
			background-color: rgba(0, 0, 0, 0.15);

			input {
				text-align: left;
			}
		}

		tr {
			height: $row-height;
			display: block;
			overflow: hidden;
		}

		tr:first-child td.constant {
			border-top-left-radius: $small-border-radius;
			border-top-right-radius: $small-border-radius;
		}

		tr:last-child td.constant {
			border-bottom-left-radius: $small-border-radius;
			border-bottom-right-radius: $small-border-radius;
		}
	}
</style>
