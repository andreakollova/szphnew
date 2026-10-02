"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@szph/ui";

// Roles: superadmin (all), editor (articles + matches + teams), zapasy (matches only)
type Role = "superadmin" | "editor" | "zapasy";

const ALL_NAV_ITEMS = [
  {
    group: "Prehľad",
    items: [
      { label: "Dashboard", href: "/admin", icon: "dashboard", roles: ["superadmin", "editor", "zapasy"] },
    ],
  },
  {
    group: "Evidencia",
    groupHref: "/evidencia",
    items: [
      { label: "Články", href: "/admin/clanky", icon: "article", roles: ["superadmin", "editor"] },
      { label: "Stránky", href: "/admin/stranky", icon: "page", roles: ["superadmin"] },
      { label: "Zápasy", href: "/admin/zapasy", icon: "match", roles: ["superadmin", "editor", "zapasy"] },
      { label: "Tímy", href: "/admin/timy", icon: "team", roles: ["superadmin", "editor", "zapasy"] },
      { label: "Súťaže", href: "/admin/sutaze", icon: "trophy", roles: ["superadmin", "editor"] },
      { label: "Cvičenia", href: "/admin/cvicenia", icon: "exercise", roles: ["superadmin", "editor"] },
      { label: "Partneri", href: "/admin/partneri", icon: "partner", roles: ["superadmin"] },
    ],
  },
  {
    group: "Nastavenia",
    items: [
      { label: "Menu", href: "/admin/menu", icon: "menu", roles: ["superadmin"] },
      { label: "Správcovia", href: "/admin/spravcovia", icon: "users", roles: ["superadmin"] },
    ],
  },
];

function NavIcon({ name, className }: { name: string; className?: string }) {
  const c = cn("h-4 w-4 shrink-0", className);
  const icons: Record<string, string> = {
    dashboard: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
    article: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    page: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    team: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    trophy: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0",
    match: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    exercise: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    partner: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
    menu: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
    users: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  };
  const d = icons[name];
  if (!d) return <div className="h-4 w-4 rounded bg-gray-200" />;
  return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>;
}

export function AdminSidebar({ role = "superadmin", username = "admin" }: { role?: string; username?: string }) {
  const pathname = usePathname();

  const navItems = ALL_NAV_ITEMS.map(group => ({
    ...group,
    items: group.items.filter(item => item.roles.includes(role as Role)),
  })).filter(group => group.items.length > 0);

  const ROLE_LABELS: Record<string, string> = {
    superadmin: "Superadmin",
    editor: "Editor",
    zapasy: "Zápasy",
  };

  return (
    <>
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:flex-col">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto border-r border-[rgba(1,45,116,0.08)] px-4 py-6 bg-white">
          <div className="mb-2 px-2">
            <Link href="/admin">
              <Image src="/images/logo-szph-dark.webp" alt="SZPH Admin" width={130} height={50} className="h-12 w-auto object-contain" priority />
            </Link>
            <p className="mt-1 text-[10px] text-[#94a3b8]">Admin panel</p>
          </div>

          {navItems.map((group: any) => (
            <div key={group.group}>
              {group.groupHref ? (
                <Link href={group.groupHref} className="mb-1 px-2 text-[11px] font-bold text-[#051937] hover:text-[#012d74] transition-colors block">
                  {group.group}
                </Link>
              ) : (
                <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#051937]">
                  {group.group}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item: any) => {
                  const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded px-3 py-2 text-sm font-semibold transition-all",
                          isActive
                            ? "bg-[#012d74]/10 text-[#012d74] border border-[#012d74]/20"
                            : "text-[#334155] hover:bg-gray-50 hover:text-[#051937]"
                        )}
                      >
                        <NavIcon name={item.icon} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="mt-auto space-y-1">
            <a
              href="/"
              target="_blank"
              className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm font-semibold text-[#334155] transition-colors hover:bg-gray-50 hover:text-[#051937]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Zobraziť web
            </a>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded px-3 py-2 font-semibold text-[#334155] transition-colors hover:bg-gray-50 hover:text-[#051937]"
                style={{ fontSize: "12px" }}
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Odhlásiť sa
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="flex lg:hidden items-center justify-between border-b border-[rgba(1,45,116,0.08)] bg-white px-4 py-3 sticky top-0 z-40">
        <Image src="/images/logo-szph-dark.webp" alt="SZPH" width={80} height={30} className="h-7 w-auto" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#051937] font-semibold">{username}</span>
          <span className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase bg-[#012d74]/10 text-[#012d74]">{ROLE_LABELS[role] || role}</span>
        </div>
      </div>
    </>
  );
}
