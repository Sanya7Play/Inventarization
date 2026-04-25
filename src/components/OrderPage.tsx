import {Box} from "lucide-react";
import type {Order} from "@/lib/constants.ts";

interface OrderProps{
	order?: Order;
}
function OrderPage({order}: OrderProps){
	return(
		<div className='flex flex-col w-full cursor-pointer px-10 py-6'>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col w-2/4 gap-5'>
					<div className='flex flex-col gap-5 pb-2'>
						<h1 className='pb-2 text-lg font-semibold'>О поставщике</h1>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Имя поставщика</span>
							<span className='text-black'>{order?.supplier}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Количество позиций</span>
							<span className='text-black'>{order?.positionNumber}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Номер закупки</span>
							<span className='text-black'>{order?.purchaseNumber}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Дата создания заказа</span>
							<span className='text-black'>{order?.expireDate}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Статус заказа</span>
							<span className='text-black'>{order?.status}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Сумма заказа</span>
							<span className='text-black'>{order?.sum} ₽</span>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-5 px-5'>
					<div className='border-dashed border-black/30 border-2 p-5 flex justify-center'>
						<Box size={80} strokeWidth={1} className='text-muted-foreground'/>
					</div>
					<div className='flex flex-col gap-4.5'>
						<div className='flex flex-row justify-between gap-3'>
							<span className='text-black/60'>Количество товаров</span>
							<span>40</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default OrderPage;