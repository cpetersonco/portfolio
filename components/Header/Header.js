import React from "react";
import Image from "next/image";

import Frame from "../Frame/Frame";
import styles from "./Header.module.css";

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
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>Christian Peterson</h1>
				<h4>Software Engineer</h4>
			</header>
			<Frame images={images} />
		</div>
	);
}

export default Header;
