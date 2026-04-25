const base = {
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function PlayIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 3 L13 8 L4 13 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PauseIcon(props) {
  return (
    <svg {...base} {...props}>
      <line x1="5" y1="3" x2="5" y2="13" />
      <line x1="11" y1="3" x2="11" y2="13" />
    </svg>
  );
}

export function PrevIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M13 3 L5 8 L13 13 Z" fill="currentColor" stroke="none" />
      <line x1="3" y1="3" x2="3" y2="13" />
    </svg>
  );
}

export function NextIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 3 L11 8 L3 13 Z" fill="currentColor" stroke="none" />
      <line x1="13" y1="3" x2="13" y2="13" />
    </svg>
  );
}
