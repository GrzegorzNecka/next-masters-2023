"use client";
import clsx from "clsx";

export type ButtonAs = "button" | "a";

export type ButtonSize =
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

export type ButtonColors = "text-inherit" | "text-gray-950";

type ButtonProps = {
	as?: ButtonAs;
	isUppercase?: boolean;
	color?: ButtonColors;
	children: React.ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler;
	isDisabled?: boolean;
	type?: "button" | "submit";
};

export const Button = ({
	as = "button",
	isUppercase = false,
	children,
	className = "",
	onClick,
	isDisabled,
	type = "button",
	...rest
}: ButtonProps) => {
	const T = as;

	return (
		<T
			{...rest}
			className={clsx({ uppercase: isUppercase }, className)}
			onClick={onClick}
			disabled={isDisabled}
			type={type}
		>
			{children}
		</T>
	);
};
