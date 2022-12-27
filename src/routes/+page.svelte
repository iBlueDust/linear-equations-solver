<main>
  <div class="wrapper">
    <header>
      <h1>System of Linear Equations Solver</h1>
    </header>
    <article class="window">
      <section class="window-header">
        <span class="title">Linear Equation Solver.exe</span>
        <span class="control-button-group">
          <span class="material-symbols-outlined"> close </span>
        </span>
      </section>
      <section class="window-body">
        <span
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro odit
          quaerat suscipit debitis quas ex minus sint nihil non! Architecto,
          mollitia? Perspiciatis dolorem cupiditate pariatur numquam voluptatum
          praesentium nostrum eligendi!</span
        >
      </section>
    </article>
  </div>
</main>

<style lang="scss">
  main {
    display: grid;
    min-height: 100vh;
    background-color: rgb(233, 215, 52);
    font-family: 'Lora', serif;

    justify-content: center;
    align-items: center;
    .wrapper {
      max-width: 600px;
    }

    header {
      margin: 16px 0;
      color: white;
      text-shadow: 2px 2px 0px #000000;
      font-family: 'Unbounded', sans-serif;
    }

    article.window {
      $border-radius: 8px;
      $border-width: 2px;

      background-color: white;
      border: $border-width solid black;
      border-radius: $border-radius;

      section.window-header {
        display: flex;
        align-items: center;

        width: auto;
        height: 32px;

        background-color: #555;
        border-bottom: $border-width solid black;
        border-top-left-radius: calc($border-radius - $border-width);
        border-top-right-radius: calc($border-radius - $border-width);

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

          flex-grow: 0;
          flex-shrink: 0;

          background-color: red;
          color: white;
          border-left: $border-width solid black;
          border-top-right-radius: calc($border-radius - $border-width);

          & > * {
            margin: auto;
          }
        }
      }

      section.window-body {
        padding: 16px;
      }
    }
  }
</style>
