import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Breadcrumbs = () => {
	const router = useRouter();
	const [breadcrumbs, setBreadcrumbs] = useState(null);

	useEffect(() => {
		if (router) {
			const linkPath = router.asPath.split("/");
			linkPath.shift();

			const pathArray = linkPath.map((path, i) => {
				return {
					breadcrumb: path,
					href: "/" + linkPath.slice(0, i + 1).join("/"),
				};
			});

			setBreadcrumbs(pathArray);
		}
	}, [router]);

	if (!breadcrumbs) {
		return null;
	}

	return (
		<nav aria-label="breadcrumbs">
			<ol className="breadcrumb">
				<li>
					<a href="/">home</a>
				</li>
				{breadcrumbs.map((breadcrumb) => {
					return (
						<>
							<li className="breadcrumb-separator">/</li>
							<li key={breadcrumb.href}>
								<Link href={breadcrumb.href}>
									<a>{breadcrumb.breadcrumb}</a>
								</Link>
							</li>
						</>
					);
				})}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
