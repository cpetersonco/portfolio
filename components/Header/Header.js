import React from "react";

import Frame from "../Frame/Frame";
import images from "../../constants/images";

function Header() {
	return (
		<div className="header">
			<Frame images={images} />
			<div>
				<h1>Christian Peterson</h1>
				<h3>Software Engineer</h3>
			</div>
		</div>
	);
}

export default Header;
