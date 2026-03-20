"use client";

import { signOut } from "next-auth/react";

export default function PortalSignOutButton() {
	return (
		<button
			type="button"
			onClick={() => signOut({ redirectTo: "/login" })}
			style={{
				fontFamily: "var(--font-sans)",
				fontSize: "12px",
				fontWeight: 500,
				color: "var(--cli-muted)",
				background: "none",
				border: "none",
				cursor: "pointer",
				padding: "0",
				transition: "color 0.12s",
			}}
			onMouseEnter={(e) => (e.currentTarget.style.color = "var(--danger)")}
			onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cli-muted)")}
		>
			Sign out
		</button>
	);
}
