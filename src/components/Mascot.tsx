import { useId } from "react";

export default function Mascot({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 80 96" className={className} aria-hidden>
      <defs>
        <linearGradient id={`cap${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#9a7424" />
          <stop offset="0.5" stopColor="#f3dc96" />
          <stop offset="1" stopColor="#9a7424" />
        </linearGradient>
        <linearGradient id={`body${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4d6" />
          <stop offset="1" stopColor="#e9c872" />
        </linearGradient>
      </defs>

      <ellipse cx="40" cy="92" rx="22" ry="3" fill="#000" opacity="0.25" />

      {/* cap + neck */}
      <rect x="27" y="4" width="26" height="17" rx="5" fill={`url(#cap${id})`} />
      <rect x="31" y="7" width="18" height="3" rx="1.5" fill="#fff" opacity="0.35" />
      <rect x="34" y="21" width="12" height="9" fill="#b8923a" />

      {/* body */}
      <rect x="8" y="29" width="64" height="60" rx="20" fill={`url(#body${id})`} stroke="#b8923a" strokeWidth="2" />
      <rect x="14" y="38" width="5" height="22" rx="2.5" fill="#fff" opacity="0.55" />

      {/* eyes (blink) */}
      <g className="mascot-eye">
        <ellipse cx="29" cy="58" rx="5" ry="6.5" fill="#2a1a0a" />
        <ellipse cx="51" cy="58" rx="5" ry="6.5" fill="#2a1a0a" />
        <circle cx="30.8" cy="55.5" r="1.9" fill="#fff" />
        <circle cx="52.8" cy="55.5" r="1.9" fill="#fff" />
      </g>

      {/* cheeks + smile */}
      <circle cx="19" cy="68" r="4.5" fill="#ff8fa3" opacity="0.55" />
      <circle cx="61" cy="68" r="4.5" fill="#ff8fa3" opacity="0.55" />
      <path d="M34 70 Q40 77 46 70" stroke="#2a1a0a" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* sparkle */}
      <path className="mascot-spark" d="M69 10 l2.2 5.4 5.4 2.2 -5.4 2.2 -2.2 5.4 -2.2 -5.4 -5.4 -2.2 5.4 -2.2z" fill="#f3dc96" />
    </svg>
  );
}