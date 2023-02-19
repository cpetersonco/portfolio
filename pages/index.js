/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { NextSeo } from "next-seo";
import Image from "next/image";

import { client } from "../prismic-configuration";
import profile from "../public/profile.jpg";

export default function Home({ posts }) {
	const projects = [
		{
			title: "Notes",
			subtitle: "React, Firebase, etc.",
			link: "https://notes.cpeterson.co",
			repo: "https://github.com/ChristianUA/notes",
			description:
				"A note taking app featuring email authentication and note creation using the open source Quill editor",
			backgroundColor: "#1982c4",
		},
		{
			title: "Pokemon Tracker",
			subtitle: "React, REST API, etc.",
			link: "https://pokemon.cpeterson.co",
			repo: "https://github.com/ChristianUA/pokemon-tracker",
			description:
				"Catch &apos;em all! Search and capture pokemon using the PokeAPI.",
			backgroundColor: "#ffca3a",
		},
		{
			title: "Loft Cinema Web Calendar",
			subtitle: "Node.js, Cheerio, axios, ics",
			link: "webcal://loft.cpeterson.co/event.ics",
			repo: "https://github.com/ChristianUA/Loft-Cinema-API",
			description:
				"A publically-served iCal calendar for the local cinema, Loft Cinema.",
			backgroundColor: "#ff595e",
		},
	];

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
			<header className="header">
				<div className="hero">
					<div className="frame">
						<img src="/profile.jpg" alt="Picture of Christian" />
					</div>
					<div className="title">
						<h1>Christian Peterson</h1>
						<h2>Software Engineer</h2>
					</div>
				</div>
				<nav className="hero-links">
					<ul>
						<li className="hero-link">
							<a href="/about" className="link">
								about.
							</a>
						</li>
						<li className="hero-link">
							<a href="/posts" className="link">
								blog.
							</a>
						</li>
						<li className="hero-link">
							<a href="/projects" className="link">
								projects.
							</a>
						</li>
					</ul>
				</nav>
			</header>

			<p>
				<strong>Hi there, I&apos;m Christian!</strong> I&apos;m a
				Software Engineer working at{" "}
				<a className="link" href="https://www.benefitfocus.com/">
					Benefitfocus
				</a>
				, a benefits management platform. A recent graduate from the
				University of Arizona with a Bachelor of Science in Computer
				Science, my passion for programming began with web development,
				and has since expanded into various areas of software
				development. I enjoy building full-stack web applications with
				an emphasis on user experience. I&apos;m excited to continue
				growing my skillset and exploring new technologies. In my free
				time, I make music, read, play video games, and watch movies.
				Join me on my journey!
			</p>
			<h1>experience</h1>
			<ul className="experiences">
				<li data-icon="🦄">
					<strong>Software Engineer</strong> at{" "}
					<a className="link" href="https://www.benefitfocus.com/">
						Benefitfocus
					</a>{" "}
					<span className="subtext">(January 2022 - Present)</span>
				</li>
				<li data-icon="👶">
					<strong>Software Engineer Intern</strong> at{" "}
					<a className="link" href="https://www.benefitfocus.com/">
						Benefitfocus
					</a>{" "}
					<span className="subtext">(May 2021 - December 2021)</span>
				</li>
				<li data-icon="💻">
					<strong>Support Analyst Intern</strong> at{" "}
					<a
						className="link"
						href="https://www.communitymedicalservices.org/"
					>
						Community Medical Services
					</a>{" "}
					<span className="subtext">(June 2017 - May 2021)</span>
				</li>
			</ul>
			<h1>blog</h1>
			<div className="post-previews">
				{posts &&
					posts.map((post) => {
						const { id, uid, data } = post;
						const { title, description, date } = data;
						const href = `/posts/${uid}`;
						return (
							<article key={id} className="post-preview">
								<section>
									{title && (
										<a className="link" href={href}>
											<h2>{RichText.render(title)}</h2>
										</a>
									)}
									{description && (
										<p>{RichText.render(description)}</p>
									)}
								</section>
								<footer>
									<a className="link" href={href}>
										read more
									</a>
									{date && (
										<sub>
											{new Date(date).toLocaleDateString(
												"en-US",
												{
													year: "numeric",
													month: "long",
													day: "numeric",
												}
											)}
										</sub>
									)}
								</footer>
							</article>
						);
					})}
			</div>
			<h1>projects</h1>
			<div className="project-previews" k>
				{projects &&
					projects.map((project, i) => {
						const {
							title,
							subtitle,
							repo,
							link,
							description,
							preview_image,
							backgroundColor,
						} = project;

						return (
							<a
								className="project-preview"
								href={link}
								key={i}
								style={{ backgroundColor }}
							>
								<article>
									{preview_image && preview_image?.url && (
										<span className="previewImage">
											<img
												src={preview_image?.url}
												alt={preview_image?.alt}
											></img>
										</span>
									)}

									<header>
										<h2>{title}</h2>
										<subtitle>{subtitle}</subtitle>
									</header>
									<section>
										<p>{description}</p>
									</section>
								</article>
							</a>
						);
					})}
			</div>
			<footer className="footer">
				<nav className="hero-links">
					<ul>
						<li className="hero-link">
							<a
								className="link"
								href="https://www.linkedin.com/in/ChristianUA/"
							>
								linkedin.
							</a>
						</li>
						<li className="hero-link">
							<a
								className="link"
								href="https://github.com/ChristianDPeterson"
							>
								github.
							</a>
						</li>
						<li className="hero-link">
							<a
								className="link"
								href="https://christian-blog.cdn.prismic.io/christian-blog/457d41f6-846f-4bce-8b73-12b7d9fd9b71_Christian+Peterson+-+Resume.pdf"
							>
								resume.
							</a>
						</li>
					</ul>
				</nav>
				<p> © {new Date().getFullYear()} by Christian Peterson.</p>
			</footer>
		</div>
	);
}

export async function getStaticProps() {
	const posts = await client.getByType("post", {
		orderings: {
			field: "document.first_publication_date",
			direction: "desc",
		},
	});
	return {
		props: {
			posts: posts.results,
		},
	};
}
