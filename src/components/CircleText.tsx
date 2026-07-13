import clsx from "clsx";

type Props = {
  textColor?: string;
  backgroundColor?: string;
  className?: string;
};

export default function CircleText({
  textColor = "#B3111C",
  backgroundColor = "#FFFCFA",
  className,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 123 123"
      className={clsx("circle-text", className)}
      aria-labelledby="circle-text"
    >
      <title id="circle-text">One sip closer to the One Piece.</title>
      <path
        fill={backgroundColor}
        d="M122 61.5a61 61 0 11-122 0 61 61 0 01122 0z"
      ></path>
      <g className="origin-center animate-spin-slow">
        <path
          id="circle-text-path"
          fill="none"
          d="M61.5 16.5 a45 45 0 1 1 -0.01 0"
        ></path>
        <text
          fill={textColor}
          fontSize="12.5"
          fontWeight="800"
          letterSpacing="1.5"
        >
          <textPath href="#circle-text-path" startOffset="0">
            ONE SIP CLOSER TO THE ONE PIECE ★
          </textPath>
        </text>
      </g>
    </svg>
  );
}
