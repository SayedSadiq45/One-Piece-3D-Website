"use client";

import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** underlying element — "a" for links, "button" otherwise */
  as?: React.ElementType;
  color?: string;
  speed?: string;
} & React.HTMLAttributes<HTMLElement> &
  Record<string, unknown>;

/**
 * StarBorder — reactbits.dev-style button/link wrapped in two travelling
 * light trails that chase around the border.
 */
export default function StarBorder({
  children,
  className,
  as: Comp = "button",
  color = "#C9A227",
  speed = "5s",
  ...rest
}: Props) {
  return (
    <Comp className={clsx("rb-star-border", className)} {...rest}>
      <span
        className="rb-star-border__trail rb-star-border__trail--bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <span
        className="rb-star-border__trail rb-star-border__trail--top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <span className="rb-star-border__inner">{children}</span>
    </Comp>
  );
}
