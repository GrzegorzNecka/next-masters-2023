"use server";

// import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphql";
import { CartSetProductQuantityDocument } from "@/gql/graphql";

export const changeItemQuantity = async (itemId: string, quantity: number) => {
	const res = await executeGraphql(CartSetProductQuantityDocument, {
		itemId,
		quantity,
		next: { tags: ["cart"] },
	});

	// revalidateTag("cart");
	return res;
};
