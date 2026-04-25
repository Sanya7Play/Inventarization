import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from "@/components/ui/popover"
import React from "react";
import {filterLinks} from "@/lib/constants.ts";
import {useAuth} from "@/context/ContextProvider.tsx";
interface IFilterButtonProps {
	title: string;
	children?: React.ReactNode
}
function FilterButton({children, title}: IFilterButtonProps) {
	const { setInventorySort, setSuppliersSort, setOrdersSort } = useAuth();
	const filterFunction = (link: string) => {
		if (title === 'Список оборудования') {
			switch (link) {
				case 'по имени':
					setInventorySort('name');
					break;
				case 'по типу':
					setInventorySort('type');
					break;
				case 'по пользователю':
					setInventorySort('user_id');
					break;
				default:
					setInventorySort('id');
					break;
			}
		} else if (title === 'Поставщики оборудования') {
			switch (link) {
				case 'по имени':
					setSuppliersSort('companyName');
					break;
				case 'по типу':
					setSuppliersSort('contractType');
					break;
				case 'по пользователю':
					setSuppliersSort('contactPerson');
					break;
				default:
					setSuppliersSort('id');
					break;
			}
		} else if (title === 'Оборудование') {
			switch (link) {
				case 'по имени':
					setOrdersSort('purchaseNumber');
					break;
				case 'по типу':
					setOrdersSort('status');
					break;
				case 'по пользователю':
					setOrdersSort('supplier');
					break;
				default:
					setOrdersSort('id');
					break;
			}
		}
	};
	return (
		<Popover>
			<PopoverTrigger asChild>
				{children}
			</PopoverTrigger>
			<PopoverContent className='w-50'>
				<PopoverHeader>
				</PopoverHeader>
				<div className='flex flex-col justify-center m-2'>
					{filterLinks.map((link, i) => (
						<div
							key={i}
							className='pb-2 text-sm font-medium cursor-pointer hover:text-blue-600'
							onClick={() => filterFunction(link)}
						>
							{link}
						</div>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
export default FilterButton;