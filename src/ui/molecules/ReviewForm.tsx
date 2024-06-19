"use client";

import { useOptimistic, useState } from "react";
import { handleProductReviewSubmissionAction } from "@/api/actions";

import type { ReviewsGetByProductIdQuery } from "@/gql/graphql";

type Review = NonNullable<ReviewsGetByProductIdQuery["product"]>["reviews"][number] & {
	sending?: boolean;
};

export const ReviewForm = ({ reviews, productId }: { reviews: Review[]; productId: string }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [headline, setHeadline] = useState("");
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(1);

	const [optimisticReviews, addOptimisticReview] = useOptimistic(
		reviews,
		(state, action: "SUBMIT") => {
			if (action === "SUBMIT") {
				return [
					...state,
					{
						id: productId,
						name,
						email,
						headline,
						content,
						rating,
						sending: true,
					},
				];
			} else {
				return [...state];
			}
		},
	);

	return (
		<>
			<ul>
				{optimisticReviews &&
					optimisticReviews.map((review) => {
						return (
							<li
								key={review.id}
								className={
									review.sending
										? `border- flex flex-col gap-2 border border-gray-500 bg-slate-200 p-2`
										: `border- flex flex-col gap-2 border border-gray-500 p-2`
								}
							>
								<p>kupujący: {review.name}</p>
								<p>gwiazdki: {review.rating}</p>
								<p>opinia: {review.content}</p>
							</li>
						);
					})}
			</ul>

			<form
				action={async () => {
					addOptimisticReview("SUBMIT");
					await handleProductReviewSubmissionAction({
						productId,
						name,
						email,
						headline,
						content,
						rating,
					});
				}}
			>
				<input type="hidden" name="productId" value={productId} />
				<input
					type="text"
					name="name"
					placeholder="imię"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="email"
					name="email"
					placeholder="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					name="headline"
					placeholder="tytuł"
					required
					value={headline}
					onChange={(e) => setHeadline(e.target.value)}
				/>
				<input
					type="text"
					name="content"
					placeholder="treść"
					required
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<input
					type="number"
					name="rating"
					placeholder="ocena"
					min="1"
					max="5"
					required
					value={rating}
					onChange={(e) => setRating(parseInt(e.target.value, 10))}
				/>
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
