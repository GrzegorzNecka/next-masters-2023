import { revalidateTag } from "next/cache";
import { Suspense } from "react";
import { ReviewList } from "./ReviewList";
import { createReviewByProductId, publishReviewById } from "@/api/products";

export function ReviewForm({ productId }: { productId: string }) {
	async function addReviewAction(formData: FormData) {
		"use server";

		const { productId, name, email, headline, content, rating } = Object.fromEntries(
			formData.entries(),
		);

		if (
			typeof productId !== "string" ||
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof headline !== "string" ||
			typeof content !== "string" ||
			!Number.isInteger(Number(rating))
		) {
			console.error("Invalid form data");
			return;
		}

		const id = await createReviewByProductId({
			productId,
			name,
			email,
			content,
			rating: Number(rating),
			headline,
		});

		console.log("reviewId", id);

		if (!id) {
			console.error("Invalid review id");
			return;
		}

		const review = await publishReviewById({ id });

		console.log("review", review);

		revalidateTag(`review-product-id-${productId}`);
	}

	return (
		<>
			<Suspense fallback={"ładownienie"}>
				<ReviewList productId={productId} />
			</Suspense>
			<form action={addReviewAction}>
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
}
