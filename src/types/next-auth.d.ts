import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    apiToken: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
    apiToken?: string;
    error?: "TokenExpired" | string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    apiToken?: string;
    error?: "TokenExpired";
  }
}
