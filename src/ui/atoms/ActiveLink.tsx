"use client";

import { type UrlObject } from "url";
import clsx from "clsx";

import type { Route } from "next";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface UrlObjectWithNextRoute<T extends string> extends UrlObject {
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

	const { locale } = useParams();
	const localeAsString = Array.isArray(locale) ? locale[0] : locale;

	const currentPathname = usePathname();

	const isHome = currentPathname === `/${localeAsString}`;

	const currentPathnameWithoutLocale = isHome
		? currentPathname.replace(`/${localeAsString}`, "/")
		: currentPathname.replace(`/${localeAsString}`, "");

	const isActive = exact
		? currentPathnameWithoutLocale.startsWith(matchedPathName)
		: currentPathnameWithoutLocale === matchedPathName;

	return (
		<Link
			aria-current={isActive ? "page" : false}
			className={clsx(className, { [activeClassName]: isActive })}
			href={matchedPathName}
		>
			{children}
		</Link>
	);
}
