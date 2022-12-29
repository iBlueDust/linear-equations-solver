<article class="window">
  <section class="window-header">
    <span class="title">
      <slot name="title" />
    </span>
    <span class="control-button-group">
      <slot name="control-button-group" />
    </span>
  </section>
  <section class="window-body">
    <slot />
  </section>
</article>

<style lang="scss">
  @import '@/constants.scss';

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

          overflow: hidden;
          border-left: $border-width solid black;

          &:last-child {
            border-top-right-radius: calc($border-radius - $border-width);
          }
        }
      }
    }
  }
</style>
