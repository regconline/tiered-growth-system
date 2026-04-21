import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("REGC Digital"),
    category: z.string().default("Healthcare Marketing"),
    tags: z.array(z.string()).default([]),
    heroEmoji: z.string().default("📰"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
