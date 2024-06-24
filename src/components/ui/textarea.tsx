"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const textareaVariants = {
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

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	variant?: keyof typeof textareaVariants.variant;
	distances?: keyof typeof textareaVariants.distances;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, variant = "default", distances = "default", ...props }, ref) => {
		return (
			<textarea
				className={cn(
					"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className,
					textareaVariants.variant[variant],
					textareaVariants.distances[distances],
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Textarea.displayName = "Textarea";

export { Textarea };
