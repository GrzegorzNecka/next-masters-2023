export default async function SingleProduct({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	// const product = await getProductById(params.productId);
	const referral = searchParams?.referral?.toString();

	return (
		<div>
			<h1>Single product page</h1>
			{params.productId}
			<p>Referral: {referral}</p>
		</div>
	);
}
