import { StaticRates } from "../atoms/StaticRates";
import { Typography } from "../atoms/Typography";
import { type Review, ReviewForm } from "./ReviewForm";

import { getReviesByProductId } from "@/api/products";

function calculateAverageRating(reviews: Review[] | undefined | null) {
	if (!reviews || reviews.length === 0) {
		return null;
	}
	const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
	return totalRating === 0 ? null : Math.ceil(totalRating / reviews.length);
}

export async function Reviews({ productId }: { productId: string }) {
	const reviews = await getReviesByProductId(productId);
	const averageRating = calculateAverageRating(reviews);

	return (
		<>
			<div className="flex  justify-between">
				<Typography className="mb-10 mt-4 text-xl font-semibold" isUppercase={true} as="h2">
					Recenzje
				</Typography>
				{averageRating && (
					<div>
						średnia ocen: {averageRating}
						<StaticRates count={Math.ceil(averageRating)} />
					</div>
				)}
			</div>
			{reviews ? <ReviewForm productId={productId} reviews={reviews} /> : <p>brak komentarzy</p>}
		</>
	);
}
