"use client";

import { useOptimistic } from "react";

export const IncrementProductQuantity = ({ quantity }: { quantity: number }) => {
	const [optimisticQuantit, setOptimisticQuantity] = useOptimistic(quantity);

	return (
		<>
			<form>
				{optimisticQuantit}
				<button
					formAction={async () => {
						setOptimisticQuantity(optimisticQuantit + 1);
					}}
					className="  ml-2 h-8 w-8 border bg-slate-50"
				>
					+
				</button>
				;
			</form>
		</>
	);
};
