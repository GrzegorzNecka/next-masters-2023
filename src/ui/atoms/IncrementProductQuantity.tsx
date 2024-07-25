"use client";

import { useOptimistic } from "react";
import { Minus, Plus } from "lucide-react";
import { changeItemQuantity } from "@/api/actions";
import { Button } from "@/components/ui/button";
export const IncrementProductQuantity = ({
	quantity,
	total,
	itemId,
}: {
	quantity: number;
	total: number;
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
				<Button
					variant={"outline"}
					className="border"
					disabled={optimisticQuantity.quantity <= 1}
					formAction={async () => {
						setOptimisticQuantity("DECREASE");
						await changeItemQuantity(itemId, optimisticQuantity.quantity - 1);
					}}
				>
					<Minus opacity={optimisticQuantity.quantity <= 1 ? 0.2 : 1} />
				</Button>
				<span className="w-8 text-center">{optimisticQuantity.quantity}</span>
				<Button
					variant={"outline"}
					className="border"
					type="submit"
					disabled={optimisticQuantity.quantity >= total}
					formAction={async () => {
						setOptimisticQuantity("INREACSE");
						await changeItemQuantity(itemId, optimisticQuantity.quantity + 1);
					}}
				>
					<Plus opacity={optimisticQuantity.quantity >= total ? 0.2 : 1} />
				</Button>
			</form>
		</>
	);
};
