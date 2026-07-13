import clsx from "clsx";

type Props = {
  className?: string;
};

/**
 * Text-based brand mark. Swap for your own SVG/PNG logo if you have one —
 * IMAGE PLACEHOLDER (optional): /public/images/logo.png
 */
export function GrandLineLogo({ className }: Props) {
  return (
    <span
      className={clsx(
        "select-none text-center font-black uppercase leading-none tracking-tight",
        className,
      )}
      aria-label="Grand Line Fizz"
    >
      <span className="block text-3xl md:text-4xl">Grand Line</span>
      <span className="block text-xl tracking-[0.5em] md:text-2xl">Fizz</span>
    </span>
  );
}
