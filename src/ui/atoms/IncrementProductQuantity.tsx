"use client";

import { useOptimistic } from "react";
import { changeItemQuantity } from "@/api/actions";

export const IncrementProductQuantity = ({
	quantity,
	itemId,
}: {
	quantity: number;
	itemId: string;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		{ quantity },
		(state, action: "INREACSE" | "DECREASE") => {
			if (action === "INREACSE") {
				return { quantity: state.quantity + 1 };
			} else {
				return { quantity: state.quantity - 1 };
			}
		},
	);

	return (
		<>
			<form className="flex">
				<button
					className="h-6 w-6 border"
					type="submit"
					formAction={async () => {
						setOptimisticQuantity("DECREASE");
						await changeItemQuantity(itemId, optimisticQuantity.quantity - 1);
					}}
				>
					-
				</button>
				<span className="w-8 text-center">{optimisticQuantity.quantity}</span>
				<button
					className="h-6 w-6 border"
					type="submit"
					formAction={async () => {
						setOptimisticQuantity("INREACSE");
						await changeItemQuantity(itemId, optimisticQuantity.quantity + 1);
						// TODO  - tutaj teżpowinien byćaktualizowany total
					}}
				>
					+
				</button>
			</form>
		</>
	);
};
