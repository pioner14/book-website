import { defineCollection, z } from 'astro:content';

const bookCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    description: z.string().optional(),
  }),
});

export const collections = {
  book: bookCollection,
};