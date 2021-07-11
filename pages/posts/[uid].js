import React from "react";
import { client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

export default function Post({ data }) {
	console.log(data);
	return (
		<div className="container">
			<Breadcrumbs></Breadcrumbs>
			<article>
				<h2>{RichText.asText(data.title)}</h2>
				<main>{RichText.render(data.post_body)}</main>
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
