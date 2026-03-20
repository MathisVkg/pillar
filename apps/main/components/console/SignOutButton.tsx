"use client";

import { signOut } from "next-auth/react";

export default function ConsoleSignOutButton() {
	return (
		<button
			type="button"
			onClick={() => signOut({ redirectTo: "/admin/login" })}
			style={{
				fontFamily: "var(--font-mono)",
				fontSize: "11px",
				letterSpacing: "0.06em",
				textTransform: "uppercase",
				color: "rgba(255,255,255,0.55)",
				background: "none",
				border: "none",
				cursor: "pointer",
				padding: "4px 0",
				transition: "color 0.12s",
			}}
			onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
			onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
		>
			sign out
		</button>
	);
}
