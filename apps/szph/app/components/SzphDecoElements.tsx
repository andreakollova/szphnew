/**
 * Dekoratívne elementy inšpirované SZPH logom
 * Hokejky (modré/červené) s gradientom + bodky
 */

interface DecoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function SzphDecoElements({ variant = "light", className = "" }: DecoProps) {
  const navy = variant === "dark" ? "rgba(255,255,255,0.06)" : "rgba(5,25,55,0.06)";
  const red = variant === "dark" ? "rgba(200,16,46,0.08)" : "rgba(200,16,46,0.06)";
  const navyDot = variant === "dark" ? "rgba(255,255,255,0.04)" : "rgba(5,25,55,0.04)";
  const redDot = variant === "dark" ? "rgba(200,16,46,0.06)" : "rgba(200,16,46,0.04)";

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Hokejka 1 — modrá, vľavo */}
      <svg className="absolute" style={{ left: "-2%", top: "10%", width: "180px", height: "400px", opacity: 0.7 }} viewBox="0 0 80 200" fill="none">
        <defs>
          <linearGradient id="stick1" x1="40" y1="0" x2="40" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={navy} stopOpacity="0" />
            <stop offset="40%" stopColor={navy} stopOpacity="1" />
            <stop offset="100%" stopColor={navy} stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="30" y="0" width="16" height="160" rx="8" fill="url(#stick1)" />
        <path d="M30 160 L30 180 Q30 195 45 195 L55 195" stroke="none" fill={navy} />
        <rect x="30" y="155" width="16" height="30" rx="0" fill={navy} />
        <rect x="38" y="178" width="30" height="16" rx="8" fill={navy} />
      </svg>

      {/* Hokejka 2 — červená, vpravo */}
      <svg className="absolute" style={{ right: "5%", top: "20%", width: "160px", height: "350px", opacity: 0.6 }} viewBox="0 0 80 200" fill="none">
        <defs>
          <linearGradient id="stick2" x1="40" y1="0" x2="40" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={red} stopOpacity="0.3" />
            <stop offset="50%" stopColor={red} stopOpacity="1" />
            <stop offset="100%" stopColor={red} stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="32" y="10" width="14" height="150" rx="7" fill="url(#stick2)" />
        <path d="M32 155 L32 175 Q32 190 18 190 L10 190" stroke="none" fill={red} />
        <rect x="32" y="150" width="14" height="28" rx="0" fill={red} />
        <rect x="5" y="173" width="35" height="14" rx="7" fill={red} />
      </svg>

      {/* Bodky */}
      <div className="absolute rounded-full" style={{ width: "20px", height: "20px", background: navyDot, left: "8%", top: "25%" }} />
      <div className="absolute rounded-full" style={{ width: "14px", height: "14px", background: redDot, right: "12%", top: "15%" }} />
      <div className="absolute rounded-full" style={{ width: "24px", height: "24px", background: navyDot, left: "15%", bottom: "20%" }} />
      <div className="absolute rounded-full" style={{ width: "10px", height: "10px", background: redDot, right: "20%", bottom: "30%" }} />
      <div className="absolute rounded-full" style={{ width: "16px", height: "16px", background: navyDot, right: "8%", bottom: "15%" }} />
      <div className="absolute rounded-full" style={{ width: "12px", height: "12px", background: redDot, left: "25%", top: "60%" }} />
    </div>
  );
}

/** Minimálna verzia — len bodky */
export function SzphDecoDots({ variant = "light", className = "" }: DecoProps) {
  const navy = variant === "dark" ? "rgba(255,255,255,0.04)" : "rgba(5,25,55,0.04)";
  const red = variant === "dark" ? "rgba(200,16,46,0.06)" : "rgba(200,16,46,0.04)";

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute rounded-full" style={{ width: "40px", height: "40px", background: navy, left: "5%", top: "15%" }} />
      <div className="absolute rounded-full" style={{ width: "20px", height: "20px", background: red, right: "10%", top: "20%" }} />
      <div className="absolute rounded-full" style={{ width: "30px", height: "30px", background: navy, right: "15%", bottom: "10%" }} />
      <div className="absolute rounded-full" style={{ width: "15px", height: "15px", background: red, left: "20%", bottom: "25%" }} />
    </div>
  );
}
