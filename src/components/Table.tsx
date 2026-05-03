import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {Download, Filter, PlusIcon} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddDialogWindow from "@/components/AddDialogWindow.tsx";
import FilterButton from "@/components/FilterButton.tsx";
import {useAuth} from "@/context/ContextProvider.tsx";

export type Column<T> = {
	title: string;
	render: (row: T) => React.ReactNode;
};

type Props<T extends { id: string | number }> = {
	title: string;
	items: T[];
	columns: Column<T>[];
	buttonName: string;
	rowKey?: (row: T) => string | number;
	basePath?: string;
	onRowClick?: (row: T) => void;
};

function Table<T extends { id: string | number }>({
													  title,
													  items,
													  columns,
													  rowKey,
													  buttonName,
													  basePath,
													  onRowClick,
												  }: Props<T>) {
	const { can } = useAuth();
	const navigate = useNavigate();
	const ITEMS_PER_PAGE = 6;
	const [activePage, setActivePage] = useState(1);

	const itemsCount = items.length;
	const totalPages = Math.ceil(itemsCount / ITEMS_PER_PAGE);

	const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;

	const paginatedItems = items.slice(startIndex, endIndex);

	const nextPagePagination = () => {
		if (activePage < totalPages) {
			setActivePage((prev) => prev + 1);
		}
	};

	const prevPagePagination = () => {
		if (activePage > 1) {
			setActivePage((prev) => prev - 1);
		}
	};

	const handleRowClick = (
		row: T,
		event: React.MouseEvent<HTMLTableRowElement>
	) => {
		const target = event.target as HTMLElement;

		if (
			target.closest(
				"button, a, input, textarea, select, svg, path, [data-prevent-row-click]"
			)
		) {
			return;
		}

		if (onRowClick) {
			onRowClick(row);
			return;
		}

		if (basePath) {
			navigate(`${basePath}/${row.id}`);
		}
	};

	const exportToPDF = () => {
		window.print();
	};

	return (
		<>
			<div className="flex flex-row items-center justify-between mb-5 no-print">
				<h1 className="font-medium text-lg pt-4">{title}</h1>

				<div className="flex flex-row gap-2">
					{can("inventory.create") && (
						<AddDialogWindow title={buttonName}>
							<Button
								type="button"
								variant="outline"
								size="default"
								className="bg-blue-500 text-white cursor-pointer text-sm"
							>
								<PlusIcon/>
								{buttonName}
							</Button>
						</AddDialogWindow>
					)}

					<FilterButton title={title}>
						<Button
							type="button"
							variant="ghost"
							size="default"
							className="cursor-pointer border px-5"
						>
							<Filter className="w-4 h-4 mr-2" /> Фильтры
						</Button>
					</FilterButton>

					<Button
						type="button"
						variant="ghost"
						size="default"
						className="cursor-pointer border px-5"
						onClick={exportToPDF}
					>
						<Download className="w-4 h-4 mr-2" /> Экспорт PDF
					</Button>
				</div>
			</div>


			{can("inventory.create") && (
				<div id="print-area">
					<h1 className="hidden print:block text-xl font-bold mb-4">{title}</h1>

					<table className="w-full border-collapse">
						<thead className="border-b font-normal">
						<tr className="text-left">
							{columns.map((c, i) => (
								<th key={i} className="py-3">
									{c.title}
								</th>
							))}
						</tr>
						</thead>

						<tbody>
						{paginatedItems.map((row) => (
							<tr
								key={rowKey ? rowKey(row) : row.id}
								className="border-b hover:bg-gray-200 hover:text-blue-600 cursor-pointer"
								onClick={(event) => handleRowClick(row, event)}
							>
								{columns.map((c, i) => (
									<td className="py-3" key={i}>
										{c.render(row) ?? "-"}
									</td>
								))}
							</tr>
						))}
						</tbody>
					</table>

					<div className="flex flex-row items-center justify-between mt-4 no-print">
						<Button
							type="button"
							variant="outline"
							size="default"
							className="cursor-pointer border px-5"
							disabled={activePage === 1}
							onClick={prevPagePagination}
						>
							Назад
						</Button>

						<span>Страница {activePage} из {totalPages}</span>

						<Button
							type="button"
							variant="outline"
							size="default"
							className="cursor-pointer border px-5"
							disabled={activePage === totalPages}
							onClick={nextPagePagination}
						>
							Вперед
						</Button>
					</div>
				</div>
			)}
		</>
	);
}

export default Table;