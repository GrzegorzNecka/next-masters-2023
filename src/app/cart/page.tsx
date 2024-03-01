import { redirect } from "next/navigation";
import { getCartByIdFromCookies } from "@/api/cart";
import { formatMoney } from "@/utils/product";
import { IncrementProductQuantity } from "@/ui/atoms/IncrementProductQuantity";

export default async function CartPage() {
	const cart = await getCartByIdFromCookies();

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
								<td>{item.quantity}</td>
								<td>
									<IncrementProductQuantity quantity={item.quantity} />{" "}
								</td>
								<td>{formatMoney(item.product.price / 100)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
