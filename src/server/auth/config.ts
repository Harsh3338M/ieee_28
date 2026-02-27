import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { db } from "@/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      xp: number;
      points: number;
      streak: number;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [DiscordProvider],
  adapter: PrismaAdapter(db),
  events: {
    async createUser({ user }) {
      await db.profile.create({
        data: {
          userId: user.id!,
          xp: 0,
          points: 0,
          streak: 0,
        },
      });
    },
  },
  callbacks: {
    async session({ session, user }) {
      const profile = await db.profile.findUnique({
        where: { userId: user.id },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          xp: profile?.xp ?? 0,
          points: profile?.points ?? 0,
          streak: profile?.streak ?? 0,
        },
      };
    },
  },
} satisfies NextAuthConfig;