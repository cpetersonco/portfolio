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
					url: `https://www.cpeterson.co/posts`,
					title: "Blog | Christian Peterson",
					description:
						"The blog of Christian Peterson, Software Engineer.",
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
			<ul className="post-previews">
				{posts &&
					posts.map((post) => {
						const { id, uid, data } = post;
						const { title, description, date } = data;
						const href = `/posts/${uid}`;

						return (
							<li key={id} className="post-preview">
								{title && (
									<a className="title" href={href}>
										{
											RichText.render(title).props
												.children[0].props.children[0]
										}
									</a>
								)}
								{
									<time dateTime="Jan 06 2024">
										{" "}
										{new Date(date).toLocaleDateString(
											"en-US",
											{
												year: "numeric",
												month: "long",
												day: "numeric",
											}
										)}{" "}
									</time>
								}
								<br />
								<span>
									{description &&
										RichText.render(description)}
								</span>
							</li>
						);
					})}
			</ul>
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
