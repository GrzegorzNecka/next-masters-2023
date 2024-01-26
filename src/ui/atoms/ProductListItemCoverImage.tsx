import Image from "next/image";

type ProductListItemCoverImageProps = {
	image: { url: string };
	alt: string;
};

export const ProductListItemCoverImage = ({ image, alt }: ProductListItemCoverImageProps) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border border-stone-200 bg-stone-300">
			<Image
				width={300}
				height={300}
				className="h-full w-full  object-cover object-center p-3 transition-transform hover:scale-105"
				alt={alt}
				src={image.url}
			/>
		</div>
	);
};
