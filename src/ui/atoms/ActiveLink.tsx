"use client";

import { type UrlObject } from "url";
import clsx from "clsx";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface UrlObjectWithNextRoute<T extends string> extends UrlObject {
	pathname: Route<T>;
}

interface ActiveLinkProps<T extends string> {
	href: Route<T> | UrlObjectWithNextRoute<T>;
	children: React.ReactNode;
	exact?: boolean;
	className?: string;
	activeClassName?: string;
}

export function ActiveLink<T extends string>({
	href,
	children,
	exact = false,
	className = "",
	activeClassName = "text-blue-900 underline",
}: ActiveLinkProps<T>) {
	const matchedPathName = (typeof href === "string" ? href : href.pathname) ?? null;

	const currentPathname = usePathname();

	const isActive = exact
		? currentPathname.startsWith(matchedPathName)
		: currentPathname === matchedPathName;

	return (
		<Link
			aria-current={isActive ? "page" : false}
			className={clsx(className, { [activeClassName]: isActive })}
			href={matchedPathName}
			// href={'/blokg/'}
		>
			{children}
		</Link>
	);
}
