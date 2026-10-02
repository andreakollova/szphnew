"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Domov",
    href: "/",
    icon: (a: boolean) => <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a ? 2 : 1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></svg>,
  },
  {
    label: "Články",
    href: "/novinky",
    icon: (a: boolean) => <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a ? 2 : 1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
  },
  {
    label: "Video",
    href: "/video",
    isCenter: true,
    icon: (_a: boolean) => <svg className="h-[22px] w-[22px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" strokeLinecap="round" /><path d="M9.5 10l5 3-5 3V10z" fill="currentColor" stroke="none" /></svg>,
  },
  {
    label: "Zápasy",
    href: "/zapasy",
    icon: (a: boolean) => <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a ? 2 : 1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  },
  {
    label: "Hra",
    href: "/hra",
    icon: (a: boolean) => <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="11" y2="11" /><line x1="8" x2="8" y1="9" y2="13" /><line x1="15" x2="15.01" y1="12" y2="12" /><line x1="18" x2="18.01" y1="10" y2="10" /><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" /></svg>,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/hra")) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[50] flex md:hidden justify-center px-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
    >
      <nav
        className="flex items-end justify-around w-full max-w-[400px] px-2 pb-2"
        style={{
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          borderRadius: "24px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.12), 0 1px 6px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
          height: "62px",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isCenter = "isCenter" in item && item.isCenter;
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          if (isCenter) {
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center -mt-4">
                <div
                  className="flex items-center justify-center mb-1"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: active ? "#d00027" : "#051937",
                    boxShadow: active ? "0 4px 16px rgba(208,0,39,0.35)" : "0 4px 12px rgba(5,25,55,0.2)",
                  }}
                >
                  {item.icon(active)}
                </div>
                <span className="font-semibold" style={{ fontSize: "9px", color: active ? "#d00027" : "#8a92a6" }}>{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 transition-colors"
              style={{ width: "52px", color: active ? "#012d74" : "#8a92a6" }}
            >
              {item.icon(active)}
              <span className="font-semibold" style={{ fontSize: "9px" }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
