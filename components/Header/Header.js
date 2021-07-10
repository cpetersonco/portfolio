import React from "react";

import Frame from "../Frame/Frame";

const images = [
	{
		src: "/profile.jpg",
		alt: "Christian looking stoically into the camera",
	},
	{
		src: "/chess.jpg",
		alt: "Christian being dark and broody at a chess board",
	},
	{
		src: "/blue_steel.jpg",
		alt: "Christian doing his best Blue Steel",
	},
];

function Header() {
	return (
		<div className="header">
			<Frame images={images} />
			<div>
				<h1>Christian Peterson</h1>
				<h4>Software Engineer</h4>
			</div>
		</div>
	);
}

export default Header;
