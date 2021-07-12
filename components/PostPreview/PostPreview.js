import React from "react";
import Link from "next/link";
import { RichText } from "prismic-reactjs";

function PostPreview({ title, href, preview, date }) {
	return (
		<div className="card">
			<h2>{title}</h2>
			<sub>{date}</sub>
			<p>{RichText.render(preview)}</p>
			<Link href={href}>Read more...</Link>
		</div>
	);
}

export default PostPreview;
