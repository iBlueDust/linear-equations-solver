<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let row = false
  export let column = false

  export let value: number

  const dispatch = createEventDispatcher<{
    change: { value: number }
    add: Event
    remove: Event
  }>()

  const onAdd = (event: Event) => dispatch('add', event)
  const onRemove = (event: Event) => dispatch('remove', event)

  const onChange = () => {
    // debugger
    dispatch('change', { value })
  }
</script>

<form
  class="size-adjust-buttons"
  class:row
  class:column
  on:submit|preventDefault={onChange}
>
  <button type="button" on:click={onRemove}>
    <span class="material-symbols-outlined">remove</span>
  </button>

  <input type="number" name="size-adjust" bind:value on:blur={onChange} />

  <button type="button" on:click={onAdd}>
    <span class="material-symbols-outlined">add</span>
  </button>
</form>

<style lang="scss">
  $size: 24px;

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

  input {
    width: $size;
  }
</style>
