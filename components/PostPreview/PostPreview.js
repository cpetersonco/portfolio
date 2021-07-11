import React from "react";
import Link from "next/link";
import { RichText } from "prismic-reactjs";

function PostPreview({ title, href, preview, date }) {
	return (
		<div className="card">
			<div className="card-title">
				<Link href={href}>{title}</Link>
			</div>
			{date}
			{RichText.render(preview)}
		</div>
	);
}

export default PostPreview;
