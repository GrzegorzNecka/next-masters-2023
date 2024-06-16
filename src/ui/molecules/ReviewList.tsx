import { ReviewListItem } from "../atoms/ReviewListItem";
import { Typography } from "../atoms/Typography";
import { getReviesByProductId } from "@/api/products";

export const ReviewList = async ({ productId }: { productId: string }) => {
	const reviews = await getReviesByProductId(productId);
	// await sleep(5000);

	return (
		<>
			<Typography className="mb-10 mt-4 text-xl font-semibold" isUppercase={true} as="h2">
				Recenzje
			</Typography>

			<ul>
				{reviews &&
					reviews.map((review) => {
						return <ReviewListItem key={review.id} review={review} />;
					})}
			</ul>
		</>
	);
};
