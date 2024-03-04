"use server";

import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphql";
import { CartRemoveProductDocument, CartSetProductQuantityDocument } from "@/gql/graphql";

export const removeItem = async (itemId: string) => {
	const res = await executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			itemId,
		},
	});
	revalidateTag("cart");
	return res;
};

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
