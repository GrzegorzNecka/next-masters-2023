import { revalidateTag } from "next/cache";
import Overlay from "../overlay";

import { RemoveButton } from "@/app/cart/RemoveButton";

import { IncrementProductQuantity } from "@/ui/atoms/IncrementProductQuantity";
import { formatMoney } from "@/utils/product";
import { getCartByIdFromCookies } from "@/api/cart";

export default async function ModalCart() {
	const cart = await getCartByIdFromCookies();

	revalidateTag("cart");

	if (cart?.orderItems.length === 0) {
		return <div className="mt-10 text-center text-2xl">Koszyk jest pusty</div>;
	}

	return (
		<>
			<Overlay />
			{
				// po odświerzeniu nie działa
			}
			<div className="absolute right-0 top-0 z-40 flex h-screen w-full max-w-screen-md flex-col bg-white p-10 ">
				<table>
					<thead>
						<tr>
							<th>Produkt</th>
							<th>Ilość</th>
							<th>Cena</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{cart?.orderItems.map((item) => {
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

									<td>
										<RemoveButton itemId={item.id} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
