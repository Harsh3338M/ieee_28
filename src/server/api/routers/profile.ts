import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
    updateStats: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        xp: z.number(),
        points: z.number(),
        badges: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, xp, points, badges } = input;
  
      // Use Prisma's 'increment' for atomic updates. 
      // This is safer and faster than fetching, adding, and saving.
      const updatedProfile = await ctx.db.profile.update({
        where: { userId },
        data: {
          xp: {
            increment: xp,
          },
          points: {
            increment: points,
          },
          // For badges, we use 'set' to overwrite or logic to merge.
          // If your schema uses a JSON array for badges:
          badges: {
            // This logic ensures we don't save duplicate badges
            set: await (async () => {
              const current = await ctx.db.profile.findUnique({ 
                where: { userId }, 
                select: { badges: true } 
              });
              return Array.from(new Set([...(current?.badges ?? []), ...badges]));
            })(),
          },
        },
      });
  
      return updatedProfile;
    }),
  // Use protectedProcedure if the user must be logged in to see the profile
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const profile = await ctx.db.profile.findUnique({
        where: { userId: input.id },
      });
      
      if (!profile) throw new Error("Profile not found");
      return profile;
    }),
});