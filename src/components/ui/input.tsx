import * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = {
	variant: {
		default: "border-black",
		error: "border-red-500",
	},
	distances: {
		default: "h-10 px-3 py-2",
		sm: "h-8 rounded-md px-3",
		lg: "h-11 rounded-md px-3",
	},
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	variant?: keyof typeof inputVariants.variant;
	distances?: keyof typeof inputVariants.distances;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant = "default", distances = "default", type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex  w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className,
					inputVariants.variant[variant],
					inputVariants.distances[distances],
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
