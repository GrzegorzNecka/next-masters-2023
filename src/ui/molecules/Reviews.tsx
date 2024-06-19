import { Typography } from "../atoms/Typography";
import { ReviewForm } from "./ReviewForm";

import { getReviesByProductId } from "@/api/products";

export async function Reviews({ productId }: { productId: string }) {
	const reviews = await getReviesByProductId(productId);

	return (
		<>
			<Typography className="mb-10 mt-4 text-xl font-semibold" isUppercase={true} as="h2">
				Recenzje
			</Typography>
			{reviews ? <ReviewForm productId={productId} reviews={reviews} /> : <p>brak komentarzy</p>}
		</>
	);
}
