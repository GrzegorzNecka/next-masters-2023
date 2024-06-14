import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/api/products";
export const runtime = "edge";

export const alt = "About Acme";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function OgImage({ params }: { params: { productSlug: string } }) {
	const product = await getProductBySlug(params.productSlug);

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				tw="bg-green-500"
				style={{
					background: "white",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{product?.images?.at(0)?.url && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						width={400}
						height={400}
						src={product?.images?.at(0)?.url}
						alt={product?.name ?? ""}
					/>
				)}
				<hr tw="w-1/2 h-[1px] bg-gray-300" />
				<div tw="flex items-center flex-col">
					<p tw="text-6xl font-bold">Super Sklep</p>
					<p tw="text-4xl font-bold">{product?.name}</p>
				</div>
			</div>
		),
		// ImageResponse options
		{
			...size,
		},
	);
}
