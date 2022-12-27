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
  main {
    display: grid;
    min-height: 100vh;
    padding: 8px;

    background-color: rgb(233, 215, 52);
    font-family: 'Lora', serif;

    justify-content: center;
    align-items: center;

    .wrapper {
      max-width: 600px;
    }

    header {
      margin: 16px 0;
      color: black;
      text-shadow: 2px 2px 0px white;
      font-family: 'Unbounded', sans-serif;
    }

    article.window {
      $border-radius: 8px;
      $border-width: 2px;

      margin: $border-width;
      outline: $border-width solid black;

      background-color: white;
      border-radius: $border-radius;

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
