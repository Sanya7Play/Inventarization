import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { RoleStat, RoleWithUsers, TypeInventory } from "@/lib/constants.ts";
import AddRole from "@/components/AddRole.tsx";
import React from "react";
import { useAuth } from "@/context/ContextProvider.tsx";
import AddType from "@/components/AddType.tsx";
import { supabase } from "@/supabase.ts";

interface IProps {
	type?: TypeInventory;
	role?: RoleStat;
	formTypes?: TypeInventory | undefined;
	setFormTypes?: React.Dispatch<React.SetStateAction<TypeInventory | undefined>>;
	children?: React.ReactNode;
}

function EditDialogWindow({
							  children,
							  role,
							  formTypes,
							  setFormTypes,
							  type,
						  }: IProps) {
	const { fetchData } = useAuth();

	const [formRole, setFormRole] = React.useState<RoleWithUsers>({
		id: role?.id ?? 0,
		name: role?.name ?? "",
		description: role?.description ?? "",
		permissions: Array.isArray(role?.permissions) ? role.permissions : [],
	} as RoleWithUsers);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		setFormRole({
			id: role?.id ?? 0,
			name: role?.name ?? "",
			description: role?.description ?? "",
			permissions: Array.isArray(role?.permissions) ? role.permissions : [],
		} as RoleWithUsers);
	}, [role]);

	const submitButton = async () => {
		try {
			if (type && formTypes) {
				const { error } = await supabase
					.from("types")
					.update({
						typeName: formTypes.typeName,
						description: formTypes.description,
					})
					.eq("id", type.id);

				if (error) throw error;

				await fetchData();
				return;
			}

			if (!type && formTypes) {
				const { error } = await supabase.from("types").insert({
					typeName: formTypes.typeName,
					description: formTypes.description,
				});

				if (error) throw error;

				await fetchData();
				return;
			}

			if (role) {
				const { error } = await supabase
					.from("roles")
					.update({
						name: formRole.name,
						description: formRole.description,
						permissions: formRole.permissions,
					})
					.eq("id", role.id);

				if (error) throw error;

				await fetchData();
				return;
			}

			const { error } = await supabase.from("roles").insert({
				name: formRole.name,
				description: formRole.description,
				permissions: formRole.permissions,
			});

			if (error) throw error;

			await fetchData();
		} catch (error) {
			console.error("Ошибка при сохранении:", error);
		}
		finally {
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>
						{role?.name || type?.typeName || "Редактирование"}
					</DialogTitle>
					<DialogDescription />
				</DialogHeader>

				{type ? (
					<AddType type={type} setFormTypes={setFormTypes} />
				) : (
					<AddRole formRole={formRole} setFormRole={setFormRole} />
				)}

				<DialogFooter className="mt-5 sm:mt-6">
					<DialogClose asChild>
						<Button variant="outline" className="cursor-pointer border text-sm">
							Закрыть
						</Button>
					</DialogClose>

					<Button
						type="button"
						onClick={() => void submitButton()}
						variant="outline"
						size="default"
						className="bg-blue-500 text-white cursor-pointer text-sm"
					>
						{role ? "Изменить роль" : type ? "Изменить тип" : "Создать роль"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default EditDialogWindow;