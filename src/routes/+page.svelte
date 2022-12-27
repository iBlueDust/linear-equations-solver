<script lang="ts">
  import Matrix from '@/components/Matrix.svelte'
</script>

<main>
  <div class="wrapper">
    <header>
      <h1>System of Linear Equations Solver</h1>
    </header>
    <article class="window">
      <section class="window-header">
        <span class="title">Linear Equation Solver.exe</span>
        <span class="control-button-group">
          <span class="control-button">
            <span class="material-symbols-outlined">close</span>
          </span>
        </span>
      </section>
      <section class="window-body">
        <Matrix />
      </section>
    </article>
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

    font-family: 'Lora', serif;

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

    article.window {
      min-width: fit-content;
      margin: $border-width calc($border-width + $shadow-size)
        calc($border-width + $shadow-size) $border-width;
      outline: $border-width solid black;

      background-color: white;
      border-radius: $border-radius;
      box-shadow: $shadow-size $shadow-size 0px rgba(64, 24, 0, 0.5);

      section.window-header {
        $height: 32px;

        display: flex;
        align-items: center;

        width: auto;
        height: $height;

        background-color: #555;
        outline: $border-width solid black;
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;

        color: white;
        font-weight: 700;

        .title {
          padding: 0 16px;
          flex-grow: 1;
          flex-shrink: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .control-button-group {
          display: grid;
          justify-content: center;
          align-items: center;

          width: 32px;
          height: 32px;

          border-top-right-radius: calc($border-radius - $border-width);

          .control-button {
            width: 32px;
            height: 32px;

            display: flex;
            justify-content: center;
            align-items: center;

            background-color: red;
            overflow: hidden;
            color: white;
            border-left: $border-width solid black;

            &:last-child {
              border-top-right-radius: calc($border-radius - $border-width);
            }
          }
        }
      }

      section.window-body {
        padding: 16px;
      }
    }
  }
</style>
