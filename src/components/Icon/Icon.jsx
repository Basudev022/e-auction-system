const paths = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),

  play: <polygon points="9,7 18,12 9,17" fill="currentColor" stroke="none" />,

  hammer: (
    <>
      <path d="m4 20 8-8M10 4l10 10M8 6l4-4 6 6-4 4Z" />
      <path d="M4 20h7" />
    </>
  ),

  menu: (
    <>
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="17" x2="19" y2="17" />
    </>
  ),
};

function Icon({ name, size = 20, strokeWidth = 1.8, className = "" }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.search}
    </svg>
  );
}

export default Icon;
