import React, { useEffect, useReducer } from "react";
import Image from "next/image";
import chess from "../../public/chess.jpg";
import blueSteel from "../../public/blue_steel.jpg";
import profile from "../../public/profile.jpg";

const images = [
	{
		src: profile,
		alt: "Christian looking stoically into the camera",
	},
	{
		src: chess,
		alt: "Christian being dark and broody at a chess board",
	},
	{
		src: blueSteel,
		alt: "Christian doing his best Blue Steel",
	},
];

function Frame({ images }) {
	const [index, incrementIndex] = useReducer((prev) => {
		return (prev + 1) % images.length;
	}, 0);

	useEffect(() => {
		let timer = setInterval(function () {
			incrementIndex();
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="img-card col-left">
			<div className="frame">
				<Image
					src={profile}
					alt={images[0].alt}
					width={200}
					height={200}
					priority={true}
					placeholder={"blur"}
				/>
			</div>
		</div>
	);
}

export default Frame;
