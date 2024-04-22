import Overlay from "../overlay";
import { getCartByIdFromCookies } from "@/api/cart";

export default async function ModalCart() {
	const cart = await getCartByIdFromCookies();

	return (
		<>
			<Overlay />
			<div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white ">
				<ul>{cart?.orderItems.map((item) => <li key={item.id}>{item.product?.name}</li>)}</ul>
			</div>
		</>
	);
}
