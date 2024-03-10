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
	isActiveRule?: boolean;
}

export function ActiveLink<T extends string>({
	href,
	children,
	exact = false,
	className = "",
	activeClassName = "border-black",
	isActiveRule = false,
}: ActiveLinkProps<T>) {
	const defaultClassName = `${className} border-b-2 hover:border-black`;
	const matchedPathName = (typeof href === "string" ? href : href.pathname) ?? null;

	const currentPathname = usePathname();

	const isActive = isActiveRule
		? isActiveRule
		: exact
			? currentPathname.startsWith(matchedPathName)
			: currentPathname === matchedPathName;

	return (
		<Link
			aria-current={isActive ? "page" : false}
			className={clsx(defaultClassName, {
				[activeClassName]: isActive,
				"border-transparent": !isActive,
			})}
			href={matchedPathName}
		>
			{children}
		</Link>
	);
}
