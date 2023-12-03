"use client";

import Link from "next/link";
import clsx from "clsx";
import { useParams, usePathname } from "next/navigation";

export const ActiveLink = ({ slug, children }: { slug: string; children: React.ReactNode }) => {
	const pathname = usePathname();
	const params = useParams();

	const location = params?.locale as string;

	const isHome = slug === "/";

	const url = isHome ? `/${location}` : `/${location}${slug}`;

	const isActive = url === pathname;

	return (
		<Link className={clsx("", isActive && "text-blue-900 underline")} href={slug}>
			{children}
		</Link>
	);
};
