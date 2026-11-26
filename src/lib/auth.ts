import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { loginUser } from "@/actions/auth.actions";
import { decodeJwtPayload } from "@/lib/jwt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const password = credentials?.password;

        if (!email || !password) return null;

        try {
          const data = await loginUser({ email, password });

          if (!data.token || !data.user) return null;

          const payload = decodeJwtPayload(data.token);

          return {
            id:
              typeof payload?.id === "string"
                ? payload.id
                : data.user.email,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            apiToken: data.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.apiToken = user.apiToken;
        token.error = undefined;
      }

      if (trigger === "update" && session) {
        const updates = session as typeof session & {
          name?: string;
          email?: string;
          apiToken?: string;
        };

        if (typeof updates.name === "string") token.name = updates.name;
        if (typeof updates.email === "string") token.email = updates.email;
        if (typeof updates.apiToken === "string") token.apiToken = updates.apiToken;
        token.error = undefined;
      }

      if (token.apiToken) {
        const payload = decodeJwtPayload(token.apiToken);

        if (payload?.exp && Date.now() >= payload.exp * 1000) {
          token.error = "TokenExpired";
          token.apiToken = undefined;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.id) session.user.id = token.id;
        if (token.role) session.user.role = token.role;
        if (token.name) session.user.name = token.name;
        if (token.email) session.user.email = token.email;
      }

      if (token.apiToken) session.apiToken = token.apiToken;
      if (token.error) session.error = token.error;

      return session;
    },
  },
};

export function getServerAuthSession() {
  return getServerSession(authOptions);
}
