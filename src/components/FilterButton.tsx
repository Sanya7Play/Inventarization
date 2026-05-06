import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { useAuth } from "@/context/ContextProvider.tsx";
import {links} from "@/lib/constants.ts";

interface IFilterButtonProps {
	title: string;
	children?: React.ReactNode;
}

function FilterButton({ children, title }: IFilterButtonProps) {
	const {
		setInventorySort,
		setSuppliersSort,
		setOrdersSort,
		setUsersSort,
		setRolesSort,
	} = useAuth();

	const filterFunction = (link: string) => {
		if (title === "Список оборудования") {
			switch (link) {
				case "по имени":
					setInventorySort("name");
					break;
				case "по типу":
					setInventorySort("typeName");
					break;
				case "по пользователю":
					setInventorySort("userName");
					break;
				default:
					setInventorySort("id");
					break;
			}
		}

		if (title === "Поставщики оборудования") {
			switch (link) {
				case "по имени":
					setSuppliersSort("companyName");
					break;
				case "по типу":
					setSuppliersSort("contractType");
					break;
				case "по пользователю":
					setSuppliersSort("contactPerson");
					break;
				default:
					setSuppliersSort("id");
					break;
			}
		}

		if (title === "Оборудование") {
			switch (link) {
				case "по имени":
					setOrdersSort("purchaseNumber");
					break;
				case "по типу":
					setOrdersSort("status");
					break;
				case "по пользователю":
					setOrdersSort("supplier");
					break;
				default:
					setOrdersSort("id");
					break;
			}
		}

		if (title === "Пользователи") {
			switch (link) {
				case "по имени":
					setUsersSort("fullName");
					break;
				case "по типу":
					setUsersSort("status");
					break;
				default:
					setUsersSort("id");
					break;
			}
		}

		if (title === "Роли и права") {
			switch (link) {
				case "по имени":
					setRolesSort("name");
					break;
				default:
					setRolesSort("id");
					break;
			}
		}
		if (title === "Пользователи системы") {
			switch (link) {
				case "по имени":
					setInventorySort("name");
					break;
				case "по типу":
					setInventorySort("typeName");
					break;
				case "по пользователю":
					setInventorySort("userName");
					break;
				default:
					setInventorySort("id");
					break;
			}
		}
	};



	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent className="w-50">
				<PopoverHeader />
				<div className="flex flex-col justify-center m-2">
					{links.map((link) => (
						<div
							key={link}
							className="pb-2 text-sm font-medium cursor-pointer hover:text-blue-600"
							onClick={() => filterFunction(link)}
						>
							{link}
						</div>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default FilterButton;