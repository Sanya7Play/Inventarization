import Table from "@/components/Table.tsx";
import {useAuth} from "@/context/ContextProvider.tsx";

function SettingsUsers(){
	const {users, userColumns} = useAuth();
	return (
		<Table title='Пользователи системы' items={users} columns={userColumns} buttonName='Добавить пользователя' basePath={'/users'}/>
	)
}
export default SettingsUsers;