/**
 * SZPH Logo Primitívy — recreated from brand identity
 * 1. Ball — plný kruh (lopta)
 * 2. Stick — hokejka (SVG, J-tvar s round caps)
 * 3. Trail — moving gulička (kapsula s gradient stopou)
 */

const NAVY = "#0A2472";
const RED = "#EE1C25";

/* ── 1. Ball ── */
function Ball({ size = 40, color = NAVY, opacity = 0.06, className = "" }: {
  size?: number; color?: string; opacity?: number; className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full ${className}`}
      style={{ width: size, height: size, background: color, opacity }}
    />
  );
}

/* ── 2. Stick (SVG) ── */
function Stick({ color = NAVY, width = 120, height = 240, strokeWidth = 26, rotate = 0, opacity = 0.06, className = "" }: {
  color?: string; width?: number; height?: number; strokeWidth?: number; rotate?: number; opacity?: number; className?: string;
}) {
  return (
    <svg
      className={`absolute ${className}`}
      width={width}
      height={height}
      viewBox="0 0 120 240"
      style={{ opacity, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      fill="none"
    >
      <path
        d="M 90 20 V 150 a 60 60 0 0 1 -60 60"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── 3. Trail (moving ball) ── */
function Trail({ color = RED, length = 160, thickness = 40, angle = 0, opacity = 0.06, className = "" }: {
  color?: string; length?: number; thickness?: number; angle?: number; opacity?: number; className?: string;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: length,
        height: thickness,
        borderRadius: 999,
        opacity,
        transform: angle ? `rotate(${angle}deg)` : undefined,
        background: `linear-gradient(90deg, transparent 0%, transparent 8%, ${color} 100%)`,
      }}
    />
  );
}

/* ── Compositions ── */

interface DecoProps {
  variant?: "light" | "dark";
  className?: string;
}

/** Full deco — hokejky + guličky + trail */
export function SzphDecoElements({ variant = "light", className = "" }: DecoProps) {
  const o = variant === "dark" ? 0.04 : 0.05;
  const oFaint = variant === "dark" ? 0.025 : 0.035;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Hokejka navy — vľavo, diagonálna */}
      <Stick color={NAVY} rotate={35} opacity={o} className="left-[-2%] top-[5%]" width={100} height={200} strokeWidth={22} />

      {/* Hokejka červená — vpravo */}
      <Stick color={RED} rotate={0} opacity={oFaint} className="right-[3%] top-[15%]" width={80} height={180} strokeWidth={18} />

      {/* Trail navy — horizontálna */}
      <Trail color={NAVY} length={140} thickness={28} angle={0} opacity={oFaint} className="left-[10%] bottom-[20%]" />

      {/* Trail červená — vertikálna */}
      <Trail color={RED} length={120} thickness={24} angle={-90} opacity={oFaint} className="right-[12%] top-[8%]" />

      {/* Guličky */}
      <Ball size={32} color={NAVY} opacity={o} className="left-[6%] top-[30%]" />
      <Ball size={18} color={RED} opacity={o} className="right-[8%] top-[60%]" />
      <Ball size={24} color={NAVY} opacity={oFaint} className="left-[20%] bottom-[12%]" />
      <Ball size={14} color={RED} opacity={o} className="right-[25%] bottom-[25%]" />
    </div>
  );
}

/** Minimal — len guličky + trail */
export function SzphDecoDots({ variant = "light", className = "" }: DecoProps) {
  const o = variant === "dark" ? 0.03 : 0.04;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <Ball size={36} color={NAVY} opacity={o} className="left-[4%] top-[18%]" />
      <Ball size={16} color={RED} opacity={o} className="right-[8%] top-[25%]" />
      <Ball size={28} color={NAVY} opacity={o} className="right-[12%] bottom-[12%]" />
      <Ball size={12} color={RED} opacity={o} className="left-[18%] bottom-[30%]" />
      <Trail color={NAVY} length={100} thickness={20} angle={15} opacity={o * 0.7} className="right-[5%] top-[10%]" />
    </div>
  );
}
