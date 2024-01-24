import { type Metadata } from "next/types";
import Image from "next/image";
import Link from "next/link";
import { getCollectionsList } from "@/api/collections";
import { Typography } from "@/ui/atoms/Typography";

export const metadata: Metadata = {
	title: "kolekcje",
	description: "kolekcje opis",
};

export default async function CollectionsPage() {
	const collections = await getCollectionsList();

	return (
		<>
			<ul className="flex gap-2">
				{collections.map((collection) => {
					return (
						<li key={collection.id}>
							<Link href={`/collections/${collection.slug}`}>
								<Image
									className="object-cover"
									src={`${collection.image.url}`}
									width={collection.image.width ?? 0}
									height={collection.image.height ?? 0}
									alt={collection.name}
								/>
								<Typography as="h2">{collection.name}</Typography>
								<Typography as="p"> {collection.description}</Typography>
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}
