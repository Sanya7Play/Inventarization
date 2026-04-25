import Table from "@/components/Table.tsx";
import {useAuth} from "@/context/ContextProvider.tsx";

function SettingsTypes() {
	const {types, typeColumns} = useAuth();
	return (
		<>
			<Table
				title="Типы оборудования"
				items={types}
				columns={typeColumns}
				buttonName="Добавить тип оборудования"
			/>

		</>
	);
}
export default SettingsTypes;