import React from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { RichText } from "prismic-reactjs";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { client } from "../../prismic-configuration";

export default function Post({ data }) {
	const { asPath } = useRouter();
	const title = data?.title[0].text;
	const description = data?.description[0].text;
	return (
		<div className="container">
			<NextSeo
				title={`${title} | Christian Peterson`}
				description={description}
				openGraph={{
					url: `https://www.cpeterson.co${asPath}`,
					title,
					description,
					images: [{ url: "https://www.cpeterson.co/profile.jpg" }],
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
			<article>
				<h2>{data?.title && RichText.asText(data.title)}</h2>
				<main>
					{data?.post_body && RichText.render(data.post_body)}
				</main>
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
	const { results } = await client.getByType("post");

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
