import React from "react";

import Link from "next/link";

const isExternalLink = (url) => {
	const tmp = document.createElement("a");
	tmp.href = url;
	return tmp.host !== window.location.host;
};

function Card({ title, content, links, subtitle, isExternal }) {
	return (
		<div className="card">
			{title && <h3>{title}</h3>}
			{subtitle && <sub>{subtitle}</sub>}
			{content && <div>{content}</div>}
			<div className="links-container right-justify ">
				{links &&
					(isExternal
						? links.map(({ link, text }) => (
								<a key={link} href={link}>
									{text}
								</a>
						  ))
						: links.map(({ link, text }) => (
								<Link key={link} href={link}>
									{text}
								</Link>
						  )))}
			</div>
		</div>
	);
}

export default Card;
