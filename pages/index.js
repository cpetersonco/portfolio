import Head from "next/head";
import Link from "next/link";
import Prismic from "prismic-javascript";

import Frame from "../components/Frame/Frame";
import PostPreview from "../components/PostPreview/PostPreview";
import ProjectCard from "../components/ProjectCard/ProjectCard";

import projects from "../constants/projects";
import images from "../constants/images";

import { client } from "../prismic-configuration";

export default function Home({ posts }) {
	return (
		<div className="container">
			<Head>
				<title>Christian Peterson</title>
				{/* TWITTER */}
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Christian Peterson" />
				<meta
					name="twitter:description"
					content="Christian Peterson, Software Engineer."
				/>
				<meta
					name="twitter:image"
					content="http://www.cdpeterson.dev/profile.jpg"
				/>
				{/* OPEN GRAPH */}
				<meta property="og:title" content="Christian Peterson" />
				<meta property="og:url" content="https://cdpeterson.dev/" />
				<meta
					property="og:image"
					content="http://www.cdpeterson.dev/profile.jpg"
				/>
				<meta
					property="og:description"
					content="Christian Peterson, Software Engineer."
				/>
				<meta property="og:site_name" content="Christian Peterson" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="header">
				<Frame images={images} />
				<div>
					<h1>Christian Peterson</h1>
					<h2>Software Engineer</h2>
				</div>
			</div>
			<div className="links-container">
				<a href="https://www.linkedin.com/in/ChristianUA/">LinkedIn</a>
				<a href="https://github.com/ChristianUA">Github</a>
				<a href="https://christian-blog.cdn.prismic.io/christian-blog/457d41f6-846f-4bce-8b73-12b7d9fd9b71_Christian+Peterson+-+Resume.pdf">
					Resume
				</a>
			</div>
			<p className="bio">
				<b>Hi there, I&apos;m Christian!</b> I&apos;m a student at the
				University of Arizona, majoring in Computer Science with a minor
				in Music with plans to graduate in December 2021.
			</p>
			<p className="bio">
				I&apos;m currently looking for a junior software developer gig
				for December/January. I have multiple previous internship
				experiences and I&apos;ve included some of my passion projects
				below. I&apos;m passionate about creating meaningful user
				experiences on the web!
			</p>
			<p className="bio">
				In my freetime, I love to make music, play chess, and read.
				Follow along on my journey through my blog!
			</p>
			<h2>blog</h2>
			<div className="card-container">
				{posts &&
					posts.map((post) => (
						<PostPreview
							key={post.uid}
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
		</div>
	);
}

export async function getStaticProps() {
	const posts = await client.query(
		Prismic.Predicates.at("document.type", "post"),
		{ orderings: "[my.post.date desc]", pageSize: 4 }
	);
	return {
		props: {
			posts: posts.results,
		},
	};
}
