"use client";

import React, { Suspense, useEffect, useOptimistic, useRef, useState, useTransition } from "react";
import clsx from "clsx";

import { Button } from "../atoms/Button";
import { ActiveRates } from "../atoms/ActiveRates";
import { OutputRates } from "../atoms/OutputRates";
import { handleProductReviewSubmissionAction } from "@/api/actions";

import type { ReviewsGetByProductIdQuery } from "@/gql/graphql";

type Review = NonNullable<ReviewsGetByProductIdQuery["product"]>["reviews"][number] & {
	sending?: boolean;
};

export const ReviewForm = ({ reviews, productId }: { reviews: Review[]; productId: string }) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [isPending, startTransition] = useTransition();
	const [selectedRating, setSelectedRating] = useState<number>(0);
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
			setSelectedRating(0);
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
										<OutputRates count={review.rating} />
									</div>

									<div className="flex-col pt-3">
										<h2 className="text-m font-bold">{review.headline}</h2>
										<p className="text-sm"> {review.content} </p>
									</div>
								</li>
							);
						})}
				</ul>
			</Suspense>
			<form
				className="grid-row grid w-1/2 gap-2"
				ref={formRef}
				action={handleProductReviewSubmissionAction}
				onSubmit={(e) => updateOptimisticReview(e)}
			>
				<input type="hidden" name="productId" value={productId} />
				<input
					className="rounded border border-b-stone-300 bg-stone-100 p-4"
					type="text"
					name="name"
					placeholder="imię"
					required
				/>
				<input
					className="rounded border border-b-stone-300 bg-stone-100 p-4"
					type="email"
					name="email"
					placeholder="email"
					required
				/>
				<input
					className="rounded border border-b-stone-300 bg-stone-100 p-4"
					type="text"
					name="headline"
					placeholder="tytuł"
					required
				/>
				<textarea
					className="rounded border border-b-stone-300 bg-stone-100 p-4"
					name="content"
					placeholder="treść"
					required
				/>

				<div className="flex gap-2">
					<ActiveRates selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
				</div>

				<Button type="submit" isDisabled={isPending}>
					Dodaj recenzję
				</Button>
			</form>
		</>
	);
};
