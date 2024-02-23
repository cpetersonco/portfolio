import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("posts");
  return rss({
    title: "Christian Peterson's Blog",
    description: "A collection of a Software Engineer's thoughts.",
    site: context.site,
    items: blog
      .sort((a, b) => b.data.pubDate - a.data.pubDate)
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        // customData: post.data.customData,
        // Compute RSS link from post `slug`
        // This example assumes all posts are rendered as `/blog/[slug]` routes
        link: `/posts/${post.slug}/`,
      })),
    stylesheet: "/rss/pretty-feed-v3.xsl",
  });
}
