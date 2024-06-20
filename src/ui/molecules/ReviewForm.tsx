"use client";

import { Suspense, useEffect, useOptimistic, useRef, useTransition } from "react";
import clsx from "clsx";
import { Button } from "../atoms/Button";
import { handleProductReviewSubmissionAction } from "@/api/actions";

import type { ReviewsGetByProductIdQuery } from "@/gql/graphql";

type Review = NonNullable<ReviewsGetByProductIdQuery["product"]>["reviews"][number] & {
	sending?: boolean;
};

export const ReviewForm = ({ reviews, productId }: { reviews: Review[]; productId: string }) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [isPending, startTransition] = useTransition();
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
			<Suspense fallback={<div>Loading...</div>}>
				<ul className="mb-10 grid grid-cols-3 gap-2">
					{optimisticReviews &&
						optimisticReviews.map((review) => {
							return (
								<li
									key={review.id}
									className={clsx(
										"rounded-md border border-white p-6",
										review.sending ? "bg-stone-300 text-stone-700" : "bg-stone-200 text-stone-900",
									)}
								>
									<div className="flex justify-between border-b border-white pb-3 uppercase">
										<span className="text-xs font-bold"> {review.name}</span>
										<span className="text-xs font-bold"> {review.rating}</span>
									</div>

									<div className="flex-col pt-3">
										<h2 className="text-m font-bold">{review.headline}</h2>
										<p className="text-sm"> {review.content}</p>
									</div>
								</li>
							);
						})}
				</ul>
			</Suspense>
			<form
				className="grid grid-cols-2 gap-2"
				ref={formRef}
				action={handleProductReviewSubmissionAction}
				onSubmit={(e) => updateOptimisticReview(e)}
			>
				<input type="hidden" name="productId" value={productId} />
				<input type="text" name="name" placeholder="imię" required />
				<input type="email" name="email" placeholder="email" required />
				<input type="text" name="headline" placeholder="tytuł" required />
				<input type="text" name="content" placeholder="treść" required />

				<div>
					<input type="radio" id="star5" name="rating" value="5" />
					<label htmlFor="star5" title="5 stars">
						★
					</label>
					<input type="radio" id="star4" name="rating" value="4" />
					<label htmlFor="star4" title="4 stars">
						★
					</label>
					<input type="radio" id="star3" name="rating" value="3" />
					<label htmlFor="star3" title="3 stars">
						★
					</label>
					<input type="radio" id="star2" name="rating" value="2" />
					<label htmlFor="star2" title="2 stars">
						★
					</label>
					<input type="radio" id="star1" name="rating" value="1" />
					<label htmlFor="star1" title="1 star">
						★
					</label>
				</div>
				<Button
					type="submit"
					isDisabled={isPending}
					className="rounded-sm border bg-slate-100 px-6 py-2 shadow-sm disabled:cursor-wait disabled:bg-slate-800"
				>
					Dodaj do recenzję
				</Button>
			</form>
		</>
	);
};
