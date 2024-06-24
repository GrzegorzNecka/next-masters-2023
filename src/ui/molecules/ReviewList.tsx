"use client";

import clsx from "clsx";
import { StaticRates } from "../atoms/StaticRates";
import { type Review } from "./ReviewForm";

export const ReviewList = ({ reviews }: { reviews: Review[] }) => {
	return (
		<ul className="mb-10 grid grid-cols-3 gap-2">
			{reviews.map((review) => (
				<li
					key={review.id}
					className={clsx(
						"rounded-md border p-6",
						review.sending
							? "border-stone-3000 bg-stone-50 text-stone-300"
							: "border-stone-300 bg-white text-stone-900",
					)}
				>
					<div
						className={clsx(
							"flex justify-between border-b pb-3 uppercase",
							review.sending ? "border-stone-300" : "border-stone-900",
						)}
					>
						<span className="text-xs font-bold">{review.name}</span>
						<StaticRates count={review.rating} />
					</div>
					<div className="flex-col pt-3">
						<h2 className="text-m font-bold">{review.headline}</h2>
						<p className="text-sm">{review.content}</p>
					</div>
				</li>
			))}
		</ul>
	);
};
