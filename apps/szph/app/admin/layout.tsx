export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        header { display: none !important; }
        .mobile-fixed-header { display: none !important; }
        nav[class*="md:hidden"] { display: none !important; }
        body > main { padding-top: 0 !important; }
        footer { display: none !important; }
      `}} />
      <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        {children}
      </div>
    </>
  );
}
