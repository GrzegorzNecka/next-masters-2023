"use client";

import React, { useEffect, useOptimistic, useRef, useState, useTransition } from "react";
// import clsx from "clsx";

import { Loader2 } from "lucide-react";
import { ActiveRates } from "../atoms/ActiveRates";
// import { OutputRates } from "../atoms/OutputRates";

import { ReviewList } from "./ReviewList";
import { handleProductReviewSubmissionAction } from "@/api/actions";

import type { ReviewsGetByProductIdQuery } from "@/gql/graphql";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type Review = NonNullable<ReviewsGetByProductIdQuery["product"]>["reviews"][number] & {
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
			{optimisticReviews && <ReviewList reviews={optimisticReviews} />}

			<form
				className="grid-row grid w-1/2 gap-2"
				ref={formRef}
				action={handleProductReviewSubmissionAction}
				onSubmit={(e) => updateOptimisticReview(e)}
			>
				<input type="hidden" name="productId" value={productId} />
				<Input distances="lg" type="text" name="name" required placeholder="imię" />
				<Input
					distances="lg"
					variant="default"
					type="email"
					name="email"
					required
					placeholder="email"
				/>
				<Input
					distances="lg"
					variant="default"
					type="text"
					name="headline"
					required
					placeholder="tytuł"
				/>
				<Textarea name="content" placeholder="treść" required />
				<ActiveRates selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
				<Button variant="default" type="submit" disabled={isPending}>
					{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
					Dodaj recenzję
				</Button>
			</form>
		</>
	);
};
