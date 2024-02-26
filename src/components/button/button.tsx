import {
  component$,
  useStylesScoped$,
  Slot,
  PropFunction,
  $,
} from "@builder.io/qwik";

export interface ButtonProps {
  size?: "small" | "medium" | "large";
  onClick$?: PropFunction<(e: Event) => void>;
}
export const Button = component$<ButtonProps>(
  ({ size = "medium", onClick$ }) => {
    useStylesScoped$(`
    .size-small {
      font-size: 10px;
    }
    .size-medium {
      font-size: 14px;
    }
    .size-large {
      font-size: 18px;
    }
  `);
    return (
      <button
        class={{
          [`size-${size}`]: true,
        }}
        onClick$={onClick$}
      >
        <Slot />
      </button>
    );
  }
);
