interface IconProps {
  className?: string;
}

export function LogoIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 32 32" fill="none">
      <path d="M6 6h18l-7 7h7L8 26H6l7-7H6l7-7H6V6Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function GlobeIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 12h17M12 3c2.2 2.5 3.3 5.5 3.3 9S14.2 18.5 12 21c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SettingsIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path d="m9.7 3 .5-1h3.6l.5 1 .4 1.1 1.1.5 1.1-.4 2.5 2.5-.4 1.1.5 1.1 1.1.4 1 .5v3.6l-1 .5-1.1.4-.5 1.1.4 1.1-2.5 2.5-1.1-.4-1.1.5-.4 1.1-.5 1h-3.6l-.5-1-.4-1.1-1.1-.5-1.1.4-2.5-2.5.4-1.1-.5-1.1-1.1-.4-1-.5V11l1-.5 1.1-.4.5-1.1-.4-1.1 2.5-2.5 1.1.4 1.1-.5L9.7 3Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function TrashIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path d="M5 7h14M10 4h4l1 3H9l1-3ZM7 7l.8 13h8.4L17 7M10 10v7M14 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
