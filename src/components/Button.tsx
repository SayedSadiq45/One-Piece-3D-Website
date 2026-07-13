import clsx from "clsx";

type Props = {
  href?: string;
  buttonText: string | null;
  className?: string;
};

export default function Button({ href = "#", buttonText, className }: Props) {
  return (
    <a
      href={href}
      className={clsx(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full",
        "bg-gradient-to-b from-[#F5E6B3] to-[#C9A227] px-8 py-4",
        "text-lg font-black uppercase tracking-wider text-[#0B0E14] md:text-xl",
        "ring-1 ring-[#F5E6B3]/60 shadow-[0_10px_30px_-6px_rgba(201,162,39,0.5)]",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-8px_rgba(201,162,39,0.65)] active:translate-y-0",
        className,
      )}
    >
      {/* sheen that sweeps across on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative">{buttonText}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="relative h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
