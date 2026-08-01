type ToriiIconProps = {
  className?: string;
  color?: string;
};

/**
 * The Moézia Associados torii-gate mark, redrawn as a crisp vector based on
 * the brand reference sheet (fluted columns, curved kasagi beam, ground
 * arc). Shared by the stacked and horizontal logo lockups and by the
 * favicon (src/app/icon.svg uses the same paths).
 */
export default function ToriiIcon({ className, color = "#a3282f" }: ToriiIconProps) {
  return (
    <svg viewBox="0 0 220 170" className={className} aria-hidden="true">
      {/* kasagi - curved top beam */}
      <path
        d="M15,55 Q110,6 205,55 L205,75 Q110,34 15,75 Z"
        fill={color}
      />
      {/* nuki - straight beam below the roof */}
      <rect x="35" y="85" width="150" height="12" rx="2" fill={color} />

      {/* three fluted columns with capitals and bases */}
      {[58, 110, 162].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="101" rx="12" ry="6" fill={color} />
          <rect x={cx - 7} y="101" width="14" height="50" fill={color} />
          <path
            d={`M${cx - 12},151 L${cx + 12},151 L${cx + 9},160 L${cx - 9},160 Z`}
            fill={color}
          />
        </g>
      ))}

      {/* ground arc */}
      <path
        d="M8,158 Q110,128 212,158"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
