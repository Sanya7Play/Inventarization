import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import type { RoleStat, RoleWithUsers } from "@/lib/constants.ts";
import React, { useEffect, useState } from "react";

interface Props {
	role?: RoleStat;
	setFormRoles?: React.Dispatch<React.SetStateAction<RoleWithUsers | undefined>>;
}

function AddRole({ role, setFormRoles }: Props) {
	const [roleId] = useState(role?.id ?? 0);
	const [name, setName] = useState(role?.name ?? "");
	const [description, setDescription] = useState(role?.description ?? "");

	useEffect(() => {
		if (setFormRoles) {
			setFormRoles({
				id: roleId,
				name,
				description,
			});
		}
	}, [roleId, name, description, setFormRoles]);

	return (
		<div className="flex flex-col gap-5 mt-5">
			<div className="flex flex-row justify-between gap-4">
				<Label className="text-base">Роль</Label>
				<Input
					placeholder="Введите название роли"
					value={name}
					className="w-7/10 h-11"
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<div className="flex flex-row justify-between gap-4">
				<Label className="text-base">Описание</Label>
				<Input
					placeholder="Введите описание"
					className="w-7/10 h-11"
					value={description ?? ""}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<div className="flex flex-row justify-between px-5">
				<div className="flex flex-col justify-between gap-5">
					<h1 className="text-lg">Пользователи</h1>

					{["Просмотр", "Создание", "Редактирование", "Удаление"].map((item) => (
						<div key={item} className="flex flex-row items-center gap-4">
							<Checkbox className="h-5 w-5 cursor-pointer" />
							<Label className="text-base">{item}</Label>
						</div>
					))}
				</div>

				<div className="flex flex-col justify-between gap-5">
					<h1 className="text-lg">Оборудование</h1>

					{["Просмотр", "Создание", "Редактирование", "Удаление"].map((item) => (
						<div key={item} className="flex flex-row items-center gap-4">
							<Checkbox className="h-5 w-5 cursor-pointer" />
							<Label className="text-base">{item}</Label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default AddRole;