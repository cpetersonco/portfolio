import React, { useState, useEffect } from "react";
import Image from "next/image";

function Frame({ images }) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		let timer = setInterval(function () {
			setIndex((prev) => {
				if (prev >= images.length - 1) {
					return 0;
				} else {
					return prev + 1;
				}
			});
		}, 5000);

		return () => clearInterval(timer);
	}, [images.length]);

	return (
		<div className="img-card col-left">
			<div className="frame">
				<Image
					src={images[index].src}
					alt={images[index].alt}
					width={300}
					height={300}
				/>
			</div>
			<div className="caption">{images[index].alt}</div>
		</div>
	);
}

export default Frame;
