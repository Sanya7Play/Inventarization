import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import type { RoleStat, RoleWithUsers } from "@/lib/constants.ts";
import React, { useEffect, useState } from "react";

interface Props {
	role?: RoleStat;
	setFormRoles?: React.Dispatch<React.SetStateAction<RoleWithUsers | undefined>>;
}

const permissionGroups = [
	{
		title: "Пользователи",
		items: [
			{ label: "Просмотр", key: "users.read" },
			{ label: "Создание", key: "users.create" },
			{ label: "Редактирование", key: "users.update" },
			{ label: "Удаление", key: "users.delete" },
		],
	},
	{
		title: "Оборудование",
		items: [
			{ label: "Просмотр", key: "inventory.read" },
			{ label: "Создание", key: "inventory.create" },
			{ label: "Редактирование", key: "inventory.update" },
			{ label: "Удаление", key: "inventory.delete" },
		],
	},
	{
		title: "Заказы",
		items: [
			{ label: "Просмотр", key: "orders.read" },
			{ label: "Создание", key: "orders.create" },
			{ label: "Редактирование", key: "orders.update" },
			{ label: "Удаление", key: "orders.delete" },
		],
	},
	{
		title: "Поставщики",
		items: [
			{ label: "Просмотр", key: "suppliers.read" },
			{ label: "Создание", key: "suppliers.create" },
			{ label: "Редактирование", key: "suppliers.update" },
			{ label: "Удаление", key: "suppliers.delete" },
		],
	},
];

function AddRole({ role, setFormRoles }: Props) {
	const [roleId] = useState(role?.id ?? 0);
	const [name, setName] = useState(role?.name ?? "");
	const [description, setDescription] = useState(role?.description ?? "");
	const [permissions, setPermissions] = useState<string[]>(
		Array.isArray(role?.permissions) ? role.permissions : []
	);

	const togglePermission = (key: string) => {
		setPermissions((prev) =>
			prev.includes(key)
				? prev.filter((item) => item !== key)
				: [...prev, key]
		);
	};

	useEffect(() => {
		if (setFormRoles) {
			setFormRoles({
				id: roleId,
				name,
				description,
				permissions,
			} as RoleWithUsers);
		}
	}, [roleId, name, description, permissions, setFormRoles]);

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

			<div className="grid grid-cols-2 gap-6 px-5">
				{permissionGroups.map((group) => (
					<div key={group.title} className="flex flex-col gap-4">
						<h1 className="text-lg">{group.title}</h1>

						{group.items.map((item) => (
							<div key={item.key} className="flex flex-row items-center gap-4">
								<Checkbox
									checked={permissions.includes(item.key)}
									onCheckedChange={() => togglePermission(item.key)}
									className="h-5 w-5 cursor-pointer"
								/>
								<Label className="text-base">{item.label}</Label>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default AddRole;