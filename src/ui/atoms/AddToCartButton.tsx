"use client";

import { useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const { pending } = useFormStatus();

	return (
		<button
			className="rounded-sm border bg-slate-100 px-6 py-2 shadow-sm disabled:cursor-wait disabled:bg-slate-800"
			type="submit"
			disabled={pending}
		>
			Dodaj do koszyka
		</button>
	);
};
