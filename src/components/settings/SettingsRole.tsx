import Table from "@/components/Table.tsx";
import { useAuth } from "@/context/ContextProvider.tsx";

function SettingsRole() {
	const { roleColumns, roles } = useAuth();
	return (
		<>
			<Table
				title="Роли и права"
				items={roles}
				columns={roleColumns}
				buttonName="Добавить роль"
			/>

		</>
	);
}

export default SettingsRole;