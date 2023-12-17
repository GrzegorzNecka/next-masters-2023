"use client";

import Link from "next/link";
import clsx from "clsx";
import { useParams, usePathname } from "next/navigation";
//https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links

type ActiveLinkProps = {
	slug: { pathname: string };
	children: React.ReactNode;
};

export const ActiveLink = ({ slug, children }: ActiveLinkProps) => {
	const pathname = usePathname();
	const params = useParams();

	const location = params?.locale as string;

	const isHome = slug.pathname === "/";

	const url = isHome ? `/${location}` : `/${location}${slug.pathname}`;

	const isActive = url === pathname;

	return (
		<Link className={clsx("", isActive && "text-blue-900 underline")} href={slug}>
			{children}
		</Link>
	);
};
