"use server";

// import { revalidateTag } from "next/cache";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphql";
import { CartSetProductQuantityDocument } from "@/gql/graphql";

export const changeItemQuantity = async (itemId: string, quantity: number) => {
	const res = await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});

	revalidateTag("cart");

	return res;
};
