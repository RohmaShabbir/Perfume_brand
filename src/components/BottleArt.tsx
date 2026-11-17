import { useId } from "react";

export default function BottleArt({ tone = "#7a4a14", className = "" }: { tone?: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 270" className={className} aria-hidden>
      <defs>
        <linearGradient id={`cap${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a6a22" />
          <stop offset="0.45" stopColor="#f0d58a" />
          <stop offset="1" stopColor="#8a6a22" />
        </linearGradient>
        <linearGradient id={`liq${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone} stopOpacity="0.75" />
          <stop offset="1" stopColor={tone} />
        </linearGradient>
        <linearGradient id={`glass${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="250" rx="70" ry="9" fill="#c9a24b" opacity="0.15" />
      <rect x="80" y="12" width="40" height="48" rx="3" fill={`url(#cap${id})`} />
      <rect x="91" y="60" width="18" height="16" fill="#b8923a" />
      <rect x="38" y="76" width="124" height="166" rx="12" fill={`url(#glass${id})`} stroke="#c9a24b" strokeOpacity="0.55" />
      <rect x="45" y="112" width="110" height="123" rx="7" fill={`url(#liq${id})`} />
      <rect x="52" y="84" width="7" height="148" rx="3" fill="#fff" opacity="0.13" />
      <rect x="82" y="150" width="36" height="46" rx="2" fill="none" stroke="#f0d58a" strokeOpacity="0.6" />
      <line x1="90" y1="168" x2="110" y2="168" stroke="#f0d58a" strokeOpacity="0.6" />
      <line x1="94" y1="176" x2="106" y2="176" stroke="#f0d58a" strokeOpacity="0.4" />
    </svg>
  );
}