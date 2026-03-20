import { adminLogin } from "@/app/admin/login/actions";
import LoginForm from "@/app/admin/login/LoginForm";
import ConsoleLanguageSwitcher from "@/components/console/LanguageSwitcher";
import { getT, type Lang } from "@/lib/i18n";

export const metadata = { title: "Pillar \u00B7 Sign in" };

type Props = { params: Promise<{ locale: string }> };

export default async function AdminLoginPage({ params }: Props) {
	const { locale } = await params;
	const t = getT(locale as Lang);

	return (
		<div
			className="min-h-screen flex items-center justify-center"
			style={{ background: "var(--brand)", position: "relative" }}
		>
			{/* Language switcher — top right */}
			<div style={{ position: "absolute", top: "16px", right: "20px" }}>
				<ConsoleLanguageSwitcher />
			</div>

			<div
				className="w-full max-w-sm"
				style={{
					background: "var(--brand-deep)",
					border: "1px solid #1e2a44",
					borderRadius: "6px",
					padding: "36px 32px",
				}}
			>
				{/* Wordmark */}
				<div
					className="mb-8"
					style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: 600, color: "#fff", letterSpacing: "-0.3px" }}
				>
					pillar<span style={{ color: "var(--accent)" }}>.</span>
					<span style={{ fontWeight: 300, color: "#3a4a6a", marginLeft: "8px", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
						console
					</span>
				</div>

				<LoginForm action={adminLogin} />

				{/* Footer */}
				<p
					className="mt-6 text-center"
					style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#1e2a44", letterSpacing: "0.06em" }}
				>
					{t("auth.restrictedAccess")}
				</p>
			</div>
		</div>
	);
}
