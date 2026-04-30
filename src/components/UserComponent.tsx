import { User2 } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { statusUser, type UserWithRole } from "@/lib/constants.ts";
import { useAuth } from "@/context/ContextProvider.tsx";
import React, { useEffect, useState } from "react";

interface UserProps {
	user?: UserWithRole;
	setFormUser: React.Dispatch<React.SetStateAction<UserWithRole | undefined>>;
}

function UserComponent({ user, setFormUser }: UserProps) {
	const { roles } = useAuth();

	const [id] = useState(user?.id ?? 0);
	const [fullName, setFullName] = useState(user?.fullName ?? "");
	const [email, setEmail] = useState(user?.email ?? "");
	const [phone, setPhone] = useState(user?.phone ?? "");
	const [roleId, setRoleId] = useState(user?.roleId ?? user?.role?.id ?? null);
	const [status, setStatus] = useState<UserWithRole["status"]>(user?.status ?? "Активен");
	const [createdAt] = useState(user?.createdAt ?? new Date().toISOString());

	useEffect(() => {
		setFormUser({
			id,
			fullName,
			email,
			phone,
			roleId,
			status,
			createdAt,
			role: roles.find((role) => role.id === roleId) ?? null,
		});
	}, [id, fullName, email, phone, roleId, status, createdAt, roles, setFormUser]);

	return (
		<>
			<div className="flex flex-row gap-5 items-center justify-center">
				<span className="flex items-center justify-center border-2 border-muted-foreground/30 border-dashed w-25 h-25 rounded-full">
					<User2 size={80} strokeWidth={1} className="text-muted-foreground" />
				</span>
			</div>

			<div className="flex flex-col gap-5 mt-5">
				<div className="flex flex-row justify-between">
					<Label className="text-base">Полное имя</Label>
					<Input className="w-7/10 h-11" value={fullName} onChange={(e) => setFullName(e.target.value)} />
				</div>

				<div className="flex flex-row justify-between">
					<Label className="text-base">Email</Label>
					<Input className="w-7/10 h-11" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>

				<div className="flex flex-row justify-between">
					<Label className="text-base">Телефон</Label>
					<Input className="w-7/10 h-11" value={phone ?? ""} onChange={(e) => setPhone(e.target.value)} />
				</div>

				<div className="flex flex-row justify-between">
					<Label className="text-base">Роль</Label>
					<select className="w-7/10 h-11 border rounded-lg" value={roleId ?? ""} onChange={(e) => setRoleId(Number(e.target.value))}>
						<option value="" disabled>Выберите роль</option>
						{roles.map((item) => (
							<option key={item.id} value={item.id}>{item.name}</option>
						))}
					</select>
				</div>

				<div className="flex flex-row justify-between">
					<Label className="text-base">Статус</Label>
					<select className="w-7/10 h-11 border rounded-lg" value={status} onChange={(e) => setStatus(e.target.value as UserWithRole["status"])}>
						{statusUser.map((item) => (
							<option key={item} value={item}>{item}</option>
						))}
					</select>
				</div>
			</div>
		</>
	);
}

export default UserComponent;