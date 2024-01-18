import Image from "next/image";

type ProductSingleCoverImageProps = {
	image?: { url: string };
	alt?: string;
};

export const ProductSingleCoverImage = ({ image, alt = "" }: ProductSingleCoverImageProps) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border ">
			<Image
				width={380}
				height={380}
				className="h-full w-full object-cover object-center"
				alt={alt}
				src={image?.url || "/images/product-placeholder.jpg"}
			/>
		</div>
	);
};
