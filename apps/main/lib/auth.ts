import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@pillar/database";

declare module "next-auth" {
	interface User {
		clientId?: string;
		role?: string;
		isAdmin: boolean;
	}
	interface Session {
		user: {
			id: string;
			clientId?: string;
			role?: string;
			isAdmin: boolean;
		};
	}
}

declare module "@auth/core/jwt" {
	interface JWT {
		id: string;
		clientId?: string;
		role?: string;
		isAdmin: boolean;
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	pages: {
		signIn: "/admin/login",
	},
	session: { strategy: "jwt" },
	providers: [
		// ── Admin console login ──
		Credentials({
			id: "admin",
			name: "Admin",
			credentials: {
				email: { type: "email" },
				password: { type: "password" },
			},
			async authorize(credentials) {
				const email = credentials.email as string;
				const password = credentials.password as string;
				if (!email || !password) return null;

				const admin = await prisma.admin.findUnique({ where: { email } });
				if (!admin) return null;

				const valid = await compare(password, admin.passwordHash);
				if (!valid) return null;

				return {
					id: admin.id,
					email: admin.email,
					isAdmin: true,
				};
			},
		}),

		// ── Client portal login (email + password) ──
		Credentials({
			id: "portal",
			name: "Portal",
			credentials: {
				email: { type: "email" },
				password: { type: "password" },
			},
			async authorize(credentials) {
				const email = credentials.email as string;
				const password = credentials.password as string;
				if (!email || !password) return null;

				const user = await prisma.clientUser.findUnique({
					where: { email },
					include: { client: { select: { isActive: true } } },
				});

				if (!user || !user.isActive || !user.client.isActive) return null;
				if (!user.passwordHash) return null;

				const valid = await compare(password, user.passwordHash);
				if (!valid) return null;

				// Update last login
				await prisma.clientUser.update({
					where: { id: user.id },
					data: { lastLoginAt: new Date() },
				});

				return {
					id: user.id,
					email: user.email,
					clientId: user.clientId,
					role: user.role,
					isAdmin: false,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id as string;
				token.clientId = user.clientId;
				token.role = user.role;
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.clientId = token.clientId;
			session.user.role = token.role;
			session.user.isAdmin = token.isAdmin;
			return session;
		},
	},
});
