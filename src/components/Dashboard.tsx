import {ChartLineMultiple} from "@/components/LineChartComponent.tsx";
import {ChartPieSimple} from "@/components/PieChartComponent.tsx";
import {useAuth} from "@/context/ContextProvider.tsx";

function Dashboard(){
	const {
		users,
		suppliers,
		productDashboards,
		topSellingCount,
		onInventory,
		stocksNumber,
		stocksNumberProcessing,
		topCountCompleted,
		countCanceled,
		ordersDashboards,
	} = useAuth();
	return (
		<div className="grid grid-cols-[1.8fr_1fr] gap-4 divide-x">
			<div className='rounded-lg bg-white px-6 py-5 h-auto'>
				<h1 className='font-medium text-lg'>Состояние оборудования</h1>
				<div className='grid grid-cols-4 mt-10 gap-5 last:border-none pr-0'>
					<div className='flex flex-col items-center gap-1 border-r-1 pr-5'>
						<img src="/Sales.svg" alt="SalesSvg" width="30px" height="30px"/>
						<div className='flex flex-row items-center justify-between w-full'>
							<p>Всего устройств</p>
							<span>{productDashboards.length}</span>
						</div>
					</div>
					<div className='flex flex-col items-center gap-1 border-r-1 pr-5'>
						<img src="/Revenue.svg" alt="RevenueSvg" width="30px" height="30px"/>
						<div className='flex flex-row items-center justify-between w-full'>
							<p>В эксплуатации</p>
							<span>{topSellingCount}</span>
						</div>
					</div>
					<div className='flex flex-col items-center gap-1 border-r-1 pr-5'>
						<img src="/Profit.svg" alt="ProfitSvg" width="30px" height="30px"/>
						<div className='flex flex-row items-center justify-between w-full'>
							<p>На складе</p>
							<span>{onInventory}</span>
						</div>
					</div>
					<div className='flex flex-col items-center gap-1 pr-5'>
						<img src="/Cost.svg" alt="CostSvg" width="30px" height="30px"/>
						<div className='flex flex-row items-center justify-between w-full'>
							<p>В ремонте</p>
							<span>{stocksNumber}</span>
						</div>
					</div>
				</div>
			</div>
			<div className='rounded-lg bg-white px-6 py-5 h-auto'>
				<h1 className='font-medium text-lg'>Склад оборудования</h1>
				<div className='grid grid-cols-2 mt-5 gap-5 last:border-none pr-0'>
					<div className='flex flex-col items-center gap-1 border-r-1 pr-5'>
						<img src="/Quantity.svg" alt="SalesSvg" width="30px" height="30px"/>
						<div className='flex flex-col items-center justify-between w-full'>
							<span>{onInventory}</span>
							<p>На складе</p>
						</div>
					</div>
					<div className='flex flex-col items-center gap-1 pr-5'>
						<img src="/On%20the%20way.svg" alt="RevenueSvg" width="30px" height="30px"/>
						<div className='flex flex-col items-center justify-between w-full'>
							<span>{topSellingCount}</span>
							<p>В эксплуатации</p>
						</div>
					</div>
				</div>
			</div>
			<div className='rounded-lg bg-white px-6 py-5 h-auto'>
				<h1 className='font-medium text-lg'>Количество заказов</h1>
				<div className='grid grid-cols-4 mt-10 gap-5 last:border-none pr-0'>
					<div className='flex flex-col items-center gap-1 border-r-1 pr-5'>
						<img src="/Sales.svg" alt="SalesSvg" width="30px" height="30px"/>
						<div className='flex flex-row items-center justify-between w-full'>
							<p>Всего заказов</p>
							<span>{ordersDashboards.length}</span>
						</div>
					</div>
					<div className='flex flex-col items-center gap-1 border-r-1 pr-5'>
						<img src="/Revenue.svg" alt="RevenueSvg" width="30px" height="30px"/>
						<div className='flex flex-row items-center justify-between w-full'>
							<p>В работе</p>
							<span>{stocksNumberProcessing}</span>
						</div>
					</div>
					<div className='flex flex-col items-center gap-1 border-r-1 pr-5'>
						<img src="/Profit.svg" alt="ProfitSvg" width="30px" height="30px"/>
						<div className='flex flex-row items-center justify-between w-full'>
							<p>Завершено</p>
							<span>{topCountCompleted}</span>
						</div>
					</div>
					<div className='flex flex-col items-center gap-1 pr-5'>
						<img src="/Cost.svg" alt="CostSvg" width="30px" height="30px"/>
						<div className='flex flex-row items-center justify-between w-full'>
							<p>Отменено</p>
							<span>{countCanceled}</span>
						</div>
					</div>
				</div>
			</div>
			<div className='rounded-lg bg-white px-6 py-5 h-auto'>
				<h1 className='font-medium text-lg'>Справочная информация</h1>
				<div className='grid grid-cols-2 mt-5 gap-5 last:border-none pr-0'>
					<div className='flex flex-col items-center gap-1 border-r-1 pr-5'>
						<img src="/Quantity.svg" alt="SalesSvg" width="30px" height="30px"/>
						<div className='flex flex-col items-center justify-between w-full'>
							<span>{users.length}</span>
							<p>Сотрудники</p>
						</div>
					</div>
					<div className='flex flex-col items-center gap-1 pr-5'>
						<img src="/On%20the%20way.svg" alt="RevenueSvg" width="30px" height="30px"/>
						<div className='flex flex-col items-center justify-between w-full'>
							<span>{suppliers.length}</span>
							<p>Поставщики</p>
						</div>
					</div>
				</div>
			</div>
			<ChartLineMultiple/>
			<ChartPieSimple/>
		</div>
	)
}
export default Dashboard;