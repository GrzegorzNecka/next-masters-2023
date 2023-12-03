"use client";

import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
	useSelectedLayoutSegment,
	useSelectedLayoutSegments,
} from "next/navigation";
import { useState } from "react";

export const ProductCounter = ({ children }: { children: React.ReactNode }) => {
	console.log("useRouter", useRouter());
	console.log("useParams", useParams());
	console.log("useSearchParams", useSearchParams());
	console.log("usePathname", usePathname());
	console.log("useSelectedLayoutSegment", useSelectedLayoutSegment());
	console.log("useSelectedLayoutSegmentss", useSelectedLayoutSegments());

	const [counter, setCounter] = useState(0);

	return (
		<div>
			<button onClick={() => setCounter(() => counter - 1)}>-</button>
			<input readOnly value={counter} />
			<button onClick={() => setCounter(() => counter + 1)}>-</button>
			{children}
		</div>
	);
};
