type IconName = "arrow-up-right" | "arrow-down" | "arrow-up" | "asterisk" | "clock" | "menu" | "close";

type IconProps = {
  name: IconName;
  className?: string;
};

// Inline SVGs keep every decorative icon identical across iOS, Android and desktop.
// Text characters such as ↗ and ✳ can otherwise be substituted with colorful emoji.
export default function Icon({ name, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`icon ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "arrow-up-right" && <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>}
      {name === "arrow-down" && <><path d="M12 5v14" /><path d="m5 12 7 7 7-7" /></>}
      {name === "arrow-up" && <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>}
      {name === "asterisk" && <><path d="M12 2v20M2 12h20" /><path d="m4.93 4.93 14.14 14.14M19.07 4.93 4.93 19.07" /></>}
      {name === "clock" && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}
      {name === "menu" && <><path d="M4 7h16M4 12h16M4 17h16" /></>}
      {name === "close" && <><path d="M6 6l12 12M18 6 6 18" /></>}
    </svg>
  );
}
