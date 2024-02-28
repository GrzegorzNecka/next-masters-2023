import { redirect } from "next/navigation";
import { getCartByIdFromCookies } from "@/api/cart";
import { formatMoney } from "@/utils/product";

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
					{cart.orderItems.map((item) => (
						<tr key={item.id}>
							<td>{item.product?.name}</td>
							<td>{item.quantity}</td>
							<td>{item.product?.price && formatMoney(item.product.price / 100)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
