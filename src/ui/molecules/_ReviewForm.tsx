"use client";

import { handleProductReviewSubmissionAction } from "@/api/actions";

import type { ReviewsGetByProductIdQuery } from "@/gql/graphql";

type Review = NonNullable<ReviewsGetByProductIdQuery["product"]>["reviews"][number];

export const ReviewForm = async ({
	reviews,
	productId,
}: {
	reviews: Review[];
	productId: string;
}) => {
	return (
		<>
			<ul>
				{reviews &&
					reviews.map((review) => {
						return (
							<li
								key={review.id}
								className="border- flex flex-col gap-2 border border-gray-500 p-2"
							>
								<p>kupujący: {review.name}</p>
								<p>gwiazdki: {review.rating}</p>
								<p>opinia: {review.content}</p>
							</li>
						);
					})}
			</ul>

			<form action={handleProductReviewSubmissionAction}>
				<input type="hidden" name="productId" value={productId} required />
				<input type="text" name="name" placeholder="imię" required />
				<input type="email" name="email" placeholder="email" required />
				<input type="text" name="headline" placeholder="tytuł" required />
				<input type="text" name="content" placeholder="treść" required />
				<input type="number" name="rating" placeholder="ocena" min="1" max="5" required />
				<button
					className="rounded-sm border bg-slate-100 px-6 py-2 shadow-sm disabled:cursor-wait disabled:bg-slate-800"
					type="submit"
				>
					Dodaj do recenzję
				</button>
			</form>
		</>
	);
};
