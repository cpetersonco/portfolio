import React from "react";
import { client } from "../../prismic-configuration";
import { NextSeo } from "next-seo";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PostPreview from "../../components/PostPreview/PostPreview";

export default function Posts({ posts }) {
	return (
		<div className="container">
			<NextSeo
				title="Blog | Christian Peterson"
				description="The blog of Christian Peterson, Software Engineer."
				openGraph={{
					url: `https://www.cdpeterson.dev/posts`,
					title: "Blog | Christian Peterson",
					description:
						"The blog of Christian Peterson, Software Engineer.",
					images: [{ url: "https://www.cdpeterson.dev/profile.jpg" }],
					site_name: "Christian Peterson",
				}}
				additionalLinkTags={[
					{
						rel: "icon",
						type: "image/png",
						sizes: "32x32",
						href: "/favicon-32x32.png",
					},
					{
						rel: "icon",
						type: "image/png",
						sizes: "16x16",
						href: "/favicon-16x16.png",
					},
					{
						rel: "apple-touch-icon",
						href: "/apple-touch-icon.png",
						sizes: "180x180",
					},
				]}
			/>
			<Breadcrumbs></Breadcrumbs>
			{posts &&
				posts.map((post, i) => (
					<PostPreview
						key={post.uid}
						title={post.data.title[0].text}
						href={`/posts/${post.uid}`}
						preview={post.data.description}
						date={post.data.date}
					></PostPreview>
				))}
		</div>
	);
}

export async function getStaticProps() {
	const posts = await client.getByType("post");
	return {
		props: {
			posts: posts.results,
		},
	};
}
