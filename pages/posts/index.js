import React from "react";
import { client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PostPreview from "../../components/PostPreview/PostPreview";

export default function Posts({ posts }) {
	return (
		<div className="container">
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
	const posts = await client.query(
		Prismic.Predicates.at("document.type", "post"),
		{ orderings: "[my.post.date desc]" }
	);
	return {
		props: {
			posts: posts.results,
		},
	};
}
