"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "@/api/actions";
import { Button } from "@/ui/atoms/Button";

export const RemoveButton = ({ itemId }: { itemId: string }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<Button
			isDisabled={isPending}
			onClick={async () => {
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				});
			}}
			className="text-red-500 disabled:text-slate-500"
		>
			remove
		</Button>
	);
};
