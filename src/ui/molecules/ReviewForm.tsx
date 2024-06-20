"use client";

import { startTransition, useEffect, useOptimistic, useRef } from "react";
import { handleProductReviewSubmissionAction } from "@/api/actions";

import type { ReviewsGetByProductIdQuery } from "@/gql/graphql";

type Review = NonNullable<ReviewsGetByProductIdQuery["product"]>["reviews"][number] & {
	sending?: boolean;
};

export const ReviewForm = ({ reviews, productId }: { reviews: Review[]; productId: string }) => {
	const formRef = useRef<HTMLFormElement>(null);

	const [optimisticReviews, addOptimisticReview] = useOptimistic(
		reviews,
		(state, action: { review: Review; type: "SUBMIT" }) => {
			if (action.type === "SUBMIT") {
				return [
					...state,
					{
						id: productId,
						name: action.review.name,
						email: action.review.email,
						headline: action.review.headline,
						content: action.review.content,
						rating: action.review.rating,
						sending: true,
					},
				];
			} else {
				return [...state];
			}
		},
	);

	useEffect(() => {
		const allSent = optimisticReviews.every((review) => !review.sending);
		if (allSent && formRef.current) {
			formRef.current.reset();
		}
	}, [optimisticReviews]);

	const updateOptimisticReview = (e: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(e.currentTarget);

		const review = {
			id: productId,
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			headline: formData.get("headline") as string,
			content: formData.get("content") as string,
			rating: Number(formData.get("rating")),
		};

		startTransition(() => {
			addOptimisticReview({
				type: "SUBMIT",
				review,
			});
		});
	};

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
				ref={formRef}
				action={handleProductReviewSubmissionAction}
				onSubmit={(e) => updateOptimisticReview(e)}
			>
				<input type="hidden" name="productId" value={productId} />
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
