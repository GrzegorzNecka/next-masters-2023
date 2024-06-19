"use client";

import type { ReviewsGetByProductIdQuery } from "@/gql/graphql";

type Review = NonNullable<ReviewsGetByProductIdQuery["product"]>["reviews"][number];

export const ReviewListItem = ({ review }: { review: Review }) => {
	return (
		<li className="border- flex flex-col gap-2 border border-gray-500 p-2">
			<p>kupujący: {review.name}</p>
			<p>gwiazdki: {review.rating}</p>
			<p>opinia: {review.content}</p>
		</li>
	);
};
