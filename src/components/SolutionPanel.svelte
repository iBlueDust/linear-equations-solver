<script lang="ts">
	export let solution: number[]

	const commonVariables = ['x', 'y', 'z']

	const format = (x: number) =>
		x == null ? '…' : x.toLocaleString('en-US', { maximumFractionDigits: 3 })
</script>

<table class="solution-panel">
	{#if solution.length <= commonVariables.length}
		{#each solution as value, i}
			<tr>
				<td>{commonVariables[i]}</td>
				<td>=</td>
				<td>{format(value)}</td>
			</tr>
		{/each}
	{:else}
		{#each solution as value, i}
			<tr>
				<td>
					x<sub>{i + 1}</sub>
				</td>
				<td>=</td>
				<td>{format(value)}</td>
			</tr>
		{/each}
	{/if}
</table>

<style lang="scss">
	@import '@/constants.scss';

	.solution-panel {
		display: block;
		width: 8em;
		background: rgb(116, 221, 90);
		border: $border-width solid black;
		border-radius: $small-border-radius;
		box-shadow: $small-shadow-size $small-shadow-size 0 rgba(36, 53, 32, 0.521);

		tr {
			height: $row-height;
		}

		td {
			vertical-align: middle;
		}

		td:first-child {
			padding-left: $padding;
		}

		td:nth-child(2) {
			padding: 0 4px;
		}

		td:last-child {
			padding-right: $padding;
			width: 100%;
		}
	}
</style>
