import Table from "@/components/Table.tsx";
import React from "react";

type Column<T> = {
	title: string;
	render: (row: T) => React.ReactNode;
};

interface IProps<T extends { id: string | number }> {
	overallInventory: string;
	categoriesString: string;
	countCategories: number;
	totalProducts: string;
	totalCount: number;
	topSelling: string;
	topSellingCount: number;
	stocksString: string;
	stocksNumber: number;
	stocksOrdered: string;

	items: T[];
	tableTitle: string;
	columns: Column<T>[];
	buttonName:	string;
	basePath: string;
}

function PageDynamic<T extends { id: string | number }>({
															overallInventory,
															categoriesString,
															countCategories,
															totalProducts,
															totalCount,
															topSelling,
															topSellingCount,
															stocksString,
															stocksNumber,
															items,
															tableTitle,
															columns,
															buttonName,
															basePath
														}: IProps<T>) {
	return (
		<div className="grid grid-cols-1 gap-8">
			<div className="rounded-lg bg-white px-6 py-5 h-auto">
				<h1 className="font-medium text-lg">{overallInventory}</h1>
				<div className="grid grid-cols-[2fr_2fr_2fr_2fr] mt-5 gap-5 last:border-none pr-0">
					<div className="flex flex-col gap-2 border-r-1">
						<h1 className="text-blue-600 font-medium">{categoriesString}</h1>
						<span className="text-base">{countCategories}</span>
						<p className="text-muted-foreground text-xs">Последние 7 дней</p>
					</div>

					<div className="flex flex-col gap-2 border-r-1 px-10">
						<h1 className="text-orange-400 font-medium">{totalProducts}</h1>
						<div className="flex flex-row justify-between pr-5">
							<div className="flex flex-col gap-2">
								<span className="text-base">{totalCount}</span>
								<p className="text-muted-foreground text-xs">Последние 7 дней</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2 border-r-1 px-10">
						<h1 className="text-green-500 font-medium">{topSelling}</h1>
						<div className="flex flex-row justify-between pr-5">
							<div className="flex flex-col gap-2">
								<span className="text-base">{topSellingCount}</span>
								<p className="text-muted-foreground text-xs">Последние 7 дней</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2 px-10">
						<h1 className="text-red-500 font-medium">{stocksString}</h1>
						<div className="flex flex-row justify-between pr-5">
							<div className="flex flex-col gap-2">
								<span className="text-base">{stocksNumber}</span>
								<p className="text-muted-foreground text-xs">Последние 7 дней</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="rounded-lg bg-white px-6 py-5">
				<Table
					title={tableTitle}
					items={items}
					columns={columns}
					rowKey={(row) => row.id}
					buttonName={buttonName}
					basePath={basePath}
				/>
			</div>
		</div>
	);
}

export default PageDynamic;