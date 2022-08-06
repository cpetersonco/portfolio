import Link from "next/link";
import * as Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { NextSeo } from "next-seo";
import Image from "next/image";

import { client } from "../prismic-configuration";
import PostPreview from "../components/PostPreview/PostPreview";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import profile from "../public/profile.jpg";

export default function Home({ posts, homepage, heroLinks, projects }) {
	return (
		<div className="container">
			<NextSeo
				title="Christian Peterson"
				description="Christian Peterson, Software Engineer."
				canonical="https://www.cpeterson.co"
				openGraph={{
					url: "https://www.cpeterson.co",
					title: "Christian Peterson",
					description: "Christian Peterson, Software Engineer.",
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
			<div className="header">
				<div className="img-card col-left">
					<div className="frame">
						<Image
							src={profile}
							alt="Picture of Christian"
							width={200}
							height={200}
							priority={true}
							placeholder={"blur"}
						/>
					</div>
				</div>
				<div>
					<h1>Christian Peterson</h1>
					<h2>Software Engineer</h2>
				</div>
			</div>
			<div className="center links-container">
				{heroLinks &&
					heroLinks.body &&
					heroLinks.body.map((link, i) => {
						return (
							<a key={i} href={link.primary.link.url}>
								{RichText.asText(link.primary.label)}
							</a>
						);
					})}
			</div>
			<RichText render={homepage.content} />
			<h2>blog</h2>
			<div className="card-container">
				{posts &&
					posts
						// .sort(
						// 	(a, b) =>
						// 		new Date(b.data.date) - new Date(a.data.date)
						// )
						.map((post) => (
							<PostPreview
								key={post.id}
								title={post.data.title[0].text}
								href={`/posts/${post.uid}`}
								preview={post.data.description}
								date={post.data.date}
							/>
						))}
			</div>
			<div className="links-container">
				<Link href="/posts">See all posts</Link>
			</div>

			<h2>projects</h2>
			<div className="card-container">
				{projects &&
					projects.body &&
					projects.body.map((project, i) => (
						<ProjectCard
							key={i}
							title={project.primary.label[0].text}
							subtitle={project.primary.tech[0].text}
							description={project.primary.description[0].text}
							link={project.primary.link.url}
							repo={project.primary.repo.url}
						/>
					))}
			</div>
			<RichText render={homepage.footer} />
		</div>
	);
}

export async function getStaticProps() {
	const posts = await client.getByType("post");
	const homepage = await client.getSingle("homepage");
	const heroLinks = await client.getSingle("hero_links");
	const projects = await client.getSingle("projects");
	return {
		props: {
			posts: posts.results,
			homepage: homepage.data,
			heroLinks: heroLinks.data,
			projects: projects.data,
		},
	};
}
