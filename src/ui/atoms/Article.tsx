"use client";
import clsx from "clsx";

type ArticleProps = {
	children: React.ReactNode;
	className?: string;
};

export const Article = (props: ArticleProps) => {
	const { children, className = "", ...rest } = props;

	return (
		<article {...rest} className={clsx("prose prose-base prose-p:m-0", className)}>
			{children}
		</article>
	);
};
