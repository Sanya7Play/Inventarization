import type {Order, Product, Supplier, User} from "@/lib/constants.ts";
import UserPage from "@/components/UserPage.tsx";
import ProductPage from "@/components/ProductPage.tsx";
import SupplierPage from "@/components/SupplierPage.tsx";
import OrderPage from "@/components/OrderPage.tsx";

interface PropsItem{
	user?: User | undefined;
	product?: Product | undefined;
	order?: Order | undefined;
	supplier?: Supplier | undefined;
}
function ComponentProduct({user, product, order, supplier}: PropsItem) {
	return (
		<>
			{
				user ? (<UserPage user={user}/>) :
				product ? (<ProductPage product={product}/>) :
				supplier ? (<SupplierPage supplier={supplier}/>) :<OrderPage order={order}/>
			}
		</>
	)
}
export default ComponentProduct;