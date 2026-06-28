export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#020817", minHeight: "100vh" }}>
      <style>{`header, [class*="z-[60]"], footer { display: none !important; } main { padding-top: 0 !important; }`}</style>
      {children}
    </div>
  );
}
