import { auth } from "@/lib/auth";
import PortalSignOutButton from "@/components/portal/SignOutButton";
import PortalLanguageSwitcher from "@/components/portal/LanguageSwitcher";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();

	return (
		<div style={{ minHeight: "100vh", background: "var(--cli-bg)" }}>
			{session?.user && (
				<div
					style={{
						height: "36px",
						background: "var(--cli-surface)",
						borderBottom: "1px solid var(--cli-border)",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						padding: "0 24px",
						gap: "16px",
					}}
				>
					<PortalLanguageSwitcher />
					<PortalSignOutButton />
				</div>
			)}
			{children}
		</div>
	);
}
