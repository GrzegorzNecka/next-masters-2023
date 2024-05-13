import { redirect } from "next/navigation";
// import { revalidateTag } from "next/cache";

import { RemoveButton } from "./RemoveButton";
import { getCartByIdFromCookies, handlePaymentAction } from "@/api/cart";
import { formatMoney } from "@/utils/product";
import { IncrementProductQuantity } from "@/ui/atoms/IncrementProductQuantity";

export default async function CartPage() {
	const cart = await getCartByIdFromCookies();
	// revalidateTag('cart');

	if (!cart) {
		redirect("/");
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
								<td>{item.product.name}</td>

								<td>
									<IncrementProductQuantity quantity={item.quantity} itemId={item.id} />
								</td>

								<td>{formatMoney(item.product.price / 100)}</td>

								<td>{formatMoney(item.total / 100)}</td>

								<td>
									<RemoveButton itemId={item.id} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<form action={handlePaymentAction}>
				<button className="rounded-smpy-2  mt-4 w-full bg-slate-950 text-white shadow-sm">
					Zapłać
				</button>
			</form>
		</div>
	);
}
