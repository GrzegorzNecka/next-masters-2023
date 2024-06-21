"use client";
import { Star } from "lucide-react";
import React, { useState } from "react";

type ActiveRatesProps = {
	selectedRating: number;
	setSelectedRating: (value: number) => void;
};
export const ActiveRates = ({ selectedRating, setSelectedRating }: ActiveRatesProps) => {
	const [hoverRating, setHoverRating] = useState<number>(0);

	return (
		<>
			{[1, 2, 3, 4, 5].map((val) => (
				<React.Fragment key={val}>
					<input
						hidden
						type="radio"
						id={`star${val}`}
						name="rating"
						value={val}
						onChange={() => setSelectedRating(val)}
						checked={selectedRating === val}
					/>
					<label
						className="cursor-pointer"
						onMouseEnter={() => setHoverRating(val)}
						onMouseLeave={() => setHoverRating(0)}
						htmlFor={`star${val}`}
						title={`${val} star${val > 1 ? "s" : ""}`}
					>
						<Star
							fill={selectedRating >= val ? "gold" : "white"}
							strokeWidth={1}
							stroke={
								hoverRating >= val
									? "orange"
									: "white" && selectedRating >= val
										? "orange"
										: "white"
							}
						/>
					</label>
				</React.Fragment>
			))}
		</>
	);
};
