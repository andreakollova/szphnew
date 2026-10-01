"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDE_ITEMS = [
  {
    label: "Hra",
    href: "/hra",
    icon: (
      <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L14.5 9.5M14.5 9.5L18 6M14.5 9.5L12 12M18 6L20 4M18 6L16 4M18 6L20 8M7 17a3 3 0 1 1-4.5 2.5" />
      </svg>
    ),
    iconActive: (
      <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L14.5 9.5M14.5 9.5L18 6M14.5 9.5L12 12M18 6L20 4M18 6L16 4M18 6L20 8M7 17a3 3 0 1 1-4.5 2.5" />
      </svg>
    ),
  },
  {
    label: "Zápasy",
    href: "/zapasy",
    icon: (
      <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    iconActive: (
      <svg className="h-[24px] w-[24px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Video",
    href: "/video",
    icon: (
      <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
    ),
    iconActive: (
      <svg className="h-[24px] w-[24px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
    ),
  },
  {
    label: "Viac",
    href: "/o-szph",
    icon: (
      <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
    iconActive: (
      <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/hra")) return null;

  const isHome = pathname === "/";
  const leftItems = SIDE_ITEMS.slice(0, 2);
  const rightItems = SIDE_ITEMS.slice(2);

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[50] flex md:hidden justify-center px-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
    >
      <nav
        className="flex items-center justify-between w-full max-w-[380px] px-2"
        style={{
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          borderRadius: "28px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.12), 0 1px 6px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
          height: "66px",
        }}
      >
        {/* Left items */}
        {leftItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-[3px] transition-colors"
              style={{ width: "64px", color: active ? "#012d74" : "#7a849a" }}
            >
              {active ? item.iconActive : item.icon}
              <span className="font-semibold" style={{ fontSize: "10px" }}>{item.label}</span>
            </Link>
          );
        })}

        {/* Center — Domov */}
        <Link href="/" className="flex items-center justify-center -mt-5" style={{ width: "64px" }}>
          <div
            className="flex items-center justify-center transition-all"
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: isHome ? "linear-gradient(135deg, #012d74 0%, #0146a6 100%)" : "#051937",
              boxShadow: isHome ? "0 4px 20px rgba(1,45,116,0.4), 0 0 0 3px rgba(1,45,116,0.08)" : "0 4px 14px rgba(5,25,55,0.25)",
            }}
          >
            <svg className="h-[26px] w-[26px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isHome ? 2 : 1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
            </svg>
          </div>
        </Link>

        {/* Right items */}
        {rightItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-[3px] transition-colors"
              style={{ width: "64px", color: active ? "#012d74" : "#7a849a" }}
            >
              {active ? item.iconActive : item.icon}
              <span className="font-semibold" style={{ fontSize: "10px" }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
