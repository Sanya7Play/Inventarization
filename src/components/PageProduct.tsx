import {useNavigate, useParams} from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {ArrowLeft, Pen} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import ComponentProduct from "@/components/ComponentProduct.tsx";
import type {
	Order,
	ProductWithUser,
	Supplier,
	UserWithRole,
} from "@/lib/constants.ts";
import AddDialogWindow from "@/components/AddDialogWindow.tsx";
import { supabase } from "@/supabase.ts";
import {useAuth} from "@/context/ContextProvider.tsx";

function PageProduct() {
	const params = useParams();
	const navigate = useNavigate();
	const {authUser} = useAuth();

	const [user, setUser] = useState<UserWithRole | undefined>();
	const [product, setProduct] = useState<ProductWithUser | undefined>();
	const [order, setOrder] = useState<Order | undefined>();
	const [supplier, setSupplier] = useState<Supplier | undefined>();
	const can = useCallback(
		(permission: string) => {
			return authUser?.role?.permissions?.includes(permission) ?? false;
		},
		[authUser]

	);
	useEffect(() => {
		async function getItem() {
			if (!params.entity || !params.id) return;

			const id = Number(params.id);

			if (params.entity === "users") {
				const { data, error } = await supabase
					.from("users")
					.select("*, role:roles(*)")
					.eq("id", id)
					.single();

				if (error) {
					console.error("Ошибка загрузки пользователя:", error);
					return;
				}

				setUser(data);
			}

			if (params.entity === "inventory") {
				const { data, error } = await supabase
					.from("inventory")
					.select("*, user:users(*), type:types(*)")
					.eq("id", id)
					.single();

				if (error) {
					console.error("Ошибка загрузки оборудования:", error);
					return;
				}

				setProduct(data);
			}

			if (params.entity === "orders") {
				const { data, error } = await supabase
					.from("orders")
					.select("*")
					.eq("id", id)
					.single();

				if (error) {
					console.error("Ошибка загрузки заказа:", error);
					return;
				}

				setOrder(data);
			}

			if (params.entity === "suppliers") {
				const { data, error } = await supabase
					.from("suppliers")
					.select("*")
					.eq("id", id)
					.single();

				if (error) {
					console.error("Ошибка загрузки поставщика:", error);
					return;
				}

				setSupplier(data);
			}
		}

		void getItem();
	}, [params.entity, params.id]);
	const exportToPDF = () => {
		window.print();
	};
	return (
		<div className="flex flex-col w-full h-full rounded-lg bg-white px-6 py-5">
			<div className="flex flex-row items-center justify-between px-10 pt-6">
				<Button
					type="button"
					variant="ghost"
					size="default"
					className="cursor-pointer border px-5"
					onClick={() => {
						console.log(params);
						navigate(`/${params.entity}`)
					}}
				>
					<ArrowLeft className="w-4 h-4" /> Назад
				</Button>
				<h1 className="font-medium text-lg">
					{user?.fullName ||
						product?.name ||
						order?.supplier ||
						supplier?.contactPerson}
				</h1>

				{can("users.update") && (
					<div className="flex flex-row gap-2">
						<AddDialogWindow
							title={
								product
									? "Редактировать оборудование"
									: order
										? "Редактировать заказ"
										: supplier
											? "Редактировать поставщика"
											: "Редактировать пользователя"
							}
							user={user}
							product={product}
							order={order}
							supplier={supplier}
						>
							<Button
								type="button"
								variant="outline"
								size="default"
								className="bg-blue-500 text-white cursor-pointer text-sm"
							>
								<Pen className="w-4 h-4" />
								Изменить
							</Button>
						</AddDialogWindow>

						<Button
							type="button"
							variant="ghost"
							size="default"
							className="cursor-pointer border px-5"
							onClick={exportToPDF}
						>
							Скачать
						</Button>
					</div>
				)}
			</div>

			<ComponentProduct
				user={user}
				product={product}
				order={order}
				supplier={supplier}
			/>
			<div id="print-area">
				<h1 className="hidden print:block text-xl font-bold mb-4">
					{user?.fullName ||
						product?.name ||
						order?.supplier ||
						supplier?.contactPerson}

				</h1>
				<div className="hidden print:block text-xs font-semibold mb-4">
					<ComponentProduct
						user={user}
						product={product}
						order={order}
						supplier={supplier}
					/>
				</div>
			</div>
		</div>

	);
}

export default PageProduct;