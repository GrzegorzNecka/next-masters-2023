"use client";

import clsx from "clsx";
import { OutputRates } from "../atoms/OutputRates";
import { type Review } from "./ReviewForm";

export const ReviewList = ({ reviews }: { reviews: Review[] }) => {
	return (
		<ul className="mb-10 grid grid-cols-3 gap-2">
			{reviews.map((review) => (
				<li
					key={review.id}
					className={clsx(
						"rounded-md border border-white p-6",
						review.sending ? "bg-stone-300 text-stone-700" : "bg-stone-200 text-stone-900",
					)}
				>
					<div className="flex justify-between border-b border-white pb-3 uppercase">
						<span className="text-xs font-bold">{review.name}</span>
						<OutputRates count={review.rating} />
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
