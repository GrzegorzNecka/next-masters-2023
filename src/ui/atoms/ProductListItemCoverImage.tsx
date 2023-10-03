import Image from "next/image";

type ProductListItemCoverImageProps = {
	coverImage: { src: string; alt: string };
};

export const ProductListItemCoverImage = ({ coverImage }: ProductListItemCoverImageProps) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border border-stone-200 bg-stone-300">
			<Image
				width={420}
				height={420}
				className="h-full w-full  object-cover object-center p-3 transition-transform hover:scale-105"
				alt={coverImage.alt}
				src={coverImage.src}
			/>
		</div>
	);
};
