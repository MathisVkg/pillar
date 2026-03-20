import NextAuth from "next-auth";

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

export const { auth } = NextAuth({
	session: { strategy: "jwt" },
	providers: [],
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
