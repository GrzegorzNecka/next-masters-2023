"use client";

import { useTransition } from "react";
// import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { removeItem } from "@/api/actions";
import { Button } from "@/components/ui/button";

export const RemoveButton = ({ itemId }: { itemId: string }) => {
	const [isPending, startTransition] = useTransition();
	// const router = useRouter();

	return (
		<Button
			variant="outline"
			disabled={isPending}
			onClick={async () => {
				startTransition(async () => {
					await removeItem(itemId);

					// router.refresh();
				});
			}}
		>
			{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
		</Button>
	);
};
