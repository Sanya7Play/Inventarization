import Table from "@/components/Table.tsx";
import React from "react";

type Column<T> = {
	title: string;
	render: (row: T) => React.ReactNode;
};

interface IProps<T extends { id: string | number }> {
	items: T[];
	tableTitle: string;
	columns: Column<T>[];
	buttonName:	string;
	basePath: string;
}

function PageSuppliers<T extends { id: string | number }>({
															items,
															tableTitle,
															columns,
															buttonName,
															basePath,
														}: IProps<T>) {
	return (
		<div className="grid grid-cols-1 gap-8">
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
	)
}
export default PageSuppliers;