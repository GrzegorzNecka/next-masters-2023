import Image from "next/image";

type ProductSingleImageProps = {
	coverImage: { src: string; alt: string };
};

export const ProductSingleImage = ({ coverImage }: ProductSingleImageProps) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border ">
			<Image
				width={380}
				height={380}
				className="h-full w-full object-cover object-center"
				alt={coverImage.alt}
				src={coverImage.src}
			/>
		</div>
	);
};
