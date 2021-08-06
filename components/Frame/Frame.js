import React, { useState, useEffect, useReducer } from "react";
import Image from "next/image";

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
					src={images[index].src}
					alt={images[index].alt}
					width={200}
					height={200}
					priority={true}
				/>
			</div>
			<div className="caption">{images[index].alt}</div>
		</div>
	);
}

export default Frame;
