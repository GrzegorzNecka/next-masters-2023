import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

import { RemoveButton } from "./RemoveButton";
import { getCartByIdFromCookies } from "@/api/cart";
import { formatMoney } from "@/utils/product";
import { IncrementProductQuantity } from "@/ui/atoms/IncrementProductQuantity";
import { handlePaymentAction } from "@/api/actions";
import { sleep } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function CartPage() {
	const cart = await getCartByIdFromCookies();
	await sleep(1000);
	revalidateTag("cart");

	if (!cart) {
		redirect("/");
	}

	if (cart.orderItems.length === 0) {
		return <div className="mt-10 text-center text-2xl">Koszyk jest pusty</div>;
	}

	return (
		<div className="mt-10">
			<table>
				<thead>
					<tr>
						<th>Produkt</th>
						<th>Ilość</th>
						<th>Cena</th>
						<th>Razem</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map((item) => {
						if (!item.product) {
							return null;
						}
						return (
							<tr key={item.product.id}>
								<td className="flex flex-col">
									{item.product.name} <small className=" text-gray-400">{item.id}</small>
								</td>

								<td>
									<IncrementProductQuantity
										total={item.product.total}
										quantity={item.quantity}
										itemId={item.id}
									/>
								</td>

								<td>{formatMoney(item.product.price / 100)}</td>

								<td>{formatMoney((item.total * item.quantity) / 100)}</td>

								<td>
									<RemoveButton itemId={item.id} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<form action={handlePaymentAction}>
				<Button type="submit" variant={"default"}>
					Zapłać
				</Button>
			</form>
		</div>
	);
}
