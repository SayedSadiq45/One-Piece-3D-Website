import clsx from "clsx";

type Props = {
  className?: string;
};

/**
 * StrawHatMark — an original, stylized straw-hat Jolly Roger emblem for the
 * Grand Line Fizz brand (skull + crossbones under a straw hat). Pure SVG, so
 * it stays crisp at any size and needs no image asset.
 */
export function StrawHatMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Grand Line Fizz emblem"
      className={clsx("select-none", className)}
    >
      {/* crossbones */}
      <g stroke="#F0E4C2" strokeWidth="9" strokeLinecap="round">
        <line x1="30" y1="58" x2="90" y2="104" />
        <line x1="90" y1="58" x2="30" y2="104" />
      </g>
      <g fill="#F0E4C2">
        <circle cx="28" cy="55" r="7" />
        <circle cx="92" cy="55" r="7" />
        <circle cx="28" cy="107" r="7" />
        <circle cx="92" cy="107" r="7" />
      </g>

      {/* skull */}
      <ellipse cx="60" cy="68" rx="21" ry="20" fill="#F7EFD6" />
      <rect x="49" y="82" width="22" height="11" rx="4" fill="#F7EFD6" />
      <circle cx="51" cy="66" r="5.5" fill="#171009" />
      <circle cx="69" cy="66" r="5.5" fill="#171009" />
      <path d="M60 70 l-3.5 7 h7 z" fill="#171009" />

      {/* straw hat */}
      <ellipse cx="60" cy="47" rx="35" ry="9.5" fill="#DDA53A" />
      <path d="M39 47 Q60 16 81 47 Z" fill="#EDC160" />
      <rect x="41" y="41" width="38" height="7.5" rx="3.5" fill="#B3111C" />
    </svg>
  );
}
