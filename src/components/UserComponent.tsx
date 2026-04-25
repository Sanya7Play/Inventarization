import {User2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {statusUser, type User} from "@/lib/constants.ts";
import {useAuth} from "@/context/ContextProvider.tsx";
import React, {useEffect, useState} from "react";

interface UserProps {
	user?: User;
	setFormUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
function UserComponent({user,setFormUser}: UserProps){

	const {usersDashboard, roles} = useAuth();
	const date = new Date().toLocaleDateString("en-US");

	const [id] = useState<number>(user?.id || usersDashboard.length + 1);
	const [fullName, setFullName] = useState<string>(user?.fullName || "");
	const [email, setEmail] = useState<string>(user?.email || "");
	const [phone, setPhone] = useState<string>(user?.phone || "");
	const [role_id, setRole] = useState<number>(user?.role_id || 1);
	const [status, setStatus] = useState<User["status"]>(user?.status || "Активен");
	const [createdAt, setCreatedAt] = useState<string>(user?.createdAt || date);

	useEffect(() => {
		setFormUser({id, fullName, email, phone, role_id, status, createdAt,});
	}, [id, fullName, email, phone, role_id, status, createdAt, setFormUser]);
	return (
		<>
			<div className='flex flex-row gap-5 items-center justify-center'>
						<span className='flex items-center justify-center border-2 border-muted-foreground/30 border-dashed w-25 h-25 rounded-full'>
							<User2 size={80} strokeWidth={1} className='text-muted-foreground'/>
						</span>
				<div className='flex flex-col items-center justify-center'>
					<span className='text-muted-foreground text-sm'>Перетащите изображение сюда</span>
					<p className='text-muted-foreground text-sm'>или</p>
					<span className='text-blue-600 cursor-pointer text-sm '>Выберите изображение</span>
				</div>
			</div>
			<div className='flex flex-col gap-5 mt-5'>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="name" className='text-base'>Полное имя</Label>
					<Input
						onChange={(e) => setFullName(e.target.value)}
						placeholder='Введите полное имя'
						className='w-7/10 h-11'
						value={fullName}
					>
					</Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="id" className='text-base'>Email</Label>
					<Input
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Введите Email'
						className='w-7/10 h-11'
						value={email}
					></Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="category" className='text-base'>Телефон</Label>
					<Input
						onChange={(e) => setPhone(e.target.value)}
						placeholder='Введите телефон'
						className='w-7/10 h-11'
						value={phone}
					></Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="price" className='text-base'>Роль</Label>
					<select
						onChange={(e) => setRole(Number(e.target.value))}
						value={role_id}
						className="w-7/10 h-11 text-sm border-1 border-muted-foreground/20 rounded-lg"
					>
						<option value="" disabled>Выберите роль</option>
						{roles.map((item) => (
							<option key={item.id} className="text-sm" value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="quantity" className='text-base'>Статус</Label>
					<select
						onChange={(e) => setStatus(e.target.value as User["status"])}
						value={status}
						className="w-7/10 h-11 text-sm border-1 border-muted-foreground/20 rounded-lg"
					>
						<option value="" disabled>Выберите статус</option>
						{statusUser.map((item) => (
							<option key={item} className="text-sm" value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="date" className='text-base'>Дата создания</Label>
					<Input
						onChange={(e) => setCreatedAt(e.target.value)}
						type={'date'}
						placeholder='Введите дату создания'
						className='w-7/10 h-11'
						value={createdAt}
					></Input>
				</div>
			</div>
		</>
	)
}
export default UserComponent;