import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { type RoleStat, type RoleWithUsers} from "@/lib/constants.ts";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/ContextProvider.tsx";

interface Props {
	role?: RoleStat;
	setFormRoles?: React.Dispatch<React.SetStateAction<RoleWithUsers | undefined>>;
}

function AddRole({ role, setFormRoles}: Props) {
	const { roles, users } = useAuth();
	const [roleId] = useState(role?.id || roles.length + 1);
	const [name, setChangeInputName] = useState<string>(role?.name || "");
	const [description, setChangeDescription] = useState<string>(role?.description || "");
	const [user_id, setUserId] = useState(role?.user_id || 1);


	useEffect(() => {
		if (setFormRoles) {
			setFormRoles({ id: roleId, name, description, user_id });
		}
	}, [roleId, name, description, user_id, setFormRoles]);

	return (
		<div className="flex flex-col gap-5 mt-5">
			<div className="flex flex-row justify-between gap-4">
				<Label htmlFor="role" className="text-base">
					Роль
				</Label>
				<Input
					placeholder={role?.name}
					value={name}
					className="w-7/10 h-11"
					onChange={(e) => setChangeInputName(e.target.value)}
				/>
			</div>

			<div className="flex flex-row justify-between gap-4">
				<Label htmlFor="description" className="text-base">
					Описание
				</Label>
				<Input
					placeholder={description}
					className="w-7/10 h-11"
					value={description}
					onChange={(e) => setChangeDescription(e.target.value)}
				/>
			</div>

			<div className="flex flex-row justify-between gap-4">
				<Label htmlFor="user" className="text-base">
					Пользователь
				</Label>
				<select
					onChange={(e) => setUserId(Number(e.target.value))}
					value={user_id}
					className="w-6/10 h-11 text-sm border-1 border-muted-foreground/20 rounded-lg"
				>
					<option value="" disabled>
						Выберите пользователя
					</option>
					{users.map((item) => (
						<option key={item.id} className="text-sm" value={item.id}>
							{item.fullName}
						</option>
					))}
				</select>
			</div>

			<div className="flex flex-row justify-between px-5">
				<div className="flex flex-col justify-between gap-5">
					<h1 className="text-lg">Пользователи</h1>
					<div className="flex flex-row items-center gap-4">
						<Checkbox className="h-5 w-5 cursor-pointer" />
						<Label htmlFor="name" className="text-base">
							Просмотр
						</Label>
					</div>
					<div className="flex flex-row items-center gap-4">
						<Checkbox className="h-5 w-5 cursor-pointer" />
						<Label htmlFor="name" className="text-base">
							Создание
						</Label>
					</div>
					<div className="flex flex-row items-center gap-4">
						<Checkbox className="h-5 w-5 cursor-pointer" />
						<Label htmlFor="name" className="text-base">
							Редактирование
						</Label>
					</div>
					<div className="flex flex-row items-center gap-4">
						<Checkbox className="h-5 w-5 cursor-pointer" />
						<Label htmlFor="name" className="text-base">
							Удаление
						</Label>
					</div>
				</div>

				<div className="flex flex-col justify-between gap-5">
					<h1 className="text-lg">Оборудование</h1>
					<div className="flex flex-row items-center gap-4">
						<Checkbox className="h-5 w-5 cursor-pointer" />
						<Label htmlFor="name" className="text-base">
							Просмотр
						</Label>
					</div>
					<div className="flex flex-row items-center gap-4">
						<Checkbox className="h-5 w-5 cursor-pointer" />
						<Label htmlFor="name" className="text-base">
							Создание
						</Label>
					</div>
					<div className="flex flex-row items-center gap-4">
						<Checkbox className="h-5 w-5 cursor-pointer" />
						<Label htmlFor="name" className="text-base">
							Редактирование
						</Label>
					</div>
					<div className="flex flex-row items-center gap-4">
						<Checkbox className="h-5 w-5 cursor-pointer" />
						<Label htmlFor="name" className="text-base">
							Удаление
						</Label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddRole;