import React from "react";
import { RichText } from "prismic-reactjs";

import Card from "../Card/Card";

function PostPreview({ title, href, preview, date }) {
	return (
		<Card
			title={title}
			subtitle={new Date(date).toLocaleDateString()}
			content={RichText.render(preview)}
			links={[{ text: "See more...", link: href }]}
			isExternal={false}
		/>
	);
}

export default PostPreview;
