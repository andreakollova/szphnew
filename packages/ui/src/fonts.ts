// TODO: Garet fonty sú v /packages/ui/fonts/garet/ ako .otf súbory
// next/font/local nepodporuje .otf priamo — skonvertuj na .woff2 pomocou:
// npx fontsource-convert alebo https://cloudconvert.com/otf-to-woff2
// Zatiaľ používame fallback na Inter

import { Inter } from "next/font/google";
// import localFont from "next/font/local";  // odkomentuj po konverzii fontov

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Po skonvertovaní .otf → .woff2, odkomentuj toto:
/*
export const garet = localFont({
  src: [
    { path: "../fonts/garet/garet-regular.woff2",      weight: "400", style: "normal" },
    { path: "../fonts/garet/garet-regularitalic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/garet/garet-medium.woff2",       weight: "500", style: "normal" },
    { path: "../fonts/garet/garet-bold.woff2",         weight: "700", style: "normal" },
    { path: "../fonts/garet/garet-bolditalic.woff2",   weight: "700", style: "italic" },
    { path: "../fonts/garet/garet-extrabold.woff2",    weight: "800", style: "normal" },
    { path: "../fonts/garet/garet-extrabolditalic.woff2", weight: "800", style: "italic" },
    { path: "../fonts/garet/garet-heavy.woff2",        weight: "900", style: "normal" },
    { path: "../fonts/garet/garet-heavyitalic.woff2",  weight: "900", style: "italic" },
  ],
  variable: "--font-garet",
  display: "swap",
});
*/

// Dočasný fallback — Garet simulujeme cez Inter (bold + italic)
// CSS trieda .font-garet bude používať Inter kým nie sú .woff2 súbory
export const garetFallback = {
  variable: "--font-garet",
  className: "",
};
