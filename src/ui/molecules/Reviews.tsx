import { OutputRates } from "../atoms/OutputRates";
import { Typography } from "../atoms/Typography";
import { ReviewForm } from "./ReviewForm";

import { getReviesByProductId } from "@/api/products";

export async function Reviews({ productId }: { productId: string }) {
	const reviews = await getReviesByProductId(productId);

	const averageRating = reviews
		? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
		: 0;

	return (
		<>
			<div className="flex  justify-between">
				<Typography className="mb-10 mt-4 text-xl font-semibold" isUppercase={true} as="h2">
					Recenzje
				</Typography>
				{reviews && (
					<div>
						średnia ocen: {Math.ceil(averageRating)}{" "}
						<OutputRates count={Math.ceil(averageRating)} />
					</div>
				)}
			</div>
			{reviews ? <ReviewForm productId={productId} reviews={reviews} /> : <p>brak komentarzy</p>}
		</>
	);
}
