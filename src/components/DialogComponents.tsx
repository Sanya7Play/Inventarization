import type {
	Order,
	ProductWithUser,
	RoleWithUsers,
	Supplier,
	TypeInventory,
	UserWithRole
} from "@/lib/constants.ts";
import InventoryComponent from "@/components/InventoryComponent.tsx";
import SupplierComponent from "@/components/SupplierComponent.tsx";
import OrderComponent from "@/components/OrderComponent.tsx";
import UserComponent from "@/components/UserComponent.tsx";
import AddRole from "@/components/AddRole.tsx";
import React from "react";
import AddType from "@/components/AddType.tsx";

interface DialogComponentProps {
	title: string;
	product?: ProductWithUser;
	user?: UserWithRole;
	order?: Order;
	supplier?: Supplier;
	setFormSupplier: React.Dispatch<React.SetStateAction<Supplier | undefined>>;
	setFormOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
	setFormRoles: React.Dispatch<React.SetStateAction<RoleWithUsers | undefined>>
	setFormTypes: React.Dispatch<React.SetStateAction<TypeInventory | undefined>>
	setFormProduct: React.Dispatch<React.SetStateAction<ProductWithUser | undefined>>;
	setFormUser: React.Dispatch<React.SetStateAction<UserWithRole | undefined>>;
}

function DialogComponent({
							 title,
							 user,
							 product,
							 order,
							 supplier,
							 setFormProduct,
							 setFormSupplier,
							 setFormOrder,
							 setFormUser,
							 setFormRoles,
							 setFormTypes,
						 }: DialogComponentProps) {
	return (
		<>
			{title === "Редактировать оборудование" || title === "Добавить оборудование" ? (
				<InventoryComponent product={product} setFormProduct={setFormProduct} />
			) : title === "Редактировать поставщика" || title === "Добавить поставщика" ? (
				<SupplierComponent supplier={supplier} setFormSupplier={setFormSupplier} />
			) : title === "Редактировать заказ" || title === "Добавить заказ" ? (
				<OrderComponent order={order} setFormOrder={setFormOrder} />
			) : title === "Редактировать роль" || title === "Добавить роль" ? (
				<AddRole setFormRoles={setFormRoles} />
			) : title === 'Редактировать тип' || title === 'Добавить тип оборудования' ? (
				<AddType setFormTypes={setFormTypes} />
			) : (
				<UserComponent user={user} setFormUser={setFormUser} />
			)}
		</>
	);
}

export default DialogComponent;