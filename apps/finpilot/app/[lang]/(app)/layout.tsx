import NavTabs from "@/components/ui/nav-tabs";
import Topbar from "@/components/ui/topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fp-app-shell">
      <Topbar />
      <NavTabs />
      <main className="fp-main">{children}</main>
    </div>
  );
}
