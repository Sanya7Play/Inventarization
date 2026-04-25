import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type {
	Order,
	Product,
	RoleStat,
	Supplier,
	TypeInventory,
	User,
} from "@/lib/constants.ts";
import { useAuth } from "@/context/ContextProvider.tsx";
import { supabase } from "@/supabase.ts";
import React from "react";

interface DeleteDialogWindowProps {
	type?: TypeInventory;
	order?: Order;
	user?: User;
	supplier?: Supplier;
	product?: Product;
	role?: RoleStat;
	children?: React.ReactNode;
}

function DeleteDialogWindow({
								children,
								product,
								user,
								supplier,
								role,
								order,
								type,
							}: DeleteDialogWindowProps) {
	const { fetchData } = useAuth();

	const deleteItem = async () => {
		try {
			if (order) {
				const { error } = await supabase
					.from("orders")
					.delete()
					.eq("id", order.id);

				if (error) throw error;
			} else if (supplier) {
				const { error } = await supabase
					.from("suppliers")
					.delete()
					.eq("id", supplier.id);

				if (error) throw error;
			} else if (user) {
				const { error } = await supabase
					.from("users")
					.delete()
					.eq("id", user.id);

				if (error) throw error;
			} else if (product) {
				const { error } = await supabase
					.from("inventory")
					.delete()
					.eq("id", product.id);

				if (error) throw error;
			} else if (role) {
				const { error } = await supabase
					.from("roles")
					.delete()
					.eq("id", role.id);

				if (error) throw error;
			} else if (type) {
				const { error } = await supabase
					.from("types")
					.delete()
					.eq("id", type.id);

				if (error) throw error;
			}

			await fetchData();
		} catch (error) {
			console.error("Ошибка при удалении:", error);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Вы действительно хотите удалить?
					</AlertDialogTitle>

					<AlertDialogDescription>
						Это действие необратимо. Запись будет удалена из базы данных.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel className="cursor-pointer">
						Закрыть
					</AlertDialogCancel>

					<AlertDialogAction
						onClick={deleteItem}
						className="cursor-pointer"
					>
						Удалить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteDialogWindow;