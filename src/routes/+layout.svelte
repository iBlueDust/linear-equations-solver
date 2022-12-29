<!-- <script lang="ts">
    import type { LayoutData } from './$types';
    export let data: LayoutData;
</script> -->

<slot />

<style global lang="scss">
@import './reset.css';
	
input {
	border: 1px solid black;
	border-radius: 4px;
}

input[type=number] {
	appearance: textfield;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

button, input[type=button], input[type=submit], input[type=reset] {
	box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.25);
	border: 1px solid black;
	border-radius: 4px;
	cursor: pointer;
}

.material-symbols-outlined {
	user-select: none;
}
</style>