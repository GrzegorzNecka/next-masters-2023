import Link from "next/link";
import { type AssetConnection } from "@/gql/graphql";
import { countPages } from "@/utils/product";

type AssetConnectionWithoutEdges = Omit<AssetConnection, "edges">;

export function Pagination({ pageInfo, aggregate }: AssetConnectionWithoutEdges) {
	console.log(pageInfo);

	// const { pageSize, hasNextPage, hasPreviousPage } = pageInfo;

	// const pageSize = pageInfo?.pageSize ?? 0;

	// console.log(pageSize);

	// const pageTotal = Math.ceil(aggregate.count / pageSize);

	// console.log(pageTotal);

	const pages = countPages(aggregate.count);

	const pageArray = Array.from(Array(pages.length).keys()).map((i) => i + 1);

	return (
		<>
			{/* <pre>{JSON.stringify(pageArray, null, 2)}</pre>
			<pre>{JSON.stringify(aggregate, null, 2)}</pre>
			<pre>{JSON.stringify(pageInfo, null, 2)}</pre> */}
			<ul className="flex flex-row ">
				{pageArray.map((pageNumber) => (
					<li className="cursor-pointer border border-r-slate-200 " key={pageNumber}>
						<Link className="p-4 hover:underline " href={`/products/accessories/${pageNumber}`}>
							{pageNumber}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
