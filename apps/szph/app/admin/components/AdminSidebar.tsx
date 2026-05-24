"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@szph/ui";

const NAV_ITEMS = [
  {
    group: "Prehľad",
    items: [
      { label: "Dashboard",  href: "/admin",           icon: "📊" },
    ],
  },
  {
    group: "Obsah",
    items: [
      { label: "Články",     href: "/admin/clanky",    icon: "📝" },
      { label: "Videá",      href: "/admin/videa",     icon: "🎬" },
      { label: "Stránky",    href: "/admin/stranky",   icon: "📄" },
    ],
  },
  {
    group: "Súťaže",
    items: [
      { label: "Tímy",       href: "/admin/timy",      icon: "🏒" },
      { label: "Súťaže",     href: "/admin/sutaze",    icon: "🏆" },
      { label: "Zápasy",     href: "/admin/zapasy",    icon: "⚽" },
    ],
  },
  {
    group: "Nastavenia",
    items: [
      { label: "Partneri",   href: "/admin/partneri",  icon: "🤝" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:flex-col">
        <div
          className="flex flex-1 flex-col gap-4 overflow-y-auto border-r border-white/10 px-4 py-6"
          style={{ background: "rgba(2, 8, 23, 0.98)", backdropFilter: "blur(20px)" }}
        >
          {/* Logo */}
          <div className="mb-2 px-2">
            <Image
              src="/images/logo-szph.png"
              alt="SZPH Admin"
              width={100}
              height={38}
              className="h-9 w-auto object-contain"
            />
            <p className="mt-1 text-xs text-white/30">Admin panel</p>
          </div>

          {/* Navigácia */}
          {NAV_ITEMS.map((group) => (
            <div key={group.group}>
              <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {group.group}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all",
                          isActive
                            ? "bg-[var(--sky)]/15 text-white border border-[var(--sky)]/20"
                            : "text-white/60 hover:bg-white/8 hover:text-white"
                        )}
                      >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Logout */}
          <div className="mt-auto">
            <form action="/admin/api/logout" method="POST">
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-white/40 transition-colors hover:bg-white/8 hover:text-white"
              >
                <span>🚪</span> Odhlásiť sa
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex lg:hidden items-center justify-between border-b border-white/10 bg-[#020817] px-4 py-3 sticky top-0 z-40">
        <Image
          src="/images/logo-szph.png"
          alt="SZPH"
          width={80}
          height={30}
          className="h-7 w-auto"
        />
        <span className="text-xs text-white/40">Admin</span>
      </div>
    </>
  );
}
