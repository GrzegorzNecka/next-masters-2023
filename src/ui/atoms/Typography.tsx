"use client";
import clsx from "clsx";

export type TypographyAs =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "p"
	| "span"
	| "small"
	| "figcaption";

export type TypographySize =
	| "text-xs"
	| "text-sm"
	| "text-base"
	| "text-lg"
	| "text-xl"
	| "text-2xl"
	| "text-3xl"
	| "text-4xl"
	| "text-5xl"
	| "text-6xl";

export type TypographyColors = "text-inherit" | "text-gray-950";

type TypographyProps = {
	as?: TypographyAs;
	isUppercase?: boolean;
	color?: TypographyColors;
	children: React.ReactNode;
	className?: string;
};

export const Typography = (props: TypographyProps) => {
	const { as = "p", isUppercase = false, children, className = "", ...rest } = props;

	const T = as;

	return (
		<T {...rest} className={clsx({ uppercase: isUppercase }, className)}>
			{children}
		</T>
	);
};
