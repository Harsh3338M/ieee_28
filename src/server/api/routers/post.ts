import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { ScamType } from "../../../../generated/prisma";

export const SCAM_CATEGORIES = ["PHISHING", "WHATSAPP", "GENERAL", "INVESTMENT"] as const;

export const postRouter = createTRPCRouter({
  // 1. Create a Post
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(10),
        scamType: z.nativeEnum(ScamType),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          scamType: input.scamType,
          imageUrl: input.imageUrl,
          createdById: ctx.session.user.id,
        },
      });
    }),

  // 2. Voting Logic
  vote: publicProcedure
    .input(
      z.object({
        postId: z.number(),
        type: z.enum(["UP", "DOWN"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: { id: input.postId },
        data: {
          upvotes: input.type === "UP" ? { increment: 1 } : undefined,
          downvotes: input.type === "DOWN" ? { increment: 1 } : undefined,
        },
      });
    }),

  // 3. Get All Posts (Feed)
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: {
          select: { name: true, image: true },
        },
      },
    });
  }),

  // 4. Increment View Count
  incrementView: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: { id: input.id },
        data: { viewCount: { increment: 1 } },
      });
    }),

  // 5. Get Single Post (Now correctly inside the router object)
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: { id: input.id },
        include: {
          createdBy: {
            select: { name: true, image: true },
          },
        },
      });
    }),
}); // Router ends here