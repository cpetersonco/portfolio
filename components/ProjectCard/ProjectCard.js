import React from "react";

import Card from "../Card/Card";

function ProjectCard({ title, subtitle, description, link, repo }) {
	return (
		<Card
			title={title}
			subtitle={subtitle}
			content={<p>{description}</p>}
			links={[
				{ text: `Go to ${title}`, link },
				{ text: "Github", link: repo },
			]}
			isExternal={true}
		/>
	);
}

export default ProjectCard;
