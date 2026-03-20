import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";
import { redirect } from "next/navigation";
import ConsoleSidebar from "@/components/console/ConsoleSidebar";
import ConsoleSignOutButton from "@/components/console/SignOutButton";
import ConsoleLanguageSwitcher from "@/components/console/LanguageSwitcher";
import QuickLogWidget from "./QuickLogWidget";

export default async function ConsoleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session?.user?.isAdmin) redirect("/admin/login");

	const admin = await prisma.admin.findUnique({
		where: { id: session.user.id },
		select: { email: true },
	});
	const email = admin?.email ?? "Admin";
	const initial = email[0].toUpperCase();

	return (
		<div className="console-layout" style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--con-bg)" }}>
			{/* Topbar */}
			<header
				style={{
					height: "48px",
					background: "#0F172A",
					borderBottom: "1px solid #1e2a44",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 20px",
					flexShrink: 0,
					gap: "16px",
				}}
			>
				{/* Left: wordmark */}
				<span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, color: "#fff", letterSpacing: "-0.3px", flexShrink: 0 }}>
					pillar<span style={{ color: "#2563EB" }}>.</span>
				</span>

				{/* Right: status + user + lang + sign out */}
				<div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
					{/* API status */}
					<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
						<span style={{
							width: "7px",
							height: "7px",
							borderRadius: "50%",
							background: "#22c55e",
							display: "inline-block",
							boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
							flexShrink: 0,
						}} />
						<span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>
							Online
						</span>
					</div>

					{/* User avatar + email */}
					<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
						<span style={{
							width: "26px",
							height: "26px",
							borderRadius: "50%",
							background: "#2563EB",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
							fontFamily: "var(--font-mono)",
							fontSize: "11px",
							fontWeight: 700,
							color: "#fff",
							flexShrink: 0,
						}}>
							{initial}
						</span>
						<span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(255,255,255,0.75)", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
							{email}
						</span>
					</div>

					{/* Language switcher */}
					<ConsoleLanguageSwitcher />

					{/* Sign out */}
					<ConsoleSignOutButton />
				</div>
			</header>

			{/* Body */}
			<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
				<ConsoleSidebar />

				{/* Main content */}
				<main
					style={{
						flex: 1,
						overflow: "auto",
						padding: "24px",
					}}
				>
					{children}
				</main>
			</div>
			<QuickLogWidget />
		</div>
	);
}
