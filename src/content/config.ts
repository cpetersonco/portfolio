// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";
import { rssSchema } from "@astrojs/rss";

// 2. Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  // type: "content", // v2.5.0 and later
  // schema: z.object({
  //   title: z.string(),
  //   author: z.string(),
  //   description: z.string(),
  //   date: z.date(),
  // }),
  schema: rssSchema,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};
