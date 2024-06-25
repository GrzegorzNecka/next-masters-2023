"use client";

import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export const AddToCartButton = ({ isDisable }: { isDisable: boolean }) => {
	const { pending } = useFormStatus();

	return (
		<Button variant="default" type="submit" disabled={pending || isDisable}>
			{pending ? (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<ShoppingBag className="mr-2 h-4 w-4" />
			)}
			{isDisable ? "Wybierz wariant" : "Dodaj do koszyka"}
		</Button>
	);
};
