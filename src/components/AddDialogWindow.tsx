import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import DialogComponent from "@/components/DialogComponents.tsx";
import type {
	Order,
	ProductWithUser,
	Supplier,
	UserWithRole,
} from "@/lib/constants.ts";
import React, { useState } from "react";
import { useAuth } from "@/context/ContextProvider.tsx";
import { supabase } from "@/supabase.ts";

interface ProductDialogProps {
	title: string;
	children: React.ReactNode;
	user?: UserWithRole;
	product?: ProductWithUser;
	supplier?: Supplier;
	order?: Order;
}

function AddDialogWindow({
							 children,
							 title,
							 user,
							 product,
							 order,
							 supplier,
						 }: ProductDialogProps) {
	const {
		formRoles,
		setFormRoles,
		formTypes,
		setFormTypes,
		fetchData,
	} = useAuth();

	const [formProduct, setFormProduct] = useState<ProductWithUser | undefined>(product);
	const [formSupplier, setFormSupplier] = useState<Supplier | undefined>(supplier);
	const [formOrder, setFormOrder] = useState<Order | undefined>(order);
	const [formUser, setFormUser] = useState<UserWithRole | undefined>(user);

	const saveItem = async () => {
		try {
			if (
				(title === "Редактировать оборудование" ||
					title === "Добавить оборудование") &&
				formProduct
			) {
				const payload = {
					name: formProduct.name,
					inventNumber: formProduct.inventNumber,
					serialNumber: formProduct.serialNumber,
					expiryDate: formProduct.expiryDate,
					status: formProduct.status,
					img: formProduct.img,
					userId: formProduct.user?.id ?? null,
					typeId: formProduct.type?.id ?? null,
				};

				const { error } = product
					? await supabase.from("inventory").update(payload).eq("id", product.id)
					: await supabase.from("inventory").insert(payload);

				if (error) throw error;
			}

			if (
				(title === "Редактировать поставщика" ||
					title === "Добавить поставщика") &&
				formSupplier
			) {
				const payload = {
					companyName: formSupplier.companyName,
					contactPerson: formSupplier.contactPerson,
					contactNumber: formSupplier.contactNumber,
					email: formSupplier.email,
					contractType: formSupplier.contractType,
					contractDate: formSupplier.contractDate,
				};

				const { error } = supplier
					? await supabase.from("suppliers").update(payload).eq("id", supplier.id)
					: await supabase.from("suppliers").insert(payload);

				if (error) throw error;
			}

			if (
				(title === "Редактировать заказ" || title === "Добавить заказ") &&
				formOrder
			) {
				const payload = {
					purchaseNumber: formOrder.purchaseNumber,
					supplier: formOrder.supplier,
					expireDate: formOrder.expireDate,
					positionNumber: formOrder.positionNumber,
					sum: formOrder.sum,
					status: formOrder.status,
				};

				const { error } = order
					? await supabase.from("orders").update(payload).eq("id", order.id)
					: await supabase.from("orders").insert(payload);

				if (error) throw error;
			}

			if (
				(title === "Редактировать пользователя" ||
					title === "Добавить пользователя") &&
				formUser
			) {
				const payload = {
					fullName: formUser.fullName,
					email: formUser.email,
					phone: formUser.phone,
					status: formUser.status,
					roleId: formUser.role?.id ?? null,
				};

				const { error } = user
					? await supabase.from("users").update(payload).eq("id", user.id)
					: await supabase.from("users").insert(payload);

				if (error) throw error;
			}

			if (
				(title === "Редактировать роль" || title === "Добавить роль") &&
				formRoles
			) {
				const payload = {
					name: formRoles.name,
					description: formRoles.description,
				};

				const { error } = formRoles.id
					? await supabase.from("roles").update(payload).eq("id", formRoles.id)
					: await supabase.from("roles").insert(payload);

				if (error) throw error;
			}

			if (
				(title === "Редактировать тип" ||
					title === "Редактировать тип оборудования" ||
					title === "Добавить тип оборудования") &&
				formTypes
			) {
				const payload = {
					typeName: formTypes.typeName,
					description: formTypes.description,
				};

				const { error } = formTypes.id
					? await supabase.from("types").update(payload).eq("id", formTypes.id)
					: await supabase.from("types").insert(payload);

				if (error) throw error;
			}

			await fetchData();
		} catch (error) {
			console.error("Ошибка при сохранении:", error);
		}
	};

	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription />
					</DialogHeader>

					<DialogComponent
						title={title}
						user={user}
						product={product}
						order={order}
						supplier={supplier}
						setFormProduct={setFormProduct}
						setFormSupplier={setFormSupplier}
						setFormOrder={setFormOrder}
						setFormUser={setFormUser}
						setFormRoles={setFormRoles}
						setFormTypes={setFormTypes}
					/>

					<DialogFooter className="mt-5 sm:mt-6">
						<DialogClose asChild>
							<Button variant="outline" className="cursor-pointer border text-sm">
								Закрыть
							</Button>
						</DialogClose>

						<Button
							onClick={(e) => {
								e.preventDefault();
								void saveItem();
							}}
							type="submit"
							variant="outline"
							size="default"
							className="bg-blue-500 text-white cursor-pointer text-sm"
						>
							{title}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}

export default AddDialogWindow;