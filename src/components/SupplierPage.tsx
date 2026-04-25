import {User2} from "lucide-react";
import type {Supplier} from "@/lib/constants.ts";

interface SipplierProps{
	supplier?: Supplier;
}
function SupplierPage({supplier}: SipplierProps) {
	return (
		<div className='flex flex-col w-full cursor-pointer px-10 py-6'>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col w-2/4 gap-5'>
					<div className='flex flex-col gap-5 pb-2'>
						<h1 className='pb-2 text-lg font-semibold'>Данные о поставщике</h1>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Название организации</span>
							<span className='text-black'>{supplier?.companyName}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>ID поставщика</span>
							<span className='text-black'>{supplier?.id}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Имя поставщика</span>
							<span className='text-black'>{supplier?.contactPerson}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Статус договора</span>
							<span className='text-black'>{supplier?.contractType}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Дата добавления</span>
							<span className='text-black'>{supplier?.contractDate}</span>
						</div>
					</div>
					<div className='flex flex-col gap-5 pb-2'>
						<h1 className='pb-2 text-lg font-semibold'>Контактные данные</h1>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Email пользователя</span>
							<span className='text-black'>{supplier?.email}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Телефон пользователя</span>
							<span className='text-black'>{supplier?.contactNumber}</span>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-5 px-10'>
					<div className='border-dashed border-black/30 border-2 p-8 rounded-full flex justify-center'>
						<User2 size={80} strokeWidth={1} className='text-muted-foreground'/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default SupplierPage;