<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let row = false
  export let column = false

  const dispatch = createEventDispatcher<{
    add: Event
    remove: Event
  }>()
</script>

<div class="size-adjust-buttons" class:row class:column>
  <button on:click={(event) => dispatch('remove', event)}>
    <span class="material-symbols-outlined">remove</span>
  </button>
	<slot />
  <button on:click={(event) => dispatch('add', event)}>
    <span class="material-symbols-outlined">add</span>
  </button>
</div>

<style lang="scss">
  .size-adjust-buttons {
    display: inline-grid;
    gap: 16px;

    &.row {
      grid-template-columns: auto auto;
      grid-template-rows: auto;
    }
    &.column {
      grid-template-columns: auto;
      grid-template-rows: auto auto;
    }
  }

  button {
    $size: 24px;

    width: $size;
    height: $size;
    padding: 0;

    display: grid;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    .material-symbols-outlined {
      display: block;
      font-size: 1em;
      margin: auto;
    }
  }
</style>
