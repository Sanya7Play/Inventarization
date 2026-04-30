import type { Order, ProductWithUser, Supplier, UserWithRole } from "@/lib/constants.ts";
import UserPage from "@/components/UserPage.tsx";
import ProductPage from "@/components/ProductPage.tsx";
import SupplierPage from "@/components/SupplierPage.tsx";
import OrderPage from "@/components/OrderPage.tsx";

interface PropsItem {
	user?: UserWithRole;
	product?: ProductWithUser;
	order?: Order;
	supplier?: Supplier;
}

function ComponentProduct({ user, product, order, supplier }: PropsItem) {
	return (
		<>
			{user ? (
				<UserPage user={user} />
			) : product ? (
				<ProductPage product={product} />
			) : supplier ? (
				<SupplierPage supplier={supplier} />
			) : (
				<OrderPage order={order} />
			)}
		</>
	);
}

export default ComponentProduct;