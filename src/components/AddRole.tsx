import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {permissionGroups, type RoleWithUsers} from "@/lib/constants.ts";
import React from "react";

interface Props {
	formRole: RoleWithUsers;
	setFormRole: React.Dispatch<React.SetStateAction<RoleWithUsers>>;
}

function AddRole({ formRole, setFormRole }: Props) {
	const togglePermission = (key: string) => {
		setFormRole((prev) => ({
			...prev,
			permissions: prev.permissions.includes(key)
				? prev.permissions.filter((item) => item !== key)
				: [...prev.permissions, key],
		}));
	};

	return (
		<div className="flex flex-col gap-5 mt-5">
			<div className="flex flex-row justify-between gap-4">
				<Label className="text-base">Роль</Label>
				<Input
					value={formRole.name}
					onChange={(e) =>
						setFormRole((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
				/>
			</div>

			<div className="flex flex-row justify-between gap-4">
				<Label className="text-base">Описание</Label>
				<Input
					value={formRole.description ?? ""}
					onChange={(e) =>
						setFormRole((prev) => ({
							...prev,
							description: e.target.value,
						}))
					}
				/>
			</div>

			<div className="grid grid-cols-2 gap-6 px-5">
				{permissionGroups.map((group) => (
					<div key={group.title} className="flex flex-col gap-4">
						<h1 className="text-lg">{group.title}</h1>

						{group.items.map((item) => (
							<div key={item.key} className="flex flex-row items-center gap-4">
								<Checkbox
									className="cursor-pointer"
									checked={formRole.permissions.includes(item.key)}
									onCheckedChange={() => togglePermission(item.key)}
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