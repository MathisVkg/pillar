import Topbar from "@/components/ui/topbar";
import NavTabs from "@/components/ui/nav-tabs";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--ground)" }}>
      <Topbar />
      <NavTabs />
      <main style={{ flex: 1, padding: "24px" }}>
        {children}
      </main>
    </div>
  );
}
