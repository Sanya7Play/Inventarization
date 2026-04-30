import {Box} from "lucide-react";
import type {ProductWithUser} from "@/lib/constants.ts";

interface ProductProps{
	product?: ProductWithUser;
}
function ProductPage({product}: ProductProps) {
	return (
		<div className='flex flex-col w-full cursor-pointer px-10 py-6'>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col w-2/4 gap-5'>
					<div className='flex flex-col gap-5 pb-2'>
						<h1 className='pb-2 text-lg font-semibold'>Оборудование</h1>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Название товара</span>
							<span className='text-black'>{product?.name}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Инвертарный номер</span>
							<span className='text-black'>{product?.inventNumber}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Категория товара</span>
							<span className='text-black'>{product?.type?.typeName}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Срок действия</span>
							<span className='text-black'>{product?.expiryDate}</span>
						</div>
					</div>
					<div className='flex flex-col gap-5 pb-2'>
						<h1 className='pb-2 text-lg font-semibold'>Информация об ответственном</h1>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Ответственный</span>
							<span className='text-black'>{product?.user?.fullName}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Серийный номер</span>
							<span className='text-black'>{product?.serialNumber}</span>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-5 px-5'>
					<div className='border-dashed border-black/30 border-2 p-2 flex justify-center'>
						{product?.img ?
							(<img src={product?.img} alt={product?.name} width={270} height={150}  />
							) : (<Box size={80} strokeWidth={1} className='text-muted-foreground'/>)
						}
					</div>
					<div className='flex flex-col gap-4.5'>
						<div className='flex flex-row justify-between'>
							<span className='text-black/60'>Начальный запас</span>
							<span>40</span>
						</div>
						<div className='flex flex-row justify-between'>
							<span className='text-black/60'>Оставшиеся товары</span>
							<span>34</span>
						</div>
						<div className='flex flex-row justify-between'>
							<span className='text-black/60'>В пути</span>
							<span>15</span>
						</div>
						<div className='flex flex-row justify-between'>
							<span className='text-black/60'>Минимальное значение</span>
							<span>12</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ProductPage;