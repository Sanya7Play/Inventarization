import {User2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {type Order, statusOrder} from "@/lib/constants.ts";
import {useAuth} from "@/context/ContextProvider.tsx";
import {useEffect, useState} from "react";

interface OrderComponentProps {
	order?: Order;
	setFormOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
}
function OrderComponent({order, setFormOrder}: OrderComponentProps){

	const {ordersDashboards} = useAuth();

	const [id] = useState<number>(order?.id || ordersDashboards.length + 1);
	const [purchaseNumber, setPurchaseNumber] = useState<string>(order?.purchaseNumber || "");
	const [supplier, setSupplier] = useState<string>(order?.supplier || "");
	const [expireDate, setExpireDate] = useState<string>(order?.expireDate || "");
	const [positionNumber, setPositionNumber] = useState<string>(order?.positionNumber || "");
	const [sum, setSum] = useState<string>(order?.sum || "");
	const [status, setStatus] = useState<string>(order?.status || "");

	useEffect(() => {
		setFormOrder({id, purchaseNumber, supplier, expireDate, positionNumber, sum, status});
	}, [id, purchaseNumber, supplier, expireDate, positionNumber, sum, status, setFormOrder]);
	return (
		<>
			<div className='flex flex-row gap-5 items-center justify-center'>
						<span className='flex items-center justify-center border-2 border-muted-foreground/30 border-dashed w-25 h-25 rounded-full'>
							<User2 size={80} strokeWidth={1} className='text-muted-foreground'/>
						</span>
				<div className='flex flex-col items-center justify-center'>
					<span className='text-muted-foreground text-sm'>Перетащите изображение сюда</span>
					<p className='text-muted-foreground text-sm'>или</p>
					<span className='text-blue-600 cursor-pointer text-sm '>Выберите изображение</span>
				</div>
			</div>
			<div className='flex flex-col gap-5 mt-5'>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="name" className='text-base'>Номер закупки</Label>
					<Input
						onChange={(e) => setPurchaseNumber(e.target.value)}
						placeholder='Введите номер закупки'
						className='w-6/10 h-11'
						value={purchaseNumber}
					>
					</Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="id" className='text-base'>Поставщик</Label>
					<Input
						onChange={(e) => setSupplier(e.target.value)}
						placeholder='Введите поставщика'
						className='w-6/10 h-11'
						value={supplier}
					></Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="category" className='text-base'>Дата</Label>
					<Input
						onChange={(e) => setExpireDate(e.target.value)}
						type={"date"}
						placeholder='Введите дату добавления'
						className='w-6/10 h-11'
						value={expireDate}
					></Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="price" className='text-base'>Количество позиций</Label>
					<Input
						onChange={(e) => setPositionNumber(e.target.value)}
						placeholder='Введите кол-во позиций'
						className='w-6/10 h-11'
						value={positionNumber}
					></Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="quantity" className='text-base'>Сумма</Label>
					<Input
						onChange={(e) => setSum(e.target.value)}
						placeholder='Введите сумму заказа'
						className='w-6/10 h-11'
						value={sum}
					></Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="date" className='text-base'>Статус</Label>
					<select
						onChange={(e) => setStatus(e.target.value)}
						value={status}
						className="w-6/10 h-11 text-sm border-1 border-muted-foreground/20 rounded-lg"
					>
						<option value="" disabled>Выберите статус</option>
						{statusOrder.map((item) => (
							<option key={item} className="text-sm" value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
			</div>
		</>
	)
}
export default OrderComponent;