import React from "react";

import Link from "next/link";

const isExternalLink = (url) => {
	const tmp = document.createElement("a");
	tmp.href = url;
	return tmp.host !== window.location.host;
};

function Card({ title, content, link, subtitle, isExternal }) {
	return (
		<div className="card">
			{title && <h3>{title}</h3>}
			{subtitle && <sub>{subtitle}</sub>}
			{content && <div>{content}</div>}
			<div className="right-justify">
				{link && isExternal ? (
					<a href={link}>Go to {title}</a>
				) : (
					<Link href={link}>Read more...</Link>
				)}
			</div>
		</div>
	);
}

export default Card;
