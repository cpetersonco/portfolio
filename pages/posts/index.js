import React from "react";
import { client } from "../../prismic-configuration";
import { NextSeo } from "next-seo";
import { RichText } from "prismic-reactjs";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

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
				posts.map((post) => {
					const { id, uid, data } = post;
					const { title, description, date } = data;
					const href = `/posts/${uid}`;
					return (
						<article key={id} className="post-preview">
							<header className="card-header">
								{title && (
									<a href={href}>
										<h2>{RichText.render(title)}</h2>
									</a>
								)}
								{date && (
									<sub>
										{new Date(date).toLocaleDateString()}
									</sub>
								)}
							</header>
							{description && (
								<section>
									<p>{RichText.render(description)}</p>
								</section>
							)}
							<footer>
								<a href={href}>Read more</a>
							</footer>
						</article>
					);
				})}
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
