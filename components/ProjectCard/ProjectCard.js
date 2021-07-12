import React from "react";

import Card from "../Card/Card";

function ProjectCard({ title, subtitle, description, link }) {
	console.log(title);
	return (
		<Card
			title={title}
			subtitle={subtitle}
			content={<p>{description}</p>}
			link={link}
			isExternal={true}
		/>
	);
}

export default ProjectCard;
