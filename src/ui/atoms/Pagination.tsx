import Link from "next/link";

import clsx from "clsx";
import { type AssetConnection } from "@/gql/graphql";
import { countPages } from "@/utils/product";
import { convertCountIntoArray } from "@/utils/common";

type PaginationProps = Omit<AssetConnection, "edges"> & {
	params: { category: string; pageNumber: string };
};

export function Pagination({ pageInfo, aggregate, params }: PaginationProps) {
	const { hasNextPage, hasPreviousPage } = pageInfo;
	const pages = countPages(aggregate.count);
	const pageArray = convertCountIntoArray(pages.length);

	if (isNaN(Number(params.pageNumber))) {
		throw TypeError("params.pageNumber should be able to convert to a number type");
	}

	const pageNumber = Number(params.pageNumber);

	if (pages.length === 1) {
		return null;
	}

	return (
		<nav className="flesx- mt-20 flex w-full flex-row justify-center py-2">
			<ul className="flex flex-row items-center gap-3 ">
				<li>
					<Link
						className={clsx("pr-3", {
							"cursor-default text-slate-300 ": !hasPreviousPage,
						})}
						href={hasPreviousPage ? `/products/${params.category}/${pageNumber - 1}` : "#"}
					>
						prev
					</Link>
				</li>

				{pageArray.map((pageNumber) => (
					<li key={pageNumber}>
						<Link
							className={clsx(
								"flex cursor-pointer items-center justify-center border-b-2 px-3 hover:border-black",
								{
									"border-black": Number(params.pageNumber) === pageNumber,
								},
							)}
							href={`/products/${params.category}/${pageNumber}`}
						>
							{pageNumber}
						</Link>
					</li>
				))}

				<li>
					<Link
						className={clsx("pl-3", {
							"cursor-default text-slate-300 ": !hasNextPage,
						})}
						href={hasNextPage ? `/products/${params.category}/${pageNumber + 1}` : "#"}
					>
						next
					</Link>
				</li>
			</ul>
		</nav>
	);
}
