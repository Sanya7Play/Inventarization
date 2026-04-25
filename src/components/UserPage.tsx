import {User2} from "lucide-react";
import type {User} from "@/lib/constants.ts";
import {useAuth} from "@/context/ContextProvider.tsx";

interface UserProps {
	user?: User;
}
function UserPage({ user }: UserProps) {
	const {roles} = useAuth();
	const role = roles.find((role) => role.id === user?.role_id);
	return (
		<div className='flex flex-col w-full cursor-pointer px-10 py-6'>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col w-2/4 gap-5'>
					<div className='flex flex-col gap-5 pb-2'>
						<h1 className='pb-2 text-lg font-semibold'>Данные о пользователе</h1>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Имя пользователя</span>
							<span className='text-black'>{user?.fullName}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>ID пользователя</span>
							<span className='text-black'>{user?.id}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Роль пользователя</span>
							<span className='text-black'>{role?.name}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Дата добавления</span>
							<span className='text-black'>{user?.createdAt}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Статус пользователя</span>
							<span className='text-black'>{user?.status}</span>
						</div>
					</div>
					<div className='flex flex-col gap-5 pb-2'>
						<h1 className='pb-2 text-lg font-semibold'>Контактные данные</h1>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Email пользователя</span>
							<span className='text-black'>{user?.email}</span>
						</div>
						<div className='flex flex-row justify-between text-black/60'>
							<span>Телефон пользователя</span>
							<span className='text-black'>{user?.phone}</span>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-5 px-10'>
					<div className='border-dashed border-black/30 border-2 p-8 rounded-full'>
						<User2 size={80} strokeWidth={1} className='text-muted-foreground'/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UserPage;