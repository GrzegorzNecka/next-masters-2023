import { OutputRates } from "../atoms/OutputRates";
import { Typography } from "../atoms/Typography";
import { ReviewForm } from "./ReviewForm";

import { getReviesByProductId } from "@/api/products";

export async function Reviews({ productId }: { productId: string }) {
	const reviews = await getReviesByProductId(productId);

	// if (!reviews) return;

	const averageReviews = reviews
		? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
		: 0;

	return (
		<>
			<div className="flex  justify-between">
				<Typography className="mb-10 mt-4 text-xl font-semibold" isUppercase={true} as="h2">
					Recenzje
				</Typography>
				{reviews && (
					<p>
						średnia ocen: {Math.ceil(averageReviews)}{" "}
						<OutputRates count={Math.ceil(averageReviews)} />
					</p>
				)}
			</div>
			{reviews ? <ReviewForm productId={productId} reviews={reviews} /> : <p>brak komentarzy</p>}
		</>
	);
}
