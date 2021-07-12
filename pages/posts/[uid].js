import React from "react";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { client } from "../../prismic-configuration";

export default function Post({ data }) {
	return (
		<div className="container">
			<Breadcrumbs></Breadcrumbs>
			<article>
				<h2>{RichText.asText(data?.title)}</h2>
				<main>{RichText.render(data?.post_body)}</main>
			</article>
		</div>
	);
}

export async function getStaticProps({ params }) {
	const { uid } = params;
	const { data } = await client.getByUID("post", uid);
	return {
		props: { data },
	};
}

export async function getStaticPaths() {
	const { results } = await client.query(
		Prismic.Predicates.at("document.type", "post")
	);

	const paths = results.map((post) => ({
		params: {
			uid: post.uid,
		},
	}));

	return {
		paths,
		fallback: true,
	};
}
