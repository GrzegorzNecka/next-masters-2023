"use client";

import { Star } from "lucide-react";

export const OutputRates = ({ count }: { count: number }) => {
	return (
		<div className="flex">
			{Array.from({ length: 5 }, (_, index) => (
				<Star
					size={15}
					key={index}
					fill={index < count ? "gold" : "grey"} // Change fill based on count
					strokeWidth={1}
					stroke={index < count ? "orange" : "grey"} // Change stroke based on count
				/>
			))}
		</div>
	);
};
