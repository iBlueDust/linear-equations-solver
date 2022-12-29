<script lang="ts">
  const commonVariables = ['x', 'y', 'z']

  export let size = 3
</script>

<div class="matrix">
  <table>
    {#each Array(size) as _, i}
      <tr>
        {#each Array(size) as _, j}
          <td class="coefficient">
            <input
              type="number"
              name={`coefficient-${i}-${j}`}
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
          <input type="number" name={`constant-${i}`} />
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
      $padding: 8px;

      padding: $padding 0.5ex;
      white-space: nowrap;

      input {
        width: 32px;
      }
    }

    td.constant {
      padding-left: 1ex;
      background-color: rgba(0, 0, 0, 0.15);
    }

    tr {
      display: block;
      height: $row-height;
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
