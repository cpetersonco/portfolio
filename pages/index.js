import Link from "next/link";
import * as Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { NextSeo } from "next-seo";
import Image from "next/image";

import { client } from "../prismic-configuration";
import PostPreview from "../components/PostPreview/PostPreview";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import projects from "../constants/projects";
import profile from "../public/profile.jpg";

export default function Home({ posts, homepage }) {
	return (
		<div className="container">
			<NextSeo
				title="Christian Peterson"
				description="Christian Peterson, Software Engineer."
				canonical="https://www.cdpeterson.dev/"
				openGraph={{
					url: "https://www.cdpeterson.dev/",
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
				<a href="https://www.linkedin.com/in/ChristianUA/">LinkedIn</a>
				<a href="https://github.com/ChristianUA">Github</a>
				<a href="https://christian-blog.cdn.prismic.io/christian-blog/457d41f6-846f-4bce-8b73-12b7d9fd9b71_Christian+Peterson+-+Resume.pdf">
					Resume
				</a>
			</div>
			<RichText render={homepage.title} />
			<RichText render={homepage.content} />
			<h2>blog</h2>
			<div className="card-container">
				{posts &&
					posts.map((post) => (
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
					projects.map((project) => (
						<ProjectCard
							key={project.title}
							title={project.title}
							subtitle={project.tech}
							description={project.description}
							link={project.link}
							repo={project.repo}
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
	return {
		props: {
			posts: posts.results,
			homepage: homepage.data,
		},
	};
}
