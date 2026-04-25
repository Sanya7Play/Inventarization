import {useParams} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Pen} from "lucide-react";
import {useEffect, useState} from "react";
import ComponentProduct from "@/components/ComponentProduct.tsx";
import axios from "axios";
import type {Order, Product, Supplier, User} from "@/lib/constants.ts";
import AddDialogWindow from "@/components/AddDialogWindow.tsx";

function PageProduct() {
	const params = useParams();
	const [user, setUser] = useState<User | undefined>()
	const [product, setProduct] = useState<Product | undefined>()
	const [order, setOrder] = useState<Order | undefined>();
	const [supplier, setSupplier] = useState<Supplier | undefined>();
	useEffect(() => {
		async function getItem(){
			switch (params.entity){
				case "users":{
					const data = await axios.get(`https://d05b239fd7c26df7.mokky.dev/${params.entity}/${params.id}`);
					setUser(data.data);
					break;
				}
				case "inventory":{
					const data = await axios.get(`https://d05b239fd7c26df7.mokky.dev/${params.entity}/${params.id}?_relations=users,types`);
					setProduct(data.data);
					break;
				}
				case "orders":{
					const data = await axios.get(`https://d05b239fd7c26df7.mokky.dev/${params.entity}/${params.id}`);
					setOrder(data.data);
					break;
				}
				case "suppliers":{
					const data = await axios.get(`https://d05b239fd7c26df7.mokky.dev/${params.entity}/${params.id}`);
					setSupplier(data.data);
					break;
				}
			}
		}
		getItem();
	},[])
	return(
		<div className='flex flex-col w-full h-full rounded-lg bg-white px-6 py-5'>
			<div className="flex flex-row items-center justify-between">
				<h1 className="font-medium text-lg">{user?.fullName || product?.name || order?.supplier || supplier?.contactPerson}</h1>
				<div className="flex flex-row gap-2">
					<AddDialogWindow title={product ? 'Редактировать оборудование' : order ? 'Редактировать заказ' : supplier ? 'Редактировать поставщика' : 'Редактировать пользователя'}
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
							<Pen className={'w-4 h-4'}/>
							Изменить
						</Button>
					</AddDialogWindow>
					<Button type="button" variant="ghost" size="default" className="cursor-pointer border px-5">
						Download
					</Button>
				</div>
			</div>
			<ComponentProduct user={user} product={product} order={order} supplier={supplier} />
		</div>


	)
}
export default PageProduct;