export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        header[class*="fixed"] { display: none !important; }
        div[class*="z-[60]"] { display: none !important; }
        div[class*="md:hidden"][class*="z-[60]"] { display: none !important; }
        body > main { padding-top: 0 !important; }
        footer { display: none !important; }
      `}} />
      <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        {children}
      </div>
    </>
  );
}
