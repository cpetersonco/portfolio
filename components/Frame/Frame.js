import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./Frame.module.css";

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
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.frame}>
				<Image
					src={images[index].src}
					alt={images[index].alt}
					width={300}
					height={300}
				/>
			</div>
			<div className={styles.caption}>{images[index].alt}</div>
		</div>
	);
}

export default Frame;
